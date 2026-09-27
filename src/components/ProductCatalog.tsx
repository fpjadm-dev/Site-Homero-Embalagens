import { useState } from "react";
import { Check, Camera, ArrowLeft, Eye, Download, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product, SubGroup } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProductCatalogProps {
  selectedProducts: string[];
  onToggleProduct: (productId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  isAdminMode?: boolean;
  customImages?: Record<string, string>;
  onUpdateProductImage?: (productId: string, base64: string) => void;
  onDownloadCatalog?: () => void;
  onOpenPhotoEditor?: (key: string) => void;
}

/**
 * Helper to get the most specific image available for a product or subgroup key
 */
function resolveImage(key: string, fallback: string, customImages: Record<string, string> = {}): string {
  if (customImages[key]) return customImages[key];
  // Check alternative variations (with underscores or hyphens)
  const altUnder = key.replace(/-/g, "_");
  if (customImages[altUnder]) return customImages[altUnder];
  const altHyphen = key.replace(/_/g, "-");
  if (customImages[altHyphen]) return customImages[altHyphen];
  
  // Look for case-insensitive or partial match in customImages
  const lowerKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const [k, v] of Object.entries(customImages)) {
    if (k.toLowerCase().replace(/[^a-z0-9]/g, "") === lowerKey && v) {
      return v;
    }
  }

  return fallback;
}

