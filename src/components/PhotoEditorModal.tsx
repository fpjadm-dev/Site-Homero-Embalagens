import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { 
  X, 
  Upload, 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Contrast, 
  Sliders, 
  Sparkles, 
  Check, 
  Download, 
  Undo2, 
  Image as ImageIcon, 
  Crop, 
  Maximize2,
  Eye,
  RefreshCw,
  Layers,
  Search,
  CheckCircle2,
  Wand2
} from "lucide-react";
import { PRODUCTS } from "../data";
import { Product, SubGroup, SubCategory } from "../types";
// @ts-ignore
import defaultHeroImg from "../assets/images/banner_paper_bags_1784474883126.jpg";
// @ts-ignore
import logoImg from "../assets/images/homero_logo_clean_1784481431026.jpg";

export interface TargetItemOption {
  key: string;
  name: string;
  category: string;
  code?: string;
  defaultImage: string;
}

interface PhotoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTargetKey?: string;
  customImages: Record<string, string>;
  onSaveImage: (key: string, base64: string) => Promise<void> | void;
  onResetItemImage?: (key: string) => void;
}

export default function PhotoEditorModal({
  isOpen,
  onClose,
  initialTargetKey,
  customImages,
  onSaveImage,
  onResetItemImage,
}: PhotoEditorModalProps) {
  // Build searchable list of all editable items on the website
  const allEditableItems: TargetItemOption[] = React.useMemo(() => {
    const items: TargetItemOption[] = [
      {
        key: "hero",
        name: "Banner Principal (Hero)",
        category: "Geral do Site",
        code: "BANNER",
        defaultImage: defaultHeroImg,
      },
      {
        key: "logo",
        name: "Logotipo da Empresa",
        category: "Geral do Site",
        code: "LOGO",
        defaultImage: logoImg,
      },
      {
        key: "differentials",
        name: "Banner de Diferenciais",
        category: "Geral do Site",
        code: "DIFF",
        defaultImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      },
    ];

    // Add all Products and their subgroups
    PRODUCTS.forEach((product: Product) => {
      items.push({
        key: product.id,
        name: `[Capa Categoria] ${product.name}`,
        category: product.category,
        code: product.number,
        defaultImage: product.image,
      });

      if (product.subcategories) {
        product.subcategories.forEach((subcat: SubCategory) => {
          items.push({
            key: subcat.id,
            name: `[Subcategoria] ${subcat.name}`,
            category: product.name,
            defaultImage: subcat.image,
          });

          subcat.subgroups.forEach((sub: SubGroup) => {
            items.push({
              key: sub.id,
              name: `${sub.name} (${sub.linha})`,
              category: `${product.name} > ${subcat.name}`,
              code: sub.number,
              defaultImage: sub.image,
            });
          });
        });
      }

      if (product.subgroups) {
        product.subgroups.forEach((sub: SubGroup) => {
          items.push({
            key: sub.id,
            name: `${sub.name} (${sub.linha})`,
            category: product.name,
            code: sub.number,
            defaultImage: sub.image,
          });
        });
      }
    });

    return items;
  }, []);

  // Selected item key to edit
  const [selectedKey, setSelectedKey] = useState<string>("sacos-padaria");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isItemSelectorOpen, setIsItemSelectorOpen] = useState(false);

  // Active loaded image source (DataURL or URL)
  const [imageSrc, setImageSrc] = useState<string>("");
  const [originalImageSrc, setOriginalImageSrc] = useState<string>("");

  // Editor Adjustment States
  const [brightness, setBrightness] = useState<number>(0); // -100 to 100
  const [contrast, setContrast] = useState<number>(0); // -100 to 100
  const [saturation, setSaturation] = useState<number>(100); // 0 to 200
  const [whiteClean, setWhiteClean] = useState<number>(0); // 0 to 100 (Studio White background boost)
  const [warmth, setWarmth] = useState<number>(0); // -100 to 100
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1); // 0.5 to 3
  const [aspectRatio, setAspectRatio] = useState<string>("1:1"); // "1:1", "4:3", "16:9", "free"
  const [activeTab, setActiveTab] = useState<"adjust" | "crop" | "filters" | "gallery">("adjust");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [showOriginalComparison, setShowOriginalComparison] = useState<boolean>(false);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize selected item on open or when initialTargetKey changes
  useEffect(() => {
    if (isOpen) {
      const target = initialTargetKey || selectedKey || "sacos-padaria";
      setSelectedKey(target);
      loadItemImage(target);
      resetAdjustments();
      setSaveSuccess(false);
    }
  }, [isOpen, initialTargetKey]);

  // Load image for a specific key
  const loadItemImage = (key: string) => {
    const item = allEditableItems.find((i) => i.key === key);
    const src = customImages[key] || item?.defaultImage || "";
    setImageSrc(src);
    setOriginalImageSrc(src);
  };

  // Reset adjustments
  const resetAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(100);
    setWhiteClean(0);
    setWarmth(0);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    setAspectRatio("1:1");
  };

  // Preset Filters
  const applyPresetFilter = (name: string) => {
    resetAdjustments();
    switch (name) {
      case "studio-white":
        setBrightness(8);
        setContrast(14);
        setWhiteClean(35);
        setSaturation(105);
        break;
      case "vibrant":
        setBrightness(4);
        setContrast(18);
        setSaturation(135);
        break;
      case "warm-kraft":
        setBrightness(2);
        setContrast(10);
        setSaturation(110);
        setWarmth(25);
        break;
      case "bw":
        setContrast(20);
        setSaturation(0);
        break;
      case "high-contrast":
        setBrightness(-2);
        setContrast(35);
        setSaturation(110);
        break;
      case "soft":
        setBrightness(10);
        setContrast(-10);
        setSaturation(90);
        break;
      default:
        break;
    }
  };

  // Render on canvas whenever adjustments change
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Base dimensions based on Aspect Ratio
      let targetW = 1000;
      let targetH = 1000;

      if (aspectRatio === "4:3") {
        targetW = 1200;
        targetH = 900;
      } else if (aspectRatio === "16:9") {
        targetW = 1600;
        targetH = 900;
      } else if (aspectRatio === "3:4") {
        targetW = 900;
        targetH = 1200;
      } else if (aspectRatio === "free") {
        targetW = img.width || 1000;
        targetH = img.height || 1000;
      }

      // If rotation is 90 or 270, swap target dimensions for proper display
      const isRotated90 = rotation % 180 !== 0;
      const canvasW = isRotated90 && aspectRatio === "free" ? targetH : targetW;
      const canvasH = isRotated90 && aspectRatio === "free" ? targetW : targetH;

      canvas.width = canvasW;
      canvas.height = canvasH;

      // Clear with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Save context for transformations
      ctx.save();

      // Translate to center
      ctx.translate(canvasW / 2, canvasH / 2);

      // Rotate
      ctx.rotate((rotation * Math.PI) / 180);

      // Scale (Flip & Zoom)
      const scaleX = (flipH ? -1 : 1) * zoom;
      const scaleY = (flipV ? -1 : 1) * zoom;
      ctx.scale(scaleX, scaleY);

      // Calculate cover/contain scaling for the source image into target canvas
      const imgRatio = img.width / img.height;
      const canvasRatio = targetW / targetH;
      let drawW = targetW;
      let drawH = targetH;

      if (imgRatio > canvasRatio) {
        drawH = targetH;
        drawW = targetH * imgRatio;
      } else {
        drawW = targetW;
        drawH = targetW / imgRatio;
      }

      // Apply standard CSS filters on context
      const bVal = 100 + brightness;
      const cVal = 100 + contrast;
      const sVal = saturation;
      const sepiaVal = warmth > 0 ? warmth * 0.4 : 0;
      const hueVal = warmth < 0 ? warmth * 0.5 : 0;

      ctx.filter = `brightness(${bVal}%) contrast(${cVal}%) saturate(${sVal}%) sepia(${sepiaVal}%) hue-rotate(${hueVal}deg)`;

      // Draw image centered
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

      ctx.restore();

      // Apply Studio White Clean processing if enabled (> 0)
      if (whiteClean > 0) {
        try {
          const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
          const data = imgData.data;
          const threshold = 255 - whiteClean * 1.2; // pixels lighter than this become pure white

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const avg = (r + g + b) / 3;

            if (avg > threshold) {
              const boost = ((avg - threshold) / (255 - threshold)) * 1.5;
              data[i] = Math.min(255, r + (255 - r) * boost);
              data[i + 1] = Math.min(255, g + (255 - g) * boost);
              data[i + 2] = Math.min(255, b + (255 - b) * boost);
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          console.error("White cleaning pixel error", e);
        }
      }
    };
    img.src = imageSrc;
  }, [
    imageSrc,
    brightness,
    contrast,
    saturation,
    whiteClean,
    warmth,
    rotation,
    flipH,
    flipV,
    zoom,
    aspectRatio,
  ]);

  // Handle local file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
        resetAdjustments();
      }
    };
    reader.readAsDataURL(file);
  };

  // Save the edited image permanently
  const handleSave = async () => {
    if (!canvasRef.current || !selectedKey) return;

    setIsSaving(true);
    try {
      // Export high-quality JPEG / PNG
      const editedBase64 = canvasRef.current.toDataURL("image/jpeg", 0.92);
      
      await onSaveImage(selectedKey, editedBase64);
      setImageSrc(editedBase64);
      setOriginalImageSrc(editedBase64);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save edited photo:", err);
      alert("Erro ao salvar a foto editada. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // Download edited image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `homero_${selectedKey}_editada.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  // Reset to original factory image
  const handleRestoreOriginal = () => {
    if (confirm("Deseja restaurar a imagem original de fábrica deste item?")) {
      const item = allEditableItems.find((i) => i.key === selectedKey);
      if (item && item.defaultImage) {
        setImageSrc(item.defaultImage);
        setOriginalImageSrc(item.defaultImage);
        resetAdjustments();
        if (onResetItemImage) {
          onResetItemImage(selectedKey);
        }
      }
    }
  };

  if (!isOpen) return null;

  const currentSelectedItem = allEditableItems.find((i) => i.key === selectedKey);

  const filteredItems = allEditableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-[#12161A] text-white rounded-3xl w-full max-w-6xl max-h-[96vh] flex flex-col shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161B22]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  Estúdio de Edição de Fotos
                </h2>
                <span className="bg-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider border border-brand-orange/30">
                  Homero Pro
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans">
                Edite, enquadre e limpe o fundo das fotos dos produtos. As alterações permanecem salvas no site.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all border border-white/10 cursor-pointer"
              title="Baixar imagem editada para o computador"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Foto</span>
            </button>

            {/* Save & Apply Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                saveSuccess
                  ? "bg-emerald-500 text-white shadow-emerald-500/30"
                  : "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-brand-orange/30 hover:scale-[1.02]"
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  <span>Foto Salva Permanentemente!</span>
                </>
              ) : isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Salvando no Servidor...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvar & Aplicar no Site</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Fechar Editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Item Selector Bar */}
        <div className="px-6 py-2.5 bg-[#0D1117] border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <button
              onClick={() => setIsItemSelectorOpen(!isItemSelectorOpen)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left text-xs text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="text-gray-400 font-medium">Editando Item:</span>
                <span className="font-bold text-brand-orange truncate">
                  {currentSelectedItem?.name || selectedKey}
                </span>
                {currentSelectedItem?.code && (
                  <span className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded text-gray-300 font-mono">
                    {currentSelectedItem.code}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-400 group-hover:text-white uppercase font-bold tracking-wider">
                Trocar Item ▾
              </span>
            </button>

            {/* Dropdown list */}
            {isItemSelectorOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#161B22] border border-white/15 rounded-2xl shadow-2xl z-50 max-h-72 flex flex-col overflow-hidden animate-scale-in">
                <div className="p-2 border-b border-white/10 bg-[#0D1117]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, código ou categoria..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 divide-y divide-white/5 p-1">
                  {filteredItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setSelectedKey(item.key);
                        loadItemImage(item.key);
                        setIsItemSelectorOpen(false);
                        resetAdjustments();
                      }}
                      className={`w-full flex items-center justify-between p-2.5 text-left rounded-xl transition-all text-xs cursor-pointer ${
                        item.key === selectedKey
                          ? "bg-brand-orange/20 text-brand-orange font-bold"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate font-medium">{item.name}</div>
                        <div className="text-[10px] text-gray-500">{item.category}</div>
                      </div>
                      {item.code && (
                        <span className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded font-mono text-gray-400">
                          {item.code}
                        </span>
                      )}
                    </button>
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-500">
                      Nenhum item encontrado com esse termo.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Carregar uma nova imagem do computador para este item"
            >
              <Upload className="w-3.5 h-3.5 text-brand-orange" />
              <span>Carregar Foto do PC</span>
            </button>

            <button
              onClick={handleRestoreOriginal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-300 border border-white/10 text-xs font-semibold text-gray-400 transition-all cursor-pointer"
              title="Restaurar a foto original de fábrica deste item"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Restaurar Original</span>
            </button>
          </div>
        </div>

        {/* Main Work Area: Canvas Preview + Tool Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden min-h-[440px]">
          
          {/* Left Canvas Preview Area (8 Cols) */}
          <div className="lg:col-span-8 bg-[#090C10] p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            
            {/* Comparison toggle badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <button
                onMouseDown={() => setShowOriginalComparison(true)}
                onMouseUp={() => setShowOriginalComparison(false)}
                onTouchStart={() => setShowOriginalComparison(true)}
                onTouchEnd={() => setShowOriginalComparison(false)}
                className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-semibold text-gray-300 hover:text-white flex items-center space-x-1.5 transition-all cursor-pointer"
                title="Segure o botão para ver a imagem antes das edições"
              >
                <Eye className="w-3.5 h-3.5 text-brand-orange" />
                <span>Segure para Comparar (Antes)</span>
              </button>
            </div>

            {/* Quick Canvas Zoom / Aspect Ratio HUD */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 bg-black/60 backdrop-blur-md border border-white/15 p-1 rounded-xl">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono font-bold px-1.5 text-gray-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(3, Number((z + 0.1).toFixed(1))))}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canvas Container */}
            <div className="relative max-w-full max-h-[50vh] lg:max-h-[60vh] flex items-center justify-center shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white">
              {showOriginalComparison && originalImageSrc ? (
                <img
                  src={originalImageSrc}
                  alt="Original"
                  className="max-h-[50vh] lg:max-h-[60vh] object-contain"
                />
              ) : (
                <canvas
                  ref={canvasRef}
                  className="max-h-[50vh] lg:max-h-[60vh] w-auto h-auto object-contain cursor-crosshair"
                />
              )}
            </div>

            {/* Bottom Canvas Quick Transform Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-20">
              <button
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center space-x-1.5 transition-all cursor-pointer"
                title="Girar 90° Anti-Horário"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Girar Esq.</span>
              </button>
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center space-x-1.5 transition-all cursor-pointer"
                title="Girar 90° Horário"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Girar Dir.</span>
              </button>
              <button
                onClick={() => setFlipH((f) => !f)}
                className={`px-3 py-1.5 rounded-xl border text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                  flipH
                    ? "bg-brand-orange/20 border-brand-orange text-brand-orange font-bold"
                    : "bg-white/5 hover:bg-white/15 border-white/10 text-gray-300 hover:text-white"
                }`}
                title="Espelhar Horizontalmente"
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Espelhar H</span>
              </button>
              <button
                onClick={() => setFlipV((f) => !f)}
                className={`px-3 py-1.5 rounded-xl border text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                  flipV
                    ? "bg-brand-orange/20 border-brand-orange text-brand-orange font-bold"
                    : "bg-white/5 hover:bg-white/15 border-white/10 text-gray-300 hover:text-white"
                }`}
                title="Espelhar Verticalmente"
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Espelhar V</span>
              </button>
              <button
                onClick={resetAdjustments}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center space-x-1.5 transition-all cursor-pointer"
                title="Redefinir todas as edições"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Redefinir</span>
              </button>
            </div>
          </div>

          {/* Right Controls Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-[#161B22] flex flex-col overflow-hidden">
            
            {/* Tool Tabs Navigation */}
            <div className="flex border-b border-white/10 bg-[#0D1117]">
              <button
                onClick={() => setActiveTab("adjust")}
                className={`flex-1 py-3 px-2 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border-b-2 cursor-pointer ${
                  activeTab === "adjust"
                    ? "border-brand-orange text-brand-orange bg-white/5"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Ajustes</span>
              </button>

              <button
                onClick={() => setActiveTab("crop")}
                className={`flex-1 py-3 px-2 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border-b-2 cursor-pointer ${
                  activeTab === "crop"
                    ? "border-brand-orange text-brand-orange bg-white/5"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <Crop className="w-3.5 h-3.5" />
                <span>Enquadrar</span>
              </button>

              <button
                onClick={() => setActiveTab("filters")}
                className={`flex-1 py-3 px-2 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border-b-2 cursor-pointer ${
                  activeTab === "filters"
                    ? "border-brand-orange text-brand-orange bg-white/5"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Filtros</span>
              </button>
            </div>

            {/* Tool Content Scrollable Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6 text-left">
              
              {/* TAB 1: FINE ADJUSTMENTS */}
              {activeTab === "adjust" && (
                <div className="space-y-5">
                  {/* Studio White Background Boost */}
                  <div className="bg-brand-orange/10 border border-brand-orange/30 p-3.5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-brand-orange flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Fundo Branco de Estúdio</span>
                      </label>
                      <span className="font-mono text-xs font-bold text-brand-orange">
                        {whiteClean}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      value={whiteClean}
                      onChange={(e) => setWhiteClean(Number(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-300 leading-tight">
                      Clareia automaticamente o fundo ao redor da embalagem para obter o padrão branco de catálogo limpo.
                    </p>
                  </div>

                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Sun className="w-3.5 h-3.5 text-gray-400" />
                        <span>Brilho</span>
                      </span>
                      <span className="font-mono text-xs text-gray-400">{brightness > 0 ? `+${brightness}` : brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Contrast className="w-3.5 h-3.5 text-gray-400" />
                        <span>Contraste</span>
                      </span>
                      <span className="font-mono text-xs text-gray-400">{contrast > 0 ? `+${contrast}` : contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                  </div>

                  {/* Saturation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Sliders className="w-3.5 h-3.5 text-gray-400" />
                        <span>Saturação de Cor</span>
                      </span>
                      <span className="font-mono text-xs text-gray-400">{saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                  </div>

                  {/* Warmth / Kraft Tone */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Tom Kraft / Temperatura</span>
                      </span>
                      <span className="font-mono text-xs text-gray-400">{warmth > 0 ? `+${warmth}` : warmth}</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={warmth}
                      onChange={(e) => setWarmth(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: CROP & PROPORTIONS */}
              {activeTab === "crop" && (
                <div className="space-y-4">
                  <div className="text-xs text-gray-400 leading-relaxed">
                    Escolha a proporção ideal para encaixar o produto no catálogo:
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: "1:1", label: "1:1 Quadrado", desc: "Padrão do Catálogo", icon: "■" },
                      { id: "4:3", label: "4:3 Embalagem", desc: "Proporção Padrão", icon: "▭" },
                      { id: "16:9", label: "16:9 Banner", desc: "Banner Horizontal", icon: "▬" },
                      { id: "3:4", label: "3:4 Retrato", desc: "Foto Vertical", icon: "▮" },
                      { id: "free", label: "Livre", desc: "Original sem corte", icon: "⚏" },
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setAspectRatio(fmt.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          aspectRatio === fmt.id
                            ? "bg-brand-orange/20 border-brand-orange text-white ring-1 ring-brand-orange"
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white">{fmt.label}</span>
                          <span className="text-brand-orange text-xs">{fmt.icon}</span>
                        </div>
                        <div className="text-[10px] text-gray-400">{fmt.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Zoom controls */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                      <span>Zoom / Enquadramento do Produto</span>
                      <span className="font-mono text-brand-orange">{Math.round(zoom * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: 1-CLICK FILTERS */}
              {activeTab === "filters" && (
                <div className="space-y-4">
                  <div className="text-xs text-gray-400 leading-relaxed">
                    Filtros profissionais com 1 clique para fotos de produtos:
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: "original", name: "Original", desc: "Sem alterações" },
                      { id: "studio-white", name: "Estúdio Limpo", desc: "Fundo branco comercial" },
                      { id: "vibrant", name: "Cores Vivas", desc: "Realce de nitidez" },
                      { id: "warm-kraft", name: "Kraft Especial", desc: "Tons de papel aconchegantes" },
                      { id: "high-contrast", name: "Alto Contraste", desc: "Definição de linhas" },
                      { id: "bw", name: "Preto & Branco", desc: "Monocromático clean" },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => applyPresetFilter(filter.id)}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/50 text-left transition-all cursor-pointer group"
                      >
                        <div className="font-bold text-xs text-white group-hover:text-brand-orange transition-colors">
                          {filter.name}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                          {filter.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions footer inside right sidebar */}
            <div className="p-4 border-t border-white/10 bg-[#0D1117] flex items-center justify-between">
              <button
                onClick={resetAdjustments}
                className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Limpar Edições
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar Foto</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
