import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { QuoteFormState } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalog from "./components/ProductCatalog";
import Differentials from "./components/Differentials";
import QuoteForm from "./components/QuoteForm";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";
import ProposalModal from "./components/ProposalModal";
import FloatingChat from "./components/FloatingChat";
import PrintCatalog from "./components/PrintCatalog";
import DownloadCatalogModal from "./components/DownloadCatalogModal";
import WhatsAppSegmentModal from "./components/WhatsAppSegmentModal";
import PhotoEditorModal from "./components/PhotoEditorModal";
import { Settings, Sparkles } from "lucide-react";

import initialCustomImages from "./assets/custom_images_data.json";
import { testFirestoreConnection } from "./firebase";
import { 
  getCustomImagesFromFirestore, 
  saveCustomImageToFirestore, 
  seedImagesToFirestore, 
  saveQuoteToFirestore,
  subscribeToCustomImages 
} from "./services/firebaseService";
import { safeGetLocalStorage, safeSetLocalStorage, safeRemoveLocalStorage } from "./utils/storage";

export default function App() {
  // Products selected in the catalog bucket
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // State for Catalog Download
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // State for WhatsApp Segment Modal
  const [isWhatsAppSegmentModalOpen, setIsWhatsAppSegmentModalOpen] = useState(false);

  // State for Photo Editor Studio Modal
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState(false);
  const [photoEditorTargetKey, setPhotoEditorTargetKey] = useState<string | undefined>(undefined);
  
  // Admin Mode state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isEditorButtonVisible, setIsEditorButtonVisible] = useState(true);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Check URL parameters, hash, or localStorage for admin/editor access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    const storedAccess = localStorage.getItem("homero_editor_access");

    if (
      params.has("admin") ||
      params.has("editor") ||
      params.has("edit") ||
      hash.includes("admin") ||
      hash.includes("editor") ||
      storedAccess !== "false"
    ) {
      setIsEditorButtonVisible(true);
    }

    // Keyboard shortcut listeners: F2, Alt + E, or Ctrl + Shift + E
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F2" ||
        (e.altKey && e.key.toLowerCase() === "e") ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e")
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsEditorButtonVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Custom image urls saved in persistent JSON file and state
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    // Clear legacy caches that might contain heavy base64 strings or broken local paths
    safeRemoveLocalStorage("homero_custom_images");
    safeRemoveLocalStorage("homero_custom_images_v2");
    safeRemoveLocalStorage("homero_custom_images_v3");

    const localSaved = safeGetLocalStorage<Record<string, string>>("homero_custom_images_v4", {});
    return { ...(initialCustomImages as Record<string, string>), ...localSaved };
  });

  // Function to fetch and synchronize images from server & Firebase
  const syncAllImages = async () => {
    // Test firestore connection
    testFirestoreConnection().catch((err) => console.warn("Firestore connection check:", err));

    const localSaved = safeGetLocalStorage<Record<string, string>>("homero_custom_images_v4", {});

    let serverImages: Record<string, string> = {};
    try {
      const response = await fetch("/api/custom-images");
      serverImages = await response.json();
    } catch (err) {
      console.error("Failed to fetch custom images with server:", err);
    }

    // Load persistent custom images from Firebase Firestore
    let firestoreImages: Record<string, string> = {};
    try {
      firestoreImages = await getCustomImagesFromFirestore();
      console.log(`[Firebase] Loaded ${Object.keys(firestoreImages).length} images from Firestore.`);
    } catch (err) {
      console.warn("Firestore image load:", err);
    }

    // Merge priority:
    // 1. Initial factory images
    // 2. Server cached paths
    // 3. Local browser edits (localStorage)
    // 4. Firestore cloud database (highest priority for user customized photos)
    const mergedImages = {
      ...(initialCustomImages as Record<string, string>),
      ...serverImages,
      ...localSaved,
      ...firestoreImages,
    };

    setCustomImages(mergedImages);
    safeSetLocalStorage("homero_custom_images_v4", mergedImages);
  };

  // On mount, load custom images and subscribe to real-time Firebase changes
  useEffect(() => {
    syncAllImages();

    // Subscribe to real-time changes in Firestore
    const unsubscribe = subscribeToCustomImages((firestoreUpdated) => {
      console.log("[Firebase Realtime] Received update for keys:", Object.keys(firestoreUpdated));
      setCustomImages((prev) => {
        const merged = { ...prev, ...firestoreUpdated };
        safeSetLocalStorage("homero_custom_images_v4", merged);
        return merged;
      });
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateImage = async (key: string, base64: string) => {
    // 1. Update React state immediately
    setCustomImages((prev) => {
      const updated = { ...prev, [key]: base64 };
      safeSetLocalStorage("homero_custom_images_v4", updated);
      return updated;
    });

    // 2. Save directly to Firebase Cloud (Storage + Firestore)
    try {
      const permanentCloudUrl = await saveCustomImageToFirestore(key, base64);
      if (permanentCloudUrl && permanentCloudUrl !== base64) {
        setCustomImages((prev) => {
          const updated = { ...prev, [key]: permanentCloudUrl };
          safeSetLocalStorage("homero_custom_images_v4", updated);
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to persist custom image to Firestore:", err);
    }

    // 3. Also notify server backend cache
    try {
      await fetch("/api/custom-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, base64 }),
      });
    } catch (err) {
      console.error("Failed to persist custom image to server:", err);
    }
  };

  const handleResetImages = async () => {
    if (window.confirm("Deseja realmente restaurar todas as fotos originais do site?")) {
      setCustomImages({});
      safeRemoveLocalStorage("homero_custom_images_v3");
      safeRemoveLocalStorage("homero_custom_images_v2");
      safeRemoveLocalStorage("homero_custom_images");

      // Reset on server backend
      try {
        await fetch("/api/custom-images/reset", {
          method: "POST",
        });
      } catch (err) {
        console.error("Failed to reset custom images on server:", err);
      }
    }
  };

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      setShowPasswordPrompt(true);
      setAdminPasswordInput("");
      setPasswordError("");
    }
  };

  const handleOpenPhotoEditor = (targetKey?: string) => {
    setPhotoEditorTargetKey(targetKey);
    setIsPhotoEditorOpen(true);
  };

  const handleResetItemImage = async (key: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[key];
      safeSetLocalStorage("homero_custom_images_v3", updated);
      return updated;
    });

    try {
      await fetch("/api/custom-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, base64: "" }),
      });
    } catch (err) {
      console.error("Failed to reset item image on server:", err);
    }
  };

  const handleVerifyPassword = (e: FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput.trim().toLowerCase() === "homero") {
      setIsAdminMode(true);
      setShowPasswordPrompt(false);
      setPasswordError("");
    } else {
      setPasswordError("Senha incorreta. Dica: homero");
    }
  };
  
  // Commercial specification form state
  const [formData, setFormData] = useState<QuoteFormState>({
    fullName: "",
    company: "",
    cnpj: "",
    whatsapp: "",
    monthlyVolume: "",
    productOfInterest: ""
  });

  // Modal open state
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  // Reference to scroll to form nicely
  const formRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Toggle products from catalog
  const handleToggleProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        // Trigger smooth scroll down to form to facilitate conversion
        setTimeout(() => {
          if (formRef.current) {
            handleScrollToSection("cotacao");
            // Flash effect to highlight input section
            const cardElement = formRef.current.querySelector(".bg-white");
            if (cardElement) {
              cardElement.classList.add("ring-2", "ring-brand-orange");
              setTimeout(() => {
                cardElement.classList.remove("ring-2", "ring-brand-orange");
              }, 1500);
            }
          }
        }, 300);
        return [...prev, productId];
      }
    });
  };

  // Specific removal for tags inside form
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  // Inputs handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit quote request
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProposalOpen(true);

    // Persist quote lead to Firebase Firestore
    saveQuoteToFirestore({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      whatsapp: formData.whatsapp,
      segment: formData.segment,
      selectedProducts,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    }).catch((err) => console.warn("Failed to log quote to Firestore:", err));
  };

  return (
    <div className="min-h-screen bg-white relative selection:bg-brand-orange/20 selection:text-brand-orange">
      
      {/* Screen view elements - hidden when printing to PDF */}
      <div className="print:hidden">
        {/* Header navbar */}
        <Navbar
          onScrollToSection={handleScrollToSection}
          selectedCount={selectedProducts.length}
          isAdminMode={isAdminMode}
          customLogo={customImages.logo}
          onUpdateLogo={(base64) => handleUpdateImage("logo", base64)}
          onDownloadCatalog={() => setIsDownloadModalOpen(true)}
          onOpenPhotoEditor={handleOpenPhotoEditor}
        />

        {/* Main sections */}
        <main>
          {/* Hero Section */}
          <Hero 
            onScrollToSection={handleScrollToSection}
            isAdminMode={isAdminMode}
            heroImage={customImages.hero}
            onUpdateImage={(base64) => handleUpdateImage("hero", base64)}
            onOpenPhotoEditor={handleOpenPhotoEditor}
          />

          {/* Catalog Section */}
          <ProductCatalog
            selectedProducts={selectedProducts}
            onToggleProduct={handleToggleProduct}
            onScrollToSection={handleScrollToSection}
            isAdminMode={isAdminMode}
            customImages={customImages}
            onUpdateProductImage={(productId, base64) => handleUpdateImage(productId, base64)}
            onDownloadCatalog={() => setIsDownloadModalOpen(true)}
            onOpenPhotoEditor={handleOpenPhotoEditor}
          />

          {/* Brand Differentials Section */}
          <Differentials 
            isAdminMode={isAdminMode}
            differentialsImage={customImages.differentials}
            onUpdateImage={(base64) => handleUpdateImage("differentials", base64)}
            onOpenPhotoEditor={handleOpenPhotoEditor}
          />

          {/* Dynamic quotation / specification form section */}
          <QuoteForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveProduct}
            formRef={formRef}
          />

          {/* Frequently Asked Questions (FAQ) Accordion Section */}
          <FaqAccordion />
        </main>

        {/* Footer information section */}
        <Footer 
          onScrollToSection={handleScrollToSection} 
          isAdminMode={isAdminMode}
          customLogo={customImages.logo}
          onUpdateLogo={(base64) => handleUpdateImage("logo", base64)}
          onOpenWhatsAppSegment={() => setIsWhatsAppSegmentModalOpen(true)}
          onOpenPhotoEditor={handleOpenPhotoEditor}
        />

        {/* Dynamic proposal sheet viewer */}
        <ProposalModal
          isOpen={isProposalOpen}
          onClose={() => setIsProposalOpen(false)}
          formData={formData}
          selectedProducts={selectedProducts}
          customLogo={customImages.logo}
        />

        {/* Interactive WhatsApp Helena chatbot widget */}
        <FloatingChat onOpenSegmentModal={() => setIsWhatsAppSegmentModalOpen(true)} />

        {/* Global WhatsApp Segment Modal */}
        <WhatsAppSegmentModal
          isOpen={isWhatsAppSegmentModalOpen}
          onClose={() => setIsWhatsAppSegmentModalOpen(false)}
        />

        {/* Floating Admin Mode Panel at Bottom Left (Visible only for site owner) */}
        {isEditorButtonVisible && (
          <div className="fixed bottom-6 left-6 z-40 select-none">
            {isAdminMode ? (
              <div className="bg-brand-dark border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xs animate-fade-in text-white space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-400">Modo Edição Ativo</span>
                  </div>
                  <button 
                    onClick={handleToggleAdminMode}
                    className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
                
                <p className="font-sans text-[11px] text-gray-300 leading-relaxed">
                  <strong>Como editar:</strong> Navegue pelo site e <strong>clique diretamente em qualquer foto ou logotipo</strong>, ou utilize o <strong>Estúdio de Fotos</strong> para filtros, cortes e ajustes.
                </p>

                <button
                  onClick={() => handleOpenPhotoEditor()}
                  className="w-full font-sans text-xs font-bold bg-brand-orange hover:bg-brand-orange-hover text-white py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Abrir Estúdio de Edição</span>
                </button>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleResetImages}
                    className="flex-1 font-sans text-[10px] font-semibold bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    Restaurar Fotos Padrão
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminMode(false);
                      setIsEditorButtonVisible(false);
                      localStorage.removeItem("homero_editor_access");
                    }}
                    className="font-sans text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white py-1.5 px-2.5 rounded-lg transition-all cursor-pointer"
                    title="Ocultar botão do editor"
                  >
                    Ocultar Botão
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleToggleAdminMode}
                className="bg-brand-dark hover:bg-brand-orange border border-white/10 hover:border-brand-orange text-white p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 group cursor-pointer animate-bounce"
                title="Ativar Modo de Edição de Fotos"
              >
                <Settings className="w-5 h-5 text-brand-orange group-hover:text-white group-hover:rotate-45 transition-transform duration-500" />
                <span className="font-sans text-xs font-bold pr-1 uppercase tracking-wider">Modo Editor</span>
              </button>
            )}
          </div>
        )}

        {/* Full Image Studio Editor Modal */}
        <PhotoEditorModal
          isOpen={isPhotoEditorOpen}
          onClose={() => setIsPhotoEditorOpen(false)}
          initialTargetKey={photoEditorTargetKey}
          customImages={customImages}
          onSaveImage={handleUpdateImage}
          onResetItemImage={handleResetItemImage}
        />

        {/* Password Prompt Modal */}
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 animate-scale-in text-left">
              <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">Acesso ao Modo Editor</h3>
              <p className="font-sans text-xs text-gray-600 mb-4 leading-relaxed">
                Digite a senha de administrador para poder editar as fotos do site clicando diretamente nelas.
              </p>
              
              <form onSubmit={handleVerifyPassword} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Senha de Acesso</label>
                  <input
                    type="password"
                    placeholder="Dica: homero"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-hidden focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-brand-dark"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="font-sans text-[11px] text-red-500 font-medium mt-1.5">{passwordError}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordPrompt(false)}
                    className="flex-1 font-sans text-xs font-medium text-gray-500 hover:text-brand-dark bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 font-sans text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover py-3 rounded-xl transition-all shadow-md shadow-brand-orange/25 cursor-pointer"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution Printable Editorial Catalog for PDF Conversion */}
      <PrintCatalog customImages={customImages} />

      {/* Interactive Catalog Download & Layout Preview Modal */}
      <DownloadCatalogModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        customImages={customImages}
      />

    </div>
  );
}
