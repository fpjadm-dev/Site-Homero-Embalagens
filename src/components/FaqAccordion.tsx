import React, { useState } from "react";
import { ChevronDown, HelpCircle, Truck, CreditCard, Clock, Package, Sparkles, Search } from "lucide-react";

interface FaqItem {
  id: string;
  category: "prazos" | "frete" | "pagamento" | "personalizacao";
  categoryLabel: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "f1",
    category: "prazos",
    categoryLabel: "Prazos & Produção",
    question: "Quais são os prazos de produção e entrega das embalagens?",
    answer: "Para produtos da linha padrão do nosso catálogo que temos em estoque, o despacho ocorre em até 24 a 48 horas úteis após a confirmação do pedido para regiões atendidas por transportadora, para regiões atendidas por nossa frota própria, consulte nosso consultor. Para embalagens personalizadas com a marca do cliente, o prazo médio de produção na fábrica é de 30 a 60 dias úteis após a aprovação do layout virtual, dependendo do grupo de produto.",
    icon: <Clock className="w-5 h-5 text-brand-orange" />,
  },
  {
    id: "f2",
    category: "frete",
    categoryLabel: "Frete & Logística",
    question: "Como funciona o frete e a entrega para o meu estado?",
    answer: "Atendemos todo o Brasil através de transportadoras parceiras homologadas. Para a região de Santa Catarina (incluindo Vale do Itajaí, Grande Florianópolis e Joinville), possuímos rotas com frete rodoviário próprio e prazos expressos. Nas demais regiões, o frete pode ser cotado na modalidade CIF (entregue na sua porta) ou FOB (utilizando a transportadora da sua preferência).",
    icon: <Truck className="w-5 h-5 text-brand-orange" />,
  },
  {
    id: "f3",
    category: "pagamento",
    categoryLabel: "Pagamento B2B",
    question: "Quais são as condições de pagamento e faturamento disponíveis?",
    answer: "Oferecemos faturamento facilitado para empresas (CNPJ): boleto bancário (sujeito à rápida aprovação de crédito B2B), desconto especial de 3% para pagamentos via PIX ou depósito à vista, além da opção de parcelamento no cartão de crédito em até 2x sem juros e até 6x com acréscimo da máquininha.",
    icon: <CreditCard className="w-5 h-5 text-brand-orange" />,
  },
  {
    id: "f4",
    category: "prazos",
    categoryLabel: "Mínimos & Fardos",
    question: "Pedido mínimo de itens do catálogo",
    answer: "O pedido mínimo para o varejo é de R$300,00, e para atacados e distribuidores é de R$1.000,00.",
    icon: <Package className="w-5 h-5 text-brand-orange" />,
  },
  {
    id: "f5",
    category: "personalizacao",
    categoryLabel: "Personalização",
    question: "Posso personalizar as embalagens com o logotipo da minha empresa?",
    answer: "Sim! Desenvolvemos embalagens personalizadas. Nossa equipe de pré-impressão cria o layout virtual gratuitamente para você visualizar exatamente como ficarão os itens, antes do início da produção.",
    icon: <Sparkles className="w-5 h-5 text-brand-orange" />,
  },
];

export default function FaqAccordion() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]); // First two open by default
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toggle index open/close
  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Filter items
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-brand-light-bg text-brand-dark relative border-t border-gray-100">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-4 h-4 text-brand-orange" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-orange">
              Perguntas Frequentes (FAQ)
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
            Tire Suas Dúvidas Frequentes<span className="text-brand-orange">.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            Respostas claras sobre prazos de entrega, modalidades de frete, faturamento para CNPJ e personalização de embalagens.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por prazo, frete, boleto, personalizado, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-sans text-sm text-brand-dark transition-all outline-hidden shadow-2xs"
            />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: "todos", label: "Todas as Dúvidas" },
              { id: "prazos", label: "Prazos & Pedidos" },
              { id: "frete", label: "Frete & Entregas" },
              { id: "pagamento", label: "Condições de Pagamento" },
              { id: "personalizacao", label: "Personalização & Qualidade" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-brand-orange text-white border-brand-orange shadow-xs"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List Container */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden text-left shadow-2xs ${
                    isOpen
                      ? "border-brand-orange/40 ring-1 ring-brand-orange/20 shadow-md"
                      : "border-gray-150 hover:border-gray-200"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-brand-orange/15 shrink-0 group-hover:scale-105 transition-transform">
                        {faq.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-brand-orange uppercase tracking-wider block">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="font-sans text-sm sm:text-base font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`p-2 rounded-full bg-gray-100 text-gray-500 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all duration-300 shrink-0 ${
                        isOpen ? "rotate-180 bg-brand-orange/10 text-brand-orange" : ""
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Collapsible Body */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-gray-100 text-gray-600 text-sm leading-relaxed animate-fade-in pl-14 sm:pl-16">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2">
              <p className="font-sans text-sm font-semibold text-gray-500">
                Nenhuma pergunta encontrada para sua busca.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("todos");
                }}
                className="text-xs text-brand-orange font-bold hover:underline"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>

        {/* FAQ Direct Contact Callout */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-brand-orange/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h4 className="font-sans text-sm font-bold text-brand-dark">
              Ainda tem alguma dúvida específica para o seu negócio?
            </h4>
            <p className="font-sans text-xs text-gray-500 mt-0.5">
              Nossa equipe comercial está pronta para atender seu CNPJ via WhatsApp ou e-mail.
            </p>
          </div>

          <a
            href="https://wa.me/5547999360561?text=Ol%C3%A1%21+Gostaria+de+tirar+d%C3%BAvidas+sobre+as+embalagens+Homero."
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            Falar com Consultor
          </a>
        </div>

      </div>
    </section>
  );
}
