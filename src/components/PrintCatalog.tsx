import React from "react";
import { PRODUCTS } from "../data";
import { SubGroup } from "../types";

interface PrintCatalogProps {
  customImages?: Record<string, string>;
}

export default function PrintCatalog({ customImages = {} }: PrintCatalogProps) {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const mainLogo = customImages["logo"] || "";

  return (
    <div id="printable-catalog" className="hidden print:block bg-white text-brand-dark font-sans text-sm p-0 m-0">
      
      {/* ----------------- COVER PAGE (PAGE 1) ----------------- */}
      <div className="min-h-screen print:min-h-[270mm] flex flex-col justify-between p-10 sm:p-16 print:p-8 relative border-[12px] print:border-[8px] border-brand-dark bg-amber-50/5 print-page-break-after">
        
        {/* Top Accent line */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-brand-orange" />
        
        {/* Header section with brand info */}
        <div className="flex justify-between items-center">
          {mainLogo ? (
            <img 
              src={mainLogo} 
              alt="Homero Embalagens" 
              className="h-20 print:h-16 object-contain" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-black tracking-tight text-brand-dark">HOMERO</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange -mt-1.5">Embalagens</span>
            </div>
          )}
          
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Especificação Comercial</p>
            <p className="text-xs font-semibold text-brand-dark">Catálogo Oficial de Produtos</p>
          </div>
        </div>

        {/* Title Block */}
        <div className="my-auto space-y-8 max-w-2xl">
          <div className="space-y-3">
            <div className="h-1.5 w-20 bg-brand-orange" />
            <h1 className="font-serif text-5xl font-extrabold tracking-tight text-brand-dark leading-none">
              Embalagens de <br />
              <span className="text-brand-orange font-normal italic">Alta Performance</span>
            </h1>
          </div>
          
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            Soluções sustentáveis em papel kraft monolúcido, antigordura, sacos de papel para padarias, hamburguerias, caixas de entrega e personalizações exclusivas.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Edição Geral</p>
              <p className="text-sm font-bold text-brand-dark mt-0.5">{currentDate}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Origem</p>
              <p className="text-sm font-bold text-brand-dark mt-0.5">Blumenau - SC • Brasil</p>
            </div>
          </div>
        </div>

        {/* Footer block */}
        <div className="flex justify-between items-end border-t border-gray-150 pt-8">
          <div>
            <p className="text-xs font-bold text-brand-dark">Homero Embalagens Ltda.</p>
            <p className="text-[10px] text-gray-500">CNPJ: 54.321.098/0001-21 | Inscr. Est: 257.654.321</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-mono text-brand-orange font-bold">www.homeroembalagens.com.br</p>
            <p className="text-[9px] text-gray-400">Este catálogo é atualizado dinamicamente.</p>
          </div>
        </div>
      </div>

      {/* ----------------- INDEX / INTRODUCTION (PAGE 2) ----------------- */}
      <div className="min-h-screen print:min-h-[270mm] p-10 sm:p-16 print:p-8 flex flex-col justify-between relative bg-white print-page-break-after">
        <div className="space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Introdução & Índice</span>
            <span className="text-xs text-gray-400">Homero Embalagens</span>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left side info */}
            <div className="col-span-5 space-y-5">
              <h2 className="font-serif text-2.5xl font-bold text-brand-dark leading-tight">
                Embalagens que encantam o cliente final.
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                A Homero Embalagens desenvolve soluções completas para o setor de alimentação, panificação e delivery. Trabalhamos exclusivamente com papéis certificados de alta gramatura e tintas atóxicas à base de água, em total conformidade com as normas sanitárias e ambientais.
              </p>
              <div className="p-4 bg-amber-50/50 border border-brand-orange/20 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-brand-dark">Diferencial Homero:</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Visores de acetato e BOPP com alto brilho e excelente colagem anti-vazamento, garantindo que o seu alimento permaneça visível e apetitoso.
                </p>
              </div>
            </div>

            {/* Right side Table of Contents */}
            <div className="col-span-7 space-y-5">
              <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-gray-150 pb-2">
                Índice de Categorias
              </h3>
              
              <div className="space-y-3">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="flex justify-between items-end border-b border-dashed border-gray-200 pb-1.5">
                    <div className="flex items-baseline space-x-3">
                      <span className="font-mono text-xs font-bold text-brand-orange">{prod.number}</span>
                      <span className="font-serif text-sm font-semibold text-brand-dark">{prod.name}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{prod.category}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Como realizar pedidos:</h4>
                <ol className="text-xs text-gray-600 space-y-1 list-decimal pl-4">
                  <li>Escolha os itens de seu interesse neste catálogo ou no site.</li>
                  <li>Insira os códigos e dimensões desejados em nossa plataforma de cotação.</li>
                  <li>Nosso time de engenharia de embalagens entrará em contato via WhatsApp para definir os layouts de personalização.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-4">
          <span>Catálogo de Especificações Técnicas</span>
          <span>Homero Embalagens</span>
        </div>
      </div>

      {/* ----------------- CONTINUOUS CATALOG CONTENT (NO HARD PAGINATIONS) ----------------- */}
      <div className="space-y-10 p-8 print:p-6 bg-white">
        {PRODUCTS.map((product) => {
          const categoryImg = customImages[product.id] || product.image;

          return (
            <div 
              key={product.id} 
              className="space-y-6 pt-6 border-t border-gray-200 first:border-t-0 first:pt-0 print-page-break-before text-left"
            >
              {/* Category Page Header */}
              <div className="flex justify-between items-center border-b border-gray-150 pb-2.5 break-after-avoid">
                <div className="flex items-center space-x-3">
                  <span className="bg-brand-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center font-mono">
                    {product.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    {product.category} • {product.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Homero Embalagens</span>
              </div>

              {/* Title & Description banner */}
              <div className="grid grid-cols-12 gap-5 items-center bg-gray-50/80 p-5 print:p-4 rounded-2xl border border-gray-100 break-inside-avoid break-after-avoid">
                <div className="col-span-8 space-y-1">
                  <h2 className="font-serif text-2.5xl font-extrabold text-brand-dark">
                    {product.name}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="col-span-4 h-24 rounded-xl overflow-hidden shadow-xs border border-white">
                  <img 
                    src={categoryImg} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Subcategories & Subgroups continuous stream */}
              <div className="space-y-8 pt-1">
                {product.subcategories && product.subcategories.length > 0 ? (
                  product.subcategories.map((subcat) => {
                    const subcatImg = customImages[subcat.id] || subcat.image;

                    return (
                      <div key={subcat.id} className="space-y-6 pt-2">
                        {/* Subcategory Banner */}
                        <div className="grid grid-cols-12 gap-4 items-center bg-brand-orange/5 p-4 print:p-3 rounded-xl border border-brand-orange/10 break-inside-avoid break-after-avoid">
                          <div className="col-span-9 space-y-0.5">
                            <span className="text-[9.5px] font-bold uppercase tracking-widest text-brand-orange">
                              Subcategoria • {product.name}
                            </span>
                            <h3 className="font-serif text-base font-bold text-brand-dark">
                              {subcat.name}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {subcat.description}
                            </p>
                          </div>
                          <div className="col-span-3 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 shadow-2xs">
                            <img 
                              src={subcatImg} 
                              alt={subcat.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Subgroups under this subcategory */}
                        <div className="space-y-6 pl-2 border-l-2 border-brand-orange/15">
                          {subcat.subgroups.map((sub: SubGroup) => {
                            const subImg = customImages[sub.id] || sub.image;

                            return (
                              <div 
                                key={sub.id} 
                                className="grid grid-cols-12 gap-5 print:gap-4 items-start border-b border-gray-100 pb-5 print:pb-4 last:border-0 last:pb-0 break-inside-avoid"
                              >
                                {/* Subgroup Visual on left */}
                                <div className="col-span-3 space-y-1.5">
                                  <div className="h-28 print:h-24 rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                                    <img 
                                      src={subImg} 
                                      alt={sub.name} 
                                      className="w-full h-full object-cover" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="bg-amber-50/40 border border-brand-orange/10 px-2 py-1 rounded-lg text-center">
                                    <p className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">Papel</p>
                                    <p className="text-[9.5px] font-bold text-brand-dark">{sub.papel}</p>
                                  </div>
                                </div>

                                {/* Subgroup Details on Right */}
                                <div className="col-span-9 space-y-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-[8.5px] font-bold uppercase tracking-widest text-brand-orange">
                                        {sub.linha}
                                      </span>
                                      <h3 className="font-serif text-base font-bold text-brand-dark">
                                        {sub.name}
                                      </h3>
                                    </div>
                                    <span className="font-mono text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm">
                                      Item {sub.number}
                                    </span>
                                  </div>

                                  <p className="text-xs text-gray-500 leading-relaxed">
                                    {sub.description}
                                  </p>

                                  {/* Specifications table */}
                                  {sub.tabela && sub.tabela.length > 0 ? (
                                    <div className="rounded-lg border border-gray-150 overflow-hidden bg-white break-inside-avoid">
                                      <table className="w-full text-[10px] border-collapse">
                                        <thead>
                                          <tr className="bg-gray-50 text-brand-dark border-b border-gray-150">
                                            <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Código</th>
                                            <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Modelo</th>
                                            <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Dimensões</th>
                                            <th className="py-1 px-3 font-bold text-right uppercase text-[8.5px]">Qtd. / Fardo</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-gray-700">
                                          {sub.tabela.map((row, rIdx) => {
                                            const colorClasses: Record<string, string> = {
                                              preto: "bg-zinc-950 ring-1 ring-zinc-400",
                                              azul: "bg-blue-600",
                                              vermelho: "bg-red-500",
                                              rosa: "bg-pink-500",
                                              amarelo: "bg-amber-400"
                                            };
                                            return (
                                              <tr key={rIdx} className="break-inside-avoid">
                                                <td className="py-1 px-3 font-mono text-[9px] text-gray-400 font-bold">
                                                  <div className="flex items-center gap-1.5">
                                                    {row.cor && colorClasses[row.cor.toLowerCase()] && (
                                                      <span 
                                                        className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${colorClasses[row.cor.toLowerCase()]}`}
                                                        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
                                                      />
                                                    )}
                                                    <span>{row.codigo}</span>
                                                    {row.cor && (
                                                      <span className="text-[8px] font-sans font-semibold text-gray-500 capitalize">({row.cor})</span>
                                                    )}
                                                  </div>
                                                </td>
                                                <td className="py-1 px-3 font-medium text-brand-dark">{row.modelo}</td>
                                                <td className="py-1 px-3 text-gray-500">{row.dimensoes}</td>
                                                <td className="py-1 px-3 text-right font-mono text-gray-500">{row.qtdFardo}</td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : (
                                    <div className="rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/[0.01] p-3 flex items-center justify-between break-inside-avoid">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-1.5 bg-brand-orange/10 rounded-full text-brand-orange">
                                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                        </div>
                                        <div className="text-left">
                                          <p className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">Apenas sob encomenda</p>
                                          <p className="text-[9px] text-gray-500">Produzido sob medida com personalização exclusiva de sua marca.</p>
                                        </div>
                                      </div>
                                      <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2 py-0.5 rounded-full">Exclusivo</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  /* Subgroups directly under product */
                  product.subgroups && product.subgroups.map((sub: SubGroup) => {
                    const subImg = customImages[sub.id] || sub.image;

                    return (
                      <div 
                        key={sub.id} 
                        className="grid grid-cols-12 gap-5 print:gap-4 items-start border-b border-gray-100 pb-5 print:pb-4 last:border-0 last:pb-0 break-inside-avoid"
                      >
                        {/* Subgroup Visual on left */}
                        <div className="col-span-3 space-y-1.5">
                          <div className="h-28 print:h-24 rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                            <img 
                              src={subImg} 
                              alt={sub.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="bg-amber-50/40 border border-brand-orange/10 px-2 py-1 rounded-lg text-center">
                            <p className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">Papel</p>
                            <p className="text-[9.5px] font-bold text-brand-dark">{sub.papel}</p>
                          </div>
                        </div>

                        {/* Subgroup Details on Right */}
                        <div className="col-span-9 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[8.5px] font-bold uppercase tracking-widest text-brand-orange">
                                {sub.linha}
                              </span>
                              <h3 className="font-serif text-base font-bold text-brand-dark">
                                {sub.name}
                              </h3>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm">
                              Item {sub.number}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">
                            {sub.description}
                          </p>

                          {/* Specifications table inside print */}
                          {sub.tabela && sub.tabela.length > 0 ? (
                            <div className="rounded-lg border border-gray-150 overflow-hidden bg-white break-inside-avoid">
                              <table className="w-full text-[10px] border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 text-brand-dark border-b border-gray-150">
                                    <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Código</th>
                                    <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Modelo</th>
                                    <th className="py-1 px-3 font-bold text-left uppercase text-[8.5px]">Dimensões</th>
                                    <th className="py-1 px-3 font-bold text-right uppercase text-[8.5px]">Qtd. / Fardo</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                  {sub.tabela.map((row, rIdx) => {
                                    const colorClasses: Record<string, string> = {
                                      preto: "bg-zinc-950 ring-1 ring-zinc-400",
                                      azul: "bg-blue-600",
                                      vermelho: "bg-red-500",
                                      rosa: "bg-pink-500",
                                      amarelo: "bg-amber-400"
                                    };
                                    return (
                                      <tr key={rIdx} className="break-inside-avoid">
                                        <td className="py-1 px-3 font-mono text-[9px] text-gray-400 font-bold">
                                          <div className="flex items-center gap-1.5">
                                            {row.cor && colorClasses[row.cor.toLowerCase()] && (
                                              <span 
                                                className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${colorClasses[row.cor.toLowerCase()]}`}
                                                style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
                                              />
                                            )}
                                            <span>{row.codigo}</span>
                                            {row.cor && (
                                              <span className="text-[8px] font-sans font-semibold text-gray-500 capitalize">({row.cor})</span>
                                            )}
                                          </div>
                                        </td>
                                        <td className="py-1 px-3 font-medium text-brand-dark">{row.modelo}</td>
                                        <td className="py-1 px-3 text-gray-500">{row.dimensoes}</td>
                                        <td className="py-1 px-3 text-right font-mono text-gray-500">{row.qtdFardo}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-dashed border-brand-orange/30 bg-brand-orange/[0.01] p-3 flex items-center justify-between break-inside-avoid">
                              <div className="flex items-center space-x-3">
                                <div className="p-1.5 bg-brand-orange/10 rounded-full text-brand-orange">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">Apenas sob encomenda</p>
                                  <p className="text-[9px] text-gray-500">Produzido sob medida com personalização exclusiva de sua marca.</p>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2 py-0.5 rounded-full">Exclusivo</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Category Footer */}
              <div className="flex justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-3 mt-4 break-before-avoid">
                <span>Homero Embalagens • Mix {product.name}</span>
                <span>Catálogo Oficial</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------- BACK COVER PAGE (LAST PAGE) ----------------- */}
      <div className="min-h-screen flex flex-col justify-between p-16 relative border-[12px] border-brand-dark bg-brand-dark text-white print-page-break-before">
        
        {/* Top Accent line */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-brand-orange" />
        
        {/* Back Cover Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          {mainLogo ? (
            <img 
              src={mainLogo} 
              alt="Homero Embalagens" 
              className="h-16 object-contain invert brightness-0" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="font-serif text-2xl font-black tracking-tight">HOMERO</span>
          )}
          <span className="text-[9px] uppercase font-bold tracking-widest text-brand-orange">Embalagens que geram valor</span>
        </div>

        {/* Corporate closing Statement */}
        <div className="my-auto max-w-xl space-y-6">
          <h2 className="font-serif text-4xl font-extrabold text-white leading-tight">
            Pronto para impulsionar o seu negócio?
          </h2>
          <p className="font-sans text-xs text-gray-300 leading-relaxed">
            Nossa equipe de designers e engenheiros de produto está à sua disposição para criar amostras virtuais e físicas das suas embalagens personalizadas. Alavanque a presença física da sua marca com a qualidade Homero.
          </p>
          <div className="h-1 w-16 bg-brand-orange" />
        </div>

        {/* Corporate contact Details */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 text-xs">
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-brand-orange">Atendimento</p>
            <p className="font-bold text-white">Comercial & Vendas</p>
            <p className="text-gray-400 text-[11px]">(47) 99936-0561</p>
            <p className="text-gray-400 text-[11px]">fpjadm@gmail.com</p>
          </div>
          
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-brand-orange">Sede Fabril</p>
            <p className="font-bold text-white">Blumenau - SC</p>
            <p className="text-gray-400 text-[11px] leading-snug">Rua Engenheiros de Embalagens, 1500</p>
            <p className="text-gray-400 text-[11px]">Bairro Industrial • CEP 89010-000</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-brand-orange">Redes & Web</p>
            <p className="font-bold text-white">Canais Digitais</p>
            <p className="text-gray-400 text-[11px]">@homeroembalagens</p>
            <p className="text-brand-orange font-mono font-bold text-[11px]">www.homeroembalagens.com.br</p>
          </div>
        </div>

        {/* Back Cover bottom line */}
        <div className="flex justify-between items-center text-[9px] text-gray-500 pt-6">
          <span>© {new Date().getFullYear()} Homero Embalagens. Todos os direitos reservados.</span>
          <span>Desenvolvido com foco em alta conversão</span>
        </div>
      </div>

    </div>
  );
}
