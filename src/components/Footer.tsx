import { Mail, Phone, Clock, Instagram } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  isAdminMode?: boolean;
  customLogo?: string;
  onUpdateLogo?: (base64: string) => void;
  onOpenWhatsAppSegment?: () => void;
  onOpenPhotoEditor?: () => void;
}

export default function Footer({ 
  onScrollToSection,
  isAdminMode = false,
  customLogo,
  onUpdateLogo,
  onOpenWhatsAppSegment,
  onOpenPhotoEditor
}: FooterProps) {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 text-left space-y-6">
            <div className="flex items-center cursor-pointer" onClick={() => onScrollToSection("hero")}>
              <Logo 
                height={86} 
                variant="white" 
                isAdminMode={isAdminMode}
                customLogo={customLogo}
                onUpdateLogo={onUpdateLogo}
              />
            </div>
            <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-sm">
              Indústria e distribuidora de embalagens de papel. Fabricação própria com qualidade certificada e entrega em todo o Brasil.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 text-left space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-orange">
              Navegação
            </h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onScrollToSection("produtos")}
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left"
                >
                  Catálogo de Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("diferenciais")}
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left"
                >
                  Nossos Diferenciais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("cotacao")}
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left"
                >
                  Solicitar Cotação
                </button>
              </li>
              {onOpenPhotoEditor && (
                <li>
                  <button
                    onClick={onOpenPhotoEditor}
                    className="hover:text-brand-orange transition-colors cursor-pointer text-left text-gray-400 font-medium flex items-center gap-1.5"
                  >
                    <span>📸</span>
                    <span>Gerenciar / Editar Fotos</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div className="md:col-span-4 text-left space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-orange">
              Contato
            </h4>
            <ul className="space-y-3.5 font-sans text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:comercial@homeroembalagens.com.br"
                  className="hover:text-brand-orange transition-colors break-all"
                >
                  comercial@homeroembalagens.com.br
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                {onOpenWhatsAppSegment ? (
                  <button
                    onClick={onOpenWhatsAppSegment}
                    className="hover:text-brand-orange transition-colors text-left cursor-pointer font-sans text-sm text-gray-400"
                  >
                    (47) 9 9936-0561
                  </button>
                ) : (
                  <a href="tel:+5547999360561" className="hover:text-brand-orange transition-colors">
                    (47) 9 9936-0561
                  </a>
                )}
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p>Seg - Sex: 08h às 18h</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Instagram className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <a
                  href="https://instagram.com/homero_embalagens"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  @homero_embalagens
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-sans text-xs text-gray-500 space-y-4 sm:space-y-0">
          <p>© 2026 Homero Embalagens. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-brand-orange transition-colors">
              Política de Privacidade
            </a>
            <a href="#terms" className="hover:text-brand-orange transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
