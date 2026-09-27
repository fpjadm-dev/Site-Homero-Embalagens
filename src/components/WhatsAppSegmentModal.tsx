import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Coffee, Package, Store, MessageSquare, ArrowRight, UserCheck } from "lucide-react";

export interface SegmentOption {
  id: string;
  title: string;
  attendant: string;
  phone: string;
  description: string;
  icon: React.ReactNode;
  defaultMessage: string;
}

interface WhatsAppSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  customContextMessage?: string; // Optional context like quote details or proposal ID
}

export const SEGMENTS: SegmentOption[] = [
  {
    id: "supermercados",
    title: "Redes Supermercadistas",
    attendant: "Carine",
    phone: "5547999178459",
    description: "Atendimento especializado para supermercados, hipermercados e grandes redes.",
    icon: <ShoppingCart className="w-6 h-6 text-brand-orange" />,
    defaultMessage: "Olá Carine! Gostaria de solicitar um atendimento para *Redes Supermercadistas* da Homero Embalagens.",
  },
  {
    id: "panificadoras",
    title: "Panificadoras / Confeitarias / Cafeterias",
    attendant: "Ana Carolina",
    phone: "5547999360561",
    description: "Soluções sob medida para padarias, confeitarias, docerias e cafeterias.",
    icon: <Coffee className="w-6 h-6 text-brand-orange" />,
    defaultMessage: "Olá Ana Carolina! Gostaria de solicitar um atendimento para *Panificadoras / Confeitarias / Cafeterias* da Homero Embalagens.",
  },
  {
    id: "distribuidores",
    title: "Distribuidores / Atacadistas",
    attendant: "Rômulo",
    phone: "5547988380503",
    description: "Condições e volumes exclusivos para atacadistas, distribuidores e revenda.",
    icon: <Package className="w-6 h-6 text-brand-orange" />,
    defaultMessage: "Olá Rômulo! Gostaria de solicitar um atendimento para *Distribuidores / Atacadistas* da Homero Embalagens.",
  },
  {
    id: "franquias",
    title: "Franquias, Food Service, Etc",
    attendant: "Francisco",
    phone: "5547999360561",
    description: "Projetos em escala para redes de franquias, restaurantes, fast food e food service.",
    icon: <Store className="w-6 h-6 text-brand-orange" />,
    defaultMessage: "Olá Francisco! Gostaria de solicitar um atendimento para *Franquias / Food Service* da Homero Embalagens.",
  },
];

export default function WhatsAppSegmentModal({
  isOpen,
  onClose,
  customContextMessage,
}: WhatsAppSegmentModalProps) {
  const defaultWhatsappNumber = "5547999360561";

  if (!isOpen) return null;

  const handleSelectSegment = (segment: SegmentOption) => {
    let message = `Olá ${segment.attendant}! Sou do segmento de *${segment.title}*.`;

    if (customContextMessage && customContextMessage.trim()) {
      message += `%0A%0A${encodeURIComponent(customContextMessage.trim())}`;
    } else {
      message = encodeURIComponent(segment.defaultMessage);
    }

    const targetNumber = segment.phone || defaultWhatsappNumber;
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Container */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-gray-100 p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-brand-dark p-2 rounded-full transition-colors cursor-pointer focus:outline-hidden"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-left mb-6 pr-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Atendimento WhatsApp B2B
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Qual é o segmento do seu negócio?
              </h3>
              <p className="font-sans text-sm text-gray-600 mt-1.5 leading-relaxed">
                Selecione abaixo para direcionarmos seu contato diretamente ao especialista comercial dedicado do seu setor:
              </p>
            </div>

            {/* Segment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 my-2">
              {SEGMENTS.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => handleSelectSegment(segment)}
                  className="group relative text-left bg-gray-50 hover:bg-brand-dark hover:text-white p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-brand-dark transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-white group-hover:bg-white/10 shadow-xs border border-gray-100 group-hover:border-white/10 transition-colors">
                        {segment.icon}
                      </div>
                      <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 group-hover:text-emerald-400 bg-emerald-50 group-hover:bg-emerald-500/20 px-2.5 py-1 rounded-full transition-colors">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Com {segment.attendant}</span>
                      </div>
                    </div>

                    <h4 className="font-sans text-base font-bold text-brand-dark group-hover:text-white transition-colors">
                      {segment.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-500 group-hover:text-gray-300 mt-1 leading-relaxed transition-colors">
                      {segment.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/80 group-hover:border-white/10 flex items-center justify-between text-xs font-bold text-brand-orange group-hover:text-brand-orange transition-colors">
                    <span>Falar com {segment.attendant}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Atendimento rápido via WhatsApp comercial</span>
              </span>
              <span className="font-semibold text-gray-500">Homero Embalagens</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
