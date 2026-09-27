import { ArrowRight, ChevronDown, Camera, Sparkles } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import defaultHeroImg from "../assets/images/banner_paper_bags_1784474883126.jpg";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  isAdminMode?: boolean;
  heroImage?: string;
  onUpdateImage?: (base64: string) => void;
  onOpenPhotoEditor?: (key: string) => void;
}

export default function Hero({ 
  onScrollToSection, 
  isAdminMode = false,
  heroImage,
  onUpdateImage,
  onOpenPhotoEditor
}: HeroProps) {

  const handleImageClick = () => {
    if (onOpenPhotoEditor) {
      onOpenPhotoEditor("hero");
      return;
    }
    if (!isAdminMode || !onUpdateImage) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            onUpdateImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-brand-dark leading-[1.12]">
                Soluções em Embalagens de{" "}
                <span className="text-brand-orange italic font-semibold relative inline-block">
                  Alta Performance
                </span>{" "}
                para o seu Negócio
              </h1>
              <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Fabricação própria e distribuição direta. Do papel kraft ao product final — qualidade industrial com logística ágil para todo o Brasil.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <button
                onClick={() => onScrollToSection("cotacao")}
                className="font-sans font-medium text-white bg-brand-orange hover:bg-brand-orange-hover px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Solicitar Cotação B2B</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScrollToSection("produtos")}
                className="font-sans font-medium text-gray-700 bg-white border border-gray-300 hover:border-brand-orange hover:text-brand-orange px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                Ver Catálogo
              </button>
            </motion.div>

            {/* Stats Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100"
            >
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">20+</p>
                <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1">Anos no mercado</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">2000+</p>
                <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1">Clientes ativos</p>
              </div>
              <div>
                <p className="font-serif text-2.5xl sm:text-3.5xl font-semibold text-brand-dark">10M+</p>
                <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1">Unidades / mês</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 mt-12 lg:mt-0 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg sm:max-w-xl aspect-13/10 sm:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-brand-light-bg group"
            >
              <img
                src={heroImage || defaultHeroImg}
                alt="Composição de Embalagens Homero Kraft"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Editable overlay */}
              {isAdminMode && (
                <div 
                  onClick={handleImageClick}
                  className="absolute inset-0 bg-black/40 hover:bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer transition-all z-20 border-4 border-dashed border-brand-orange rounded-3xl"
                >
                  <Camera className="w-10 h-10 text-brand-orange animate-pulse mb-2" />
                  <span className="font-sans text-sm font-bold uppercase tracking-wider">Alterar Foto do Hero</span>
                  <span className="font-sans text-xs text-gray-300 mt-1">Clique para fazer upload</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bounce scroll down indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <button
          onClick={() => onScrollToSection("produtos")}
          className="text-gray-400 hover:text-brand-orange transition-colors flex flex-col items-center space-y-1 text-xs cursor-pointer focus:outline-hidden"
        >
          <span>Explorar Catálogo</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
