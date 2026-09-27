import React from "react";
import { X, Printer, Download, BookOpen, AlertCircle } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product, SubGroup } from "../types";

interface DownloadCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImages?: Record<string, string>;
}

export default function DownloadCatalogModal({
  isOpen,
  onClose,
  customImages = {}
}: DownloadCatalogModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in select-none print:hidden">
      <div className="bg-[#fcfcfa] text-brand-dark rounded-3xl max-w-4xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-scale-in">
        
        {/* Modal Header */}
        <div className="bg-brand-dark text-white p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-brand-orange/20 rounded-xl text-brand-orange">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">Catálogo de Vendas & Especificações</h3>
              <p className="font-sans text-xs text-gray-300">Layout editorial integrado atualizado em tempo real</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel: Instructions and CTA */}
          <div className="w-full md:w-80 bg-[#f4f4f0] p-6 border-r border-gray-150 flex flex-col justify-between overflow-y-auto text-left">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">Instruções de PDF</span>
                <h4 className="font-serif text-base font-bold text-brand-dark">Como salvar em PDF?</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Ao clicar em <strong>"Gerar PDF / Imprimir"</strong>, a janela de impressão do seu navegador será aberta. 
                  Siga estes passos simples:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-dark/10 text-brand-dark flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-normal">
                    No campo <strong>"Destino"</strong>, selecione a opção <strong>"Salvar como PDF"</strong>.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-dark/10 text-brand-dark flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-normal">
                    Ative a opção <strong>"Gráficos de segundo plano"</strong> para preservar todas as cores e fotos originais.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-dark/10 text-brand-dark flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-normal">
                    Mantenha a orientação como <strong>"Retrato"</strong> e clique em <strong>"Salvar"</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p className="font-sans text-[11px] text-amber-950 leading-relaxed">
                  <strong>Sempre Atualizado:</strong> As fotos customizadas e novos produtos criados pelo painel administrador também aparecem no PDF automaticamente.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={handlePrint}
                className="w-full font-sans text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover py-3.5 px-4 rounded-xl transition-all shadow-md shadow-brand-orange/25 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Gerar PDF / Imprimir</span>
              </button>
              <button
                onClick={onClose}
                className="w-full font-sans text-xs font-semibold text-gray-500 hover:text-brand-dark bg-white/60 hover:bg-white border border-gray-200 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Voltar ao Site
              </button>
            </div>
          </div>

          {/* Right Panel: Beautiful Scale Catalog Document Mock Preview */}
          <div className="flex-1 bg-[#eaeae6] p-4 sm:p-6 overflow-y-auto flex flex-col items-center space-y-8 custom-scrollbar">
            <div className="text-center space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Preview Digital do Catálogo Comercial (A4)</p>
              <p className="text-[9px] text-gray-500 font-medium">Contém todos os {PRODUCTS.length} grupos de produtos, subgrupos e fotos do site</p>
            </div>
            
            {/* 1. Cover Page Sheet */}
            <div className="w-full max-w-[460px] min-h-[580px] bg-[#fdfdfb] p-8 shadow-lg border border-gray-200/50 flex flex-col justify-between relative text-left rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-orange" />
              <div className="flex justify-between items-center text-gray-400">
                {customImages["logo"] ? (
                  <img src={customImages["logo"]} alt="Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-[8px] uppercase tracking-widest font-black text-brand-dark">HOMERO</span>
                )}
                <span className="text-[8px] font-mono font-bold">EDIÇÃO {currentDate}</span>
              </div>

              <div className="space-y-4 my-auto">
                <div className="w-10 h-1 bg-brand-orange" />
                <h2 className="font-serif text-2xl font-black text-brand-dark leading-tight">
                  Embalagens de <br />
                  <span className="text-brand-orange font-normal italic">Alta Performance</span>
                </h2>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Soluções completas e sustentáveis para panificação, delivery, sacolas de papel e personalizações exclusivas com visores de alto brilho.
                </p>
              </div>

              <div className="border-t border-gray-150 pt-4 flex justify-between items-end text-[8px] text-gray-400">
                <div>
                  <p className="font-bold text-brand-dark">Homero Embalagens Ltda.</p>
                  <p>Blumenau - SC • Brasil</p>
                </div>
                <span className="font-mono text-brand-orange font-bold text-[9px]">www.homeroembalagens.com.br</span>
              </div>
            </div>

            {/* 2. Index / Introduction Sheet */}
            <div className="w-full max-w-[460px] min-h-[580px] bg-white p-8 shadow-lg border border-gray-200/50 flex flex-col justify-between relative text-left rounded-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>Índice Oficial</span>
                  <span>Homero Embalagens</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-brand-dark">Sumário Executivo</h3>
                  <div className="space-y-2 pr-1">
                    {PRODUCTS.map((prod, index) => (
                      <div key={prod.id} className="flex justify-between items-end border-b border-dashed border-gray-100 pb-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-mono text-[9px] font-bold text-brand-orange">{prod.number}</span>
                          <span className="font-serif text-[10px] font-semibold text-brand-dark truncate max-w-[200px]">{prod.name}</span>
                        </div>
                        <span className="text-[8px] font-mono text-gray-400">Pág. {index + 3}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between text-[8px] text-gray-400">
                <span>Catálogo de Especificações Técnicas</span>
                <span>Página 2</span>
              </div>
            </div>

            {/* 3. Category Sheets (Dynamic) */}
            {PRODUCTS.map((product: Product, pIndex: number) => {
              const categoryImg = customImages[product.id] || product.image;

              return (
                <div key={product.id} className="w-full max-w-[460px] bg-white p-6 sm:p-8 shadow-lg border border-gray-200/50 flex flex-col justify-between relative text-left rounded-xl space-y-6">
                  
                  {/* Sheet Header */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <span className="bg-brand-dark text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold">
                        {product.number}
                      </span>
                      <span>{product.category}</span>
                    </div>
                    <span>Homero Embalagens</span>
                  </div>

                  {/* Category Info Banner */}
                  <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="col-span-8 space-y-1 text-left">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-brand-dark">{product.name}</h4>
                      <p className="text-[9px] text-gray-500 leading-normal line-clamp-3">{product.description}</p>
                    </div>
                    <div className="col-span-4 h-16 rounded-lg overflow-hidden bg-gray-100 border border-white shadow-3xs">
                      <img 
                        src={categoryImg} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Sub-groups Listing */}
                  <div className="space-y-6 pt-1">
                    {product.subcategories && product.subcategories.length > 0 ? (
                      product.subcategories.map((subcat) => {
                        const subcatImg = customImages[subcat.id] || subcat.image;

                        return (
                          <div key={subcat.id} className="space-y-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
                            {/* Subcategory Banner */}
                            <div className="flex items-center justify-between gap-3 bg-brand-orange/5 p-2.5 rounded-lg border border-brand-orange/10">
                              <div className="text-left space-y-0.5">
                                <span className="text-[8px] font-bold text-brand-orange uppercase tracking-wider">Subcategoria</span>
                                <h5 className="font-serif text-[10px] font-bold text-brand-dark">{subcat.name}</h5>
                              </div>
                              <img src={subcatImg} alt={subcat.name} className="w-8 h-8 rounded object-cover shadow-3xs border border-white shrink-0" referrerPolicy="no-referrer" />
                            </div>

                            {/* Subgroups under Subcategory */}
                            <div className="space-y-4 pl-1.5 border-l border-brand-orange/10">
                              {subcat.subgroups.map((sub: SubGroup) => {
                                const subImg = customImages[sub.id] || sub.image;

                                return (
                                  <div key={sub.id} className="space-y-2 pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                      <div className="text-left">
                                        <span className="text-[8px] font-bold text-brand-orange uppercase tracking-wider">{sub.linha}</span>
                                        <h6 className="font-sans text-[10px] font-bold text-brand-dark leading-tight">{sub.name}</h6>
                                      </div>
                                      <span className="font-mono text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-sm font-bold">Item {sub.number}</span>
                                    </div>

                                    <div className="flex gap-3">
                                      <img src={subImg} alt={sub.name} className="w-12 h-12 rounded-lg object-cover shadow-4xs border border-gray-200 shrink-0" referrerPolicy="no-referrer" />
                                      <div className="text-left space-y-1 flex-1">
                                        <p className="text-[9px] text-gray-500 leading-snug line-clamp-2">{sub.description}</p>
                                        <p className="text-[8px] font-bold text-brand-dark bg-amber-50/50 border border-brand-orange/15 px-1.5 py-0.5 rounded w-fit">Papel: {sub.papel}</p>
                                      </div>
                                    </div>

                                    {/* Subgroup Specs table */}
                                    {sub.tabela && sub.tabela.length > 0 && (
                                      <div className="rounded border border-gray-100 overflow-hidden text-[9px] bg-[#fdfdfb] mt-1">
                                        <div className="grid grid-cols-4 bg-gray-50 px-2 py-1 font-bold text-gray-500 text-[8px] uppercase">
                                          <span>Código</span>
                                          <span>Modelo</span>
                                          <span>Medidas</span>
                                          <span className="text-right">Qtd / Fardo</span>
                                        </div>
                                        <div className="divide-y divide-gray-50 px-2">
                                          {sub.tabela.map((row, rIdx) => (
                                            <div key={rIdx} className="grid grid-cols-4 py-1 text-gray-600 font-mono text-[8px] items-center">
                                              <span className="text-[#7b8735] font-bold flex items-center gap-1">
                                                {row.cor && (
                                                  <span 
                                                    className="inline-block w-2 h-2 rounded-full shrink-0" 
                                                    style={{
                                                      backgroundColor: row.cor === "preto" ? "#000" : row.cor === "azul" ? "#2563eb" : row.cor === "vermelho" ? "#ef4444" : row.cor === "rosa" ? "#ec4899" : row.cor === "amarelo" ? "#f59e0b" : "#9ca3af"
                                                    }}
                                                    title={`Cor: ${row.cor}`}
                                                  />
                                                )}
                                                <span>{row.codigo}</span>
                                              </span>
                                              <span className="font-sans text-brand-dark">{row.modelo}</span>
                                              <span>{row.dimensoes}</span>
                                              <span className="text-right">{row.qtdFardo}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      product.subgroups && product.subgroups.map((sub: SubGroup) => {
                        const subImg = customImages[sub.id] || sub.image;

                        return (
                          <div key={sub.id} className="space-y-2 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div className="text-left">
                                <span className="text-[8px] font-bold text-brand-orange uppercase tracking-wider">{sub.linha}</span>
                                <h5 className="font-sans text-[10px] font-bold text-brand-dark leading-tight">{sub.name}</h5>
                              </div>
                              <span className="font-mono text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-sm font-bold">Item {sub.number}</span>
                            </div>

                            <div className="flex gap-3">
                              <img src={subImg} alt={sub.name} className="w-14 h-14 rounded-lg object-cover shadow-4xs border border-gray-200 shrink-0" referrerPolicy="no-referrer" />
                              <div className="text-left space-y-1 flex-1">
                                <p className="text-[9px] text-gray-500 leading-snug line-clamp-2">{sub.description}</p>
                                <p className="text-[8px] font-bold text-brand-dark bg-amber-50/50 border border-brand-orange/15 px-1.5 py-0.5 rounded w-fit">Papel: {sub.papel}</p>
                              </div>
                            </div>

                            {/* Subgroup Specs table */}
                            {sub.tabela && sub.tabela.length > 0 && (
                              <div className="rounded border border-gray-100 overflow-hidden text-[9px] bg-[#fdfdfb] mt-1">
                                <div className="grid grid-cols-4 bg-gray-50 px-2 py-1 font-bold text-gray-500 text-[8px] uppercase">
                                  <span>Código</span>
                                  <span>Modelo</span>
                                  <span>Medidas</span>
                                  <span className="text-right">Qtd / Fardo</span>
                                </div>
                                <div className="divide-y divide-gray-50 px-2">
                                  {sub.tabela.map((row, rIdx) => (
                                    <div key={rIdx} className="grid grid-cols-4 py-1 text-gray-600 font-mono text-[8px] items-center">
                                      <span className="text-[#7b8735] font-bold flex items-center gap-1">
                                        {row.cor && (
                                          <span 
                                            className="inline-block w-2 h-2 rounded-full shrink-0" 
                                            style={{
                                              backgroundColor: row.cor === "preto" ? "#000" : row.cor === "azul" ? "#2563eb" : row.cor === "vermelho" ? "#ef4444" : row.cor === "rosa" ? "#ec4899" : row.cor === "amarelo" ? "#f59e0b" : "#9ca3af"
                                            }}
                                            title={`Cor: ${row.cor}`}
                                          />
                                        )}
                                        <span>{row.codigo}</span>
                                      </span>
                                      <span className="font-sans text-brand-dark">{row.modelo}</span>
                                      <span>{row.dimensoes}</span>
                                      <span className="text-right">{row.qtdFardo}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Sheet Footer */}
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-[8px] text-gray-400">
                    <span>Mix Completo • {product.name}</span>
                    <span>Página {pIndex + 3}</span>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
}