export default function ProductCatalog({
  selectedProducts,
  onToggleProduct,
  onScrollToSection,
  isAdminMode = false,
  customImages = {},
  onUpdateProductImage,
  onDownloadCatalog,
  onOpenPhotoEditor
}: ProductCatalogProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  // Helper to find currently active product group details
  const activeProduct = PRODUCTS.find((p) => p.id === selectedGroupId);

  const handleBackToCatalog = () => {
    setSelectedGroupId(null);
    setSelectedSubCategoryId(null);
  };

  const handleBackToSubcategories = () => {
    setSelectedSubCategoryId(null);
  };

  return (
    <section id="produtos" className="py-24 bg-brand-dark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {selectedGroupId === null || !activeProduct ? (
            /* ==========================================
               MAIN CATEGORY VIEW (AS IT WAS ORIGINALLY)
               ========================================== */
            <motion.div
              key="main-catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-orange">
                  Catálogo de Produtos
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
                  O Mix Completo<span className="text-brand-orange">.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                  Escolha um dos nossos grupos de produtos abaixo para visualizar os modelos, dimensões, especificações técnicas e formular sua cotação.
                </p>
                {onDownloadCatalog && (
                  <div className="pt-2">
                    <button
                      onClick={onDownloadCatalog}
                      className="inline-flex items-center space-x-2 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/20 font-sans text-xs font-bold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Visualizar & Baixar Catálogo (PDF)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Product Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {PRODUCTS.map((product: Product) => {
                  const currentImg = resolveImage(product.id, product.image, customImages);

                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => setSelectedGroupId(product.id)}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between group min-h-[460px] cursor-pointer ring-1 ring-black/5 hover:ring-2 hover:ring-brand-orange relative"
                    >
                      {/* Image Section */}
                      <div className="relative h-60 overflow-hidden bg-gray-100">
                        <img
                          src={currentImg}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== product.image) {
                              target.src = product.image;
                            }
                          }}
                        />
                        {/* Category & ID Overlays */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                          {product.category}
                        </div>
                        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                          {onOpenPhotoEditor && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenPhotoEditor(product.id);
                              }}
                              className="bg-brand-dark/80 hover:bg-brand-orange text-white p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-md cursor-pointer flex items-center justify-center"
                              title="Abrir Estúdio de Edição desta foto"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-brand-orange hover:text-white" />
                            </button>
                          )}
                          <div className="bg-brand-dark/80 text-white min-w-[1.5rem] h-6 px-1.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-md whitespace-nowrap">
                            {product.number}
                          </div>
                        </div>

                        {/* Hover visual cue */}
                        <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visualizar Linha</span>
                          </span>
                        </div>

                        {/* Editable overlay for main category photo */}
                        {isAdminMode && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenPhotoEditor) {
                                onOpenPhotoEditor(product.id);
                              } else if (onUpdateProductImage) {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.onchange = (ev) => {
                                  const file = (ev.target as HTMLInputElement).files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === "string") {
                                        onUpdateProductImage(product.id, reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                };
                                input.click();
                              }
                            }}
                            className="absolute inset-0 bg-black/50 hover:bg-black/70 flex flex-col items-center justify-center text-white cursor-pointer transition-all z-20 border-2 border-dashed border-brand-orange"
                          >
                            <Camera className="w-6 h-6 text-brand-orange animate-bounce mb-1" />
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">Editar / Alterar Foto</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                            {product.name}
                          </h3>
                          <p className="font-sans text-xs text-gray-600 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* View Models CTA */}
                        <div className="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between">
                          <span className="text-xs font-semibold text-brand-orange group-hover:text-brand-orange-hover flex items-center space-x-1">
                            <span>Ver Modelos / Linha Completa</span>
                            <span className="text-brand-orange group-hover:translate-x-1 transition-transform inline-block">→</span>
                          </span>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            {product.subgroups?.length || 0} Itens
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ==========================================
               SUB-GROUPS / NESTED DETAILED GALERIA VIEW
               ========================================== */
            <motion.div
              key="subgroup-catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Back Button and Navigation Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 text-left">
                {activeProduct.subcategories && selectedSubCategoryId !== null ? (
                  <button
                    onClick={handleBackToSubcategories}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer group w-fit"
                  >
                    <ArrowLeft className="w-4 h-4 text-brand-orange group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar para subcategorias</span>
                  </button>
                ) : (
                  <button
                    onClick={handleBackToCatalog}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer group w-fit"
                  >
                    <ArrowLeft className="w-4 h-4 text-brand-orange group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar para todos os produtos</span>
                  </button>
                )}
                
                <div className="font-sans text-xs text-gray-400">
                  Catálogo <span className="text-gray-500">/</span> <span className="text-brand-orange font-medium">{activeProduct.name}</span>
                  {activeProduct.subcategories && selectedSubCategoryId !== null && (
                    <>
                      {" "}
                      <span className="text-gray-500">/</span>{" "}
                      <span className="text-brand-orange font-medium">
                        {activeProduct.subcategories.find((sub) => sub.id === selectedSubCategoryId)?.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {activeProduct.subcategories && selectedSubCategoryId === null ? (
                /* ==========================================
                   NESTED SUBCATEGORIES GRID VIEW
                   ========================================== */
                <div className="space-y-12">
                  {/* Subcategories Header */}
                  <div className="text-left space-y-3 max-w-3xl">
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-orange">
                      Subcategorias • {activeProduct.name}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                      Selecione uma Categoria de Delivery<span className="text-brand-orange">.</span>
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                      Clique em uma das opções abaixo para visualizar os modelos, dimensões e especificações detalhadas de cada linha.
                    </p>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl pt-4 text-left">
                    {activeProduct.subcategories.map((subcat) => (
                      <motion.div
                        key={subcat.id}
                        onClick={() => setSelectedSubCategoryId(subcat.id)}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group min-h-[440px] cursor-pointer ring-1 ring-black/5 hover:ring-2 hover:ring-brand-orange relative"
                        whileHover={{ y: -4 }}
                      >
                        {/* Image Section */}
                        <div className="relative h-60 overflow-hidden bg-gray-100">
                          <img
                            src={resolveImage(subcat.id, subcat.image, customImages)}
                            alt={subcat.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== subcat.image) {
                                target.src = subcat.image;
                              }
                            }}
                          />
                          {/* Edit button in top right */}
                          {onOpenPhotoEditor && (
                            <div className="absolute top-3 right-3 z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenPhotoEditor(subcat.id);
                                }}
                                className="bg-brand-dark/80 hover:bg-brand-orange text-white p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-md cursor-pointer flex items-center justify-center"
                                title="Abrir Estúdio de Edição desta foto"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-brand-orange hover:text-white" />
                              </button>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Explorar Linhas</span>
                            </span>
                          </div>

                          {/* Editable overlay for subcategory photo */}
                          {isAdminMode && (
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenPhotoEditor) {
                                  onOpenPhotoEditor(subcat.id);
                                } else if (!onUpdateProductImage) {
                                  return;
                                } else {
                                  const input = document.createElement("input");
                                  input.type = "file";
                                  input.accept = "image/*";
                                  input.onchange = (ev) => {
                                    const file = (ev.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        if (typeof reader.result === "string") {
                                          onUpdateProductImage(subcat.id, reader.result);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  };
                                  input.click();
                                }
                              }}
                              className="absolute inset-0 bg-black/50 hover:bg-black/70 flex flex-col items-center justify-center text-white cursor-pointer transition-all z-20 border-2 border-dashed border-brand-orange"
                            >
                              <Camera className="w-6 h-6 text-brand-orange animate-bounce mb-1" />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">Editar / Alterar Foto</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                              {subcat.name}
                            </h3>
                            <p className="font-sans text-xs text-gray-600 leading-relaxed">
                              {subcat.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between">
                            <span className="text-xs font-semibold text-brand-orange group-hover:text-brand-orange-hover flex items-center space-x-1">
                              <span>Abrir Subcategoria</span>
                              <span className="text-brand-orange group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                              {subcat.subgroups.length} Linhas de Produtos
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ==========================================
                   SPECIFICATIONS AND MODELS GRID VIEW
                   ========================================== */
                <div className="space-y-12">
                  {/* Sub-group Section Header */}
                  <div className="text-left space-y-3 max-w-3xl">
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-orange">
                      Linha de Produtos • {
                        activeProduct.subcategories && selectedSubCategoryId 
                          ? activeProduct.subcategories.find((sub) => sub.id === selectedSubCategoryId)?.name 
                          : activeProduct.name
                      }
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                      Modelos e Especificações Disponíveis<span className="text-brand-orange">.</span>
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                      Cada item de nossa linha possui controle individual de qualidade. Escolha o modelo que melhor se adapta à sua demanda e clique em adicionar.
                    </p>
                  </div>

                  {/* Sub-groups gallery of cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(activeProduct.subcategories && selectedSubCategoryId
                      ? activeProduct.subcategories.find((sub) => sub.id === selectedSubCategoryId)?.subgroups || []
                      : activeProduct.subgroups || []
                    ).map((sub: SubGroup) => {
                      const isSelected = selectedProducts.includes(sub.id);
                      const currentSubImg = resolveImage(sub.id, sub.image, customImages);

                      return (
                        <div
                          key={sub.id}
                          className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between group min-h-[580px] ${
                            isSelected ? "ring-2 ring-brand-orange" : "ring-1 ring-black/5"
                          }`}
                        >
                          {/* Image container - exact same layout as photo */}
                          <div className="relative h-60 overflow-hidden bg-gray-100">
                            <img
                              src={currentSubImg}
                              alt={sub.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src !== sub.image) {
                                  target.src = sub.image;
                                }
                              }}
                            />
                            {/* Papel badge */}
                            <div className="absolute top-3 left-3 z-10 max-w-[75%]">
                              <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-brand-dark uppercase tracking-wider shadow-sm">
                                Papel: {sub.papel}
                              </div>
                            </div>
                            <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                              {onOpenPhotoEditor && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenPhotoEditor(sub.id);
                                  }}
                                  className="bg-brand-dark/80 hover:bg-brand-orange text-white p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-md cursor-pointer flex items-center justify-center"
                                  title="Abrir Estúdio de Edição desta foto"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-brand-orange hover:text-white" />
                                </button>
                              )}
                              <div className="bg-brand-dark/80 text-white min-w-[2rem] h-8 px-2 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-md whitespace-nowrap">
                                {sub.number}
                              </div>
                            </div>

                            {/* Editable overlay individually in admin panel! */}
                            {isAdminMode && (
                              <div 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onOpenPhotoEditor) {
                                    onOpenPhotoEditor(sub.id);
                                  } else if (!onUpdateProductImage) {
                                    return;
                                  } else {
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (ev) => {
                                      const file = (ev.target as HTMLInputElement).files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                          if (typeof reader.result === "string") {
                                            onUpdateProductImage(sub.id, reader.result);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    };
                                    input.click();
                                  }
                                }}
                                className="absolute inset-0 bg-black/50 hover:bg-black/70 flex flex-col items-center justify-center text-white cursor-pointer transition-all z-20 border-2 border-dashed border-brand-orange"
                              >
                                <Camera className="w-6 h-6 text-brand-orange animate-bounce mb-1" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">Editar / Alterar Foto</span>
                                <span className="font-sans text-[8px] text-gray-300">Abrir Estúdio de Edição</span>
                              </div>
                            )}
                          </div>

                          {/* Card Content with LINHA, PAPEL, and specs table */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="space-y-1.5 min-h-[120px] flex flex-col justify-start">
                                <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors leading-tight">
                                  {sub.name.includes(" - ") ? (
                                    <>
                                      <span className="block">{sub.name.split(" - ")[0]}</span>
                                      <span className="block text-xs font-sans font-semibold text-brand-orange uppercase tracking-wider mt-1.5">
                                        - {sub.name.split(" - ")[1]}
                                      </span>
                                    </>
                                  ) : sub.name.includes(" – ") ? (
                                    <>
                                      <span className="block">{sub.name.split(" – ")[0]}</span>
                                      <span className="block text-xs font-sans font-semibold text-brand-orange uppercase tracking-wider mt-1.5">
                                        – {sub.name.split(" – ")[1]}
                                      </span>
                                    </>
                                  ) : (
                                    sub.name
                                  )}
                                </h3>
                                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                                  {sub.description}
                                </p>
                              </div>

                              {/* Specifications Table */}
                              {sub.tabela && sub.tabela.length > 0 ? (
                                <div className="overflow-auto rounded-lg border border-gray-150 bg-brand-light-bg/50 h-[260px] custom-scrollbar">
                                  <table className="w-full text-[10px] border-collapse">
                                    <thead className="sticky top-0 bg-[#f9faf4] z-10">
                                      <tr className="bg-brand-dark/5 text-brand-dark border-b border-gray-150">
                                        <th className="py-1 px-2 font-bold text-left uppercase text-[8px]">Cód</th>
                                        <th className="py-1 px-2 font-bold text-left uppercase text-[8px]">Modelo</th>
                                        <th className="py-1 px-2 font-bold text-left uppercase text-[8px]">Dimensões</th>
                                        <th className="py-1 px-2 font-bold text-right uppercase text-[8px]">Fardo</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700">
                                      {sub.tabela.map((row, index) => {
                                        const colorClasses: Record<string, string> = {
                                          preto: "bg-zinc-950 ring-1 ring-zinc-400",
                                          azul: "bg-blue-600",
                                          vermelho: "bg-red-500",
                                          rosa: "bg-pink-500",
                                          amarelo: "bg-amber-400"
                                        };
                                        return (
                                          <tr key={index} className="hover:bg-brand-dark/5 transition-colors">
                                            <td className="py-1 px-2 font-mono text-[9px] text-gray-500 whitespace-nowrap">
                                              <div className="flex items-center gap-1.5">
                                                {row.cor && colorClasses[row.cor.toLowerCase()] && (
                                                  <span 
                                                    className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${colorClasses[row.cor.toLowerCase()]}`}
                                                    title={`Cor: ${row.cor}`}
                                                  />
                                                )}
                                                <span>{row.codigo}</span>
                                              </div>
                                            </td>
                                            <td className="py-1 px-2 font-medium">{row.modelo}</td>
                                            <td className="py-1 px-2 text-gray-500 whitespace-nowrap">{row.dimensoes}</td>
                                            <td className="py-1 px-2 text-right font-mono text-gray-500">{row.qtdFardo}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/[0.02] h-[260px] flex flex-col items-center justify-center p-6 text-center space-y-3">
                                  <div className="p-3 bg-brand-orange/10 rounded-full text-brand-orange">
                                    <svg
                                      className="w-6 h-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </div>
                                  <h4 className="font-sans text-xs font-bold text-brand-dark uppercase tracking-wider">
                                    Apenas Sob Encomenda
                                  </h4>
                                  <p className="font-sans text-[11px] text-gray-500 leading-relaxed max-w-[200px]">
                                    Produto produzido sob medida com a personalização exclusiva da sua marca. Adicione à cotação para orçar com nossos especialistas!
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* CTA button: Adicionar à Cotação */}
                            <div className="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between">
                              <button
                                onClick={() => onToggleProduct(sub.id)}
                                className={`text-xs font-semibold flex items-center space-x-1.5 py-1.5 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/15"
                                    : "text-brand-orange hover:text-brand-orange-hover"
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Adicionado</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Adicionar à Cotação</span>
                                    <span className="text-brand-orange group-hover:translate-x-1 transition-transform inline-block">→</span>
                                  </>
                                )}
                              </button>

                              {isSelected && (
                                <button
                                  onClick={() => onScrollToSection("cotacao")}
                                  className="text-[10px] uppercase font-bold text-gray-400 hover:text-brand-orange tracking-wider cursor-pointer"
                                >
                                  Ir para Form
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Secondary return to catalog row */}
              <div className="pt-8 border-t border-white/10 flex justify-center">
                <button
                  onClick={handleBackToCatalog}
                  className="bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-semibold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Voltar para Linhas Principais
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
