import { useState, useEffect } from "react";
import { Menu, X, FileText, Download, Sparkles } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  selectedCount: number;
  isAdminMode?: boolean;
  customLogo?: string;
  onUpdateLogo?: (base64: string) => void;
  onDownloadCatalog?: () => void;
  onOpenPhotoEditor?: (key?: string) => void;
}

export default function Navbar({ 
  onScrollToSection, 
  selectedCount,
  isAdminMode = false,
  customLogo,
  onUpdateLogo,
  onDownloadCatalog,
  onOpenPhotoEditor
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-brand-light-bg"
          : "bg-white/50 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onScrollToSection("hero")}>
            <Logo 
              height={78} 
              variant="dark" 
              isAdminMode={isAdminMode}
              customLogo={customLogo}
              onUpdateLogo={onUpdateLogo}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7 lg:space-x-8">
            <button
              onClick={() => onScrollToSection("produtos")}
              className="font-sans text-xs lg:text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors cursor-pointer"
            >
              Produtos
            </button>
            <button
              onClick={() => onScrollToSection("diferenciais")}
              className="font-sans text-xs lg:text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors cursor-pointer"
            >
              Diferenciais
            </button>
            <button
              onClick={() => onScrollToSection("faq")}
              className="font-sans text-xs lg:text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => onScrollToSection("cotacao")}
              className="font-sans text-xs lg:text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors cursor-pointer"
            >
              Cotação
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {onOpenPhotoEditor && (
              <button
                onClick={() => onOpenPhotoEditor()}
                className="font-sans text-xs font-bold text-gray-700 hover:text-brand-orange bg-gray-100 hover:bg-brand-orange/10 px-3.5 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 cursor-pointer border border-gray-200"
                title="Abrir Estúdio de Edição de Fotos"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Editar Fotos</span>
              </button>
            )}
            {onDownloadCatalog && (
              <button
                onClick={onDownloadCatalog}
                className="font-sans text-xs font-semibold text-brand-dark hover:text-white bg-transparent hover:bg-brand-dark border border-brand-dark/20 hover:border-brand-dark px-4 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
                title="Baixar catálogo completo em PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Catálogo</span>
              </button>
            )}
            {selectedCount > 0 && (
              <div 
                onClick={() => onScrollToSection("cotacao")}
                className="flex items-center space-x-1 bg-brand-dark border border-brand-dark/20 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold cursor-pointer animate-pulse"
              >
                <FileText className="w-3 h-3 text-brand-orange" />
                <span>{selectedCount} item{selectedCount > 1 ? "s" : ""}</span>
              </div>
            )}
            <button
              onClick={() => onScrollToSection("cotacao")}
              className="font-sans text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-full transition-all duration-300 shadow-xs hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              Solicitar Cotação
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {selectedCount > 0 && (
              <div 
                onClick={() => onScrollToSection("cotacao")}
                className="flex items-center bg-brand-dark border border-brand-dark/20 text-white px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer"
              >
                <span className="bg-brand-orange text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] mr-1">
                  {selectedCount}
                </span>
                <span>Itens</span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-orange hover:bg-gray-100 focus:outline-hidden cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onScrollToSection("produtos");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 cursor-pointer"
            >
              Produtos
            </button>
            <button
              onClick={() => {
                onScrollToSection("diferenciais");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 cursor-pointer"
            >
              Diferenciais
            </button>
            <button
              onClick={() => {
                onScrollToSection("faq");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                onScrollToSection("cotacao");
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50 cursor-pointer"
            >
              Cotação
            </button>
            {onOpenPhotoEditor && (
              <button
                onClick={() => {
                  onOpenPhotoEditor();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-bold text-brand-orange hover:bg-brand-orange/5 cursor-pointer flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span>Estúdio de Edição de Fotos</span>
              </button>
            )}
            {onDownloadCatalog && (
              <button
                onClick={() => {
                  onDownloadCatalog();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-bold text-brand-orange hover:bg-brand-orange/5 cursor-pointer flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Baixar Catálogo (PDF)</span>
              </button>
            )}
            <div className="pt-2 px-3">
              <button
                onClick={() => {
                  onScrollToSection("cotacao");
                  setIsOpen(false);
                }}
                className="w-full text-center font-sans font-medium text-white bg-brand-orange hover:bg-brand-orange-hover px-4 py-3 rounded-full transition-colors shadow-xs cursor-pointer"
              >
                Solicitar Cotação
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
