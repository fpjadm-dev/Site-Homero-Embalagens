import React, { useState } from "react";
import { X, Check, Printer, FileDown, MessageSquare } from "lucide-react";
import { QuoteFormState } from "../types";
import { PRODUCTS } from "../data";
import Logo from "./Logo";
import WhatsAppSegmentModal from "./WhatsAppSegmentModal";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: QuoteFormState;
  selectedProducts: string[];
  customLogo?: string;
}

export default function ProposalModal({
  isOpen,
  onClose,
  formData,
  selectedProducts,
  customLogo
}: ProposalModalProps) {
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);

  if (!isOpen) return null;

  // Find the selected products / subgroups details
  const chosenProducts = React.useMemo(() => {
    const list: Array<{ id: string; name: string; category: string }> = [];
    PRODUCTS.forEach((p) => {
      if (selectedProducts.includes(p.id) || p.name === formData.productOfInterest) {
        list.push({ id: p.id, name: p.name, category: p.category });
      }
      if (p.subgroups) {
        p.subgroups.forEach((sub) => {
          if (selectedProducts.includes(sub.id)) {
            list.push({ id: sub.id, name: `${p.name} - ${sub.name}`, category: sub.category });
          }
        });
      }
    });

    // Fallback if none chosen
    if (list.length === 0 && formData.productOfInterest) {
      const fromSelect = PRODUCTS.find((p) => p.name === formData.productOfInterest);
      if (fromSelect) {
        list.push({ id: fromSelect.id, name: fromSelect.name, category: fromSelect.category });
      }
    }
    return list;
  }, [selectedProducts, formData.productOfInterest]);

  // Generate unique proposal ID
  const proposalId = `HMR-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  // Build custom context text for proposal WhatsApp redirect
  const proposalContextText = React.useMemo(() => {
    const productsListText = chosenProducts.map((p) => `• ${p.name}`).join("\n");
    return `Gostaria de dar andamento à minha especificação comercial da Homero Embalagens!\n\n*ID da Cotação:* ${proposalId}\n*Cliente:* ${formData.fullName}\n*Empresa:* ${formData.company}\n*CNPJ:* ${formData.cnpj}\n*WhatsApp:* ${formData.whatsapp}\n*Volume Estimado:* ${formData.monthlyVolume}\n*Produtos de Interesse:*\n${productsListText}\n\nEstou aguardando contato para definir o layout da personalização!`;
  }, [chosenProducts, proposalId, formData]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="proposal-modal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 lg:p-8">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-4xl border border-gray-100 flex flex-col md:flex-row print:p-0 print:shadow-none print:border-none">
          
          {/* Main content sheet */}
          <div className="flex-1 p-6 sm:p-10 print:p-0">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-6 print:pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-brand-orange">PROPOSTA TÉCNICA COMERCIAL</span>
                <div className="mt-1">
                  <Logo height={32} variant="dark" customLogo={customLogo} />
                </div>
              </div>
              
              <div className="text-right print:text-left">
                <span className="text-xs text-gray-400 block font-sans">NÚMERO DA COTAÇÃO</span>
                <span className="font-mono text-sm font-bold text-brand-dark">{proposalId}</span>
                <span className="text-xs text-gray-500 block font-sans mt-0.5">
                  Válido até: {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            {/* Proposal Body */}
            <div className="py-8 space-y-6 max-h-[60vh] overflow-y-auto pr-2 print:max-h-none print:overflow-visible print:pr-0">
              
              {/* Client Info Grid */}
              <div className="bg-brand-light-bg border border-brand-dark/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Cliente Solicitante</span>
                  <p className="font-sans text-sm font-semibold text-brand-dark mt-0.5">{formData.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Empresa / Razão Social</span>
                  <p className="font-sans text-sm font-semibold text-brand-dark mt-0.5">{formData.company}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">CNPJ B2B</span>
                  <p className="font-mono text-sm text-brand-dark mt-0.5">{formData.cnpj}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">WhatsApp Cadastrado</span>
                  <p className="font-sans text-sm text-brand-dark mt-0.5">{formData.whatsapp}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-brand-dark">Produtos Solicitados</h4>
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                        <th className="p-4">Produto</th>
                        <th className="p-4">Categoria</th>
                        <th className="p-4">Volume Mensal</th>
                        <th className="p-4 text-right">Especificação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm font-sans">
                      {chosenProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50">
                          <td className="p-4 font-semibold text-brand-dark">{p.name}</td>
                          <td className="p-4 text-gray-500">{p.category}</td>
                          <td className="p-4 text-brand-orange font-semibold">{formData.monthlyVolume}</td>
                          <td className="p-4 text-right text-gray-600">Personalizado</td>
                        </tr>
                      ))}
                      {chosenProducts.length === 0 && (
                        <tr>
                          <td className="p-4 text-gray-500" colSpan={4}>
                            Nenhum produto selecionado. Será consultado no atendimento.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Specification guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-start space-x-2.5">
                  <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-brand-dark">Logística Rápida</h5>
                    <p className="font-sans text-[11px] text-gray-500 mt-0.5">Distribuição para todo o Brasil.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-brand-dark">Matéria Prima Premium</h5>
                    <p className="font-sans text-[11px] text-gray-500 mt-0.5">Fidelidade de cores e resistência.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-brand-dark">Suporte Dedicado B2B</h5>
                    <p className="font-sans text-[11px] text-gray-500 mt-0.5">Especialista disponível no WhatsApp.</p>
                  </div>
                </div>
              </div>

              {/* Informative footer */}
              <div className="bg-brand-dark rounded-2xl p-4">
                <p className="font-sans text-xs text-white leading-relaxed">
                  <strong className="text-brand-orange">Próximo Passo:</strong> Um especialista B2B da Homero entrará em contato com você via WhatsApp em até 15 minutos para solicitar os arquivos de imagem de sua logomarca e gerar as amostras virtuais em 3D das embalagens selecionadas.
                </p>
              </div>

            </div>

            {/* Action buttons (hidden on print) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-100 print:hidden">
              <button
                onClick={handlePrint}
                className="font-sans text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-full flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Salvar PDF</span>
              </button>
              
              <button
                onClick={() => setIsSegmentModalOpen(true)}
                className="font-sans text-xs font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-full flex items-center justify-center space-x-1.5 transition-all transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Iniciar Atendimento WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Close button (top right corner, absolute, hidden on print) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-brand-orange p-2 rounded-full transition-colors cursor-pointer print:hidden focus:outline-hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Segment Selection Modal */}
      <WhatsAppSegmentModal
        isOpen={isSegmentModalOpen}
        onClose={() => setIsSegmentModalOpen(false)}
        customContextMessage={proposalContextText}
      />
    </div>
  );
}
