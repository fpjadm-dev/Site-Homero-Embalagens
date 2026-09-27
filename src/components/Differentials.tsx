import { DIFFERENTIALS } from "../data";
import { Package, Palette, Truck, Camera, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DifferentialsProps {
  isAdminMode?: boolean;
  differentialsImage?: string;
  onUpdateImage?: (base64: string) => void;
  onOpenPhotoEditor?: (key: string) => void;
}

export default function Differentials({
  isAdminMode = false,
  differentialsImage,
  onUpdateImage,
  onOpenPhotoEditor
}: DifferentialsProps) {
  
  const handleImageClick = () => {
    if (onOpenPhotoEditor) {
      onOpenPhotoEditor("differentials");
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

  const getIcon = (num: string) => {
    switch (num) {
      case "01":
        return <Package className="w-5 h-5 text-brand-orange" />;
      case "02":
        return <Palette className="w-5 h-5 text-brand-orange" />;
      case "03":
        return <Truck className="w-5 h-5 text-brand-orange" />;
      default:
        return <Package className="w-5 h-5 text-brand-orange" />;
    }
  };

  return (
    <section id="diferenciais" className="py-24 bg-brand-light-bg text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image of warehouse */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/5 bg-gray-200 group"
            >
              <img
                src={differentialsImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"}
                alt="Infraestrutura e Centro de Distribuição Homero Embalagens"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/30 to-transparent pointer-events-none" />

              {/* Editable overlay */}
              {isAdminMode && (
                <div 
                  onClick={handleImageClick}
                  className="absolute inset-0 bg-black/40 hover:bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer transition-all z-20 border-4 border-dashed border-brand-orange rounded-3xl"
                >
                  <Camera className="w-10 h-10 text-brand-orange animate-pulse mb-2" />
                  <span className="font-sans text-sm font-bold uppercase tracking-wider">Alterar Foto Distribuição</span>
                  <span className="font-sans text-xs text-gray-300 mt-1">Clique para fazer upload</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Text content & list */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-orange block">
                Por que a Homero
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-dark tracking-tight leading-tight">
                Diferenciais que Escalam o seu Negócio<span className="text-brand-orange">.</span>
              </h2>
            </div>

            <div className="space-y-8">
              {DIFFERENTIALS.map((diff, index) => (
                <motion.div
                  key={diff.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  {/* Icon wrapper */}
                  <div className="flex-shrink-0 bg-white shadow-xs group-hover:shadow-md border border-brand-dark/10 p-3 rounded-2xl transition-all duration-300">
                    {getIcon(diff.number)}
                  </div>

                  {/* Detail */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-brand-orange">
                        {diff.number}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-brand-dark">
                        {diff.title}
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-xl">
                      {diff.description}
                    </p>
                    
                    {/* Dark Blue Badge */}
                    <span className="inline-block bg-brand-dark text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {diff.badge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
