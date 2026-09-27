import React from "react";
import { Send, FileText, CheckCircle2 } from "lucide-react";
import { QuoteFormState } from "../types";
import { PRODUCTS } from "../data";

interface QuoteFormProps {
  formData: QuoteFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedProducts: string[];
  onRemoveProduct: (productId: string) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function QuoteForm({
  formData,
  onChange,
  onSubmit,
  selectedProducts,
  onRemoveProduct,
  formRef
}: QuoteFormProps) {
  // Find products or subgroups that are selected
  const chosenProducts = React.useMemo(() => {
    const list: Array<{ id: string; name: string }> = [];
    PRODUCTS.forEach((p) => {
      if (selectedProducts.includes(p.id)) {
        list.push({ id: p.id, name: p.name });
      }
      if (p.subgroups) {
        p.subgroups.forEach((sub) => {
          if (selectedProducts.includes(sub.id)) {
            list.push({ id: sub.id, name: `${p.name} - ${sub.name}` });
          }
        });
      }
    });
    return list;
  }, [selectedProducts]);

  return (
    <section id="cotacao" className="py-24 bg-brand-light-bg text-brand-dark" ref={formRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-orange block">
            Especificação Comercial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark tracking-tight">
            Solicitar Cotação B2B<span className="text-brand-orange">.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
            Preencha os dados abaixo e nossa equipe preparará uma proposta personalizada para a sua operação.
          </p>
        </div>

        {/* Card Form container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/80 transition-all duration-300">
          
          {/* Mock Browser/App Header Row */}
          <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-brand-orange/80" />
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="w-3 h-3 rounded-full bg-gray-200" />
            </div>
            <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              HOMERO PORTAL DE PARCERIAS B2B
            </span>
          </div>

          {/* Form wrapper */}
          <form onSubmit={onSubmit} className="p-6 sm:p-10 space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nome Completo */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={onChange}
                  placeholder="Seu nome completo"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50/30 font-sans text-sm transition-all outline-hidden"
                />
              </div>

              {/* Empresa */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={onChange}
                  placeholder="Razão social ou Nome Fantasia"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50/30 font-sans text-sm transition-all outline-hidden"
                />
              </div>
            </div>

            {/* CNPJ */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                CNPJ — <span className="text-[10px] text-brand-orange font-bold font-mono">CAMPO B2B</span>
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={onChange}
                placeholder="00.000.000/0000-00"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50/30 font-sans text-sm transition-all outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={onChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-gray-50/30 font-sans text-sm transition-all outline-hidden"
                />
              </div>

              {/* Volume Mensal Estimado */}
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                  Volume Mensal Estimado
                </label>
                <select
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white font-sans text-sm transition-all outline-hidden appearance-none"
                >
                  <option value="">Selecionar volume</option>
                  <option value="Até 5.000 unidades/mês">Até 5.000 unidades/mês</option>
                  <option value="5.000 a 20.000 unidades/mês">5.000 a 20.000 unidades/mês</option>
                  <option value="20.000 a 50.000 unidades/mês">20.000 a 50.000 unidades/mês</option>
                  <option value="Acima de 50.000 unidades/mês">Acima de 50.000 unidades/mês</option>
                </select>
              </div>
            </div>

            {/* Produto de Interesse (Single select if catalog list is empty) */}
            {selectedProducts.length === 0 ? (
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wider block">
                  Produto de Interesse
                </label>
                <select
                  name="productOfInterest"
                  value={formData.productOfInterest}
                  onChange={onChange}
                  required={selectedProducts.length === 0}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white font-sans text-sm transition-all outline-hidden"
                >
                  <option value="">Selecionar produto</option>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              // Selected products tags B2B catalog items
              <div className="space-y-3 p-4 bg-brand-dark rounded-2xl border border-brand-dark/20">
                <span className="font-sans text-xs font-semibold text-brand-orange uppercase tracking-wider block">
                  Itens Selecionados do Catálogo ({selectedProducts.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {chosenProducts.map((p) => (
                    <div
                      key={p.id}
                      className="inline-flex items-center space-x-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white font-sans shadow-2xs hover:border-brand-orange transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{p.name}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveProduct(p.id)}
                        className="text-gray-300 hover:text-brand-orange font-bold pl-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[11px] text-gray-300">
                  Os itens acima serão inclusos diretamente em sua especificação de orçamento.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto font-sans font-medium text-white bg-brand-orange hover:bg-brand-orange-hover px-10 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Especificação</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
