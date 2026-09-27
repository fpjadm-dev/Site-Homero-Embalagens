import React, { useState, useEffect } from "react";
// @ts-ignore
import logoImg from "../assets/images/homero_logo_clean_1784481431026.jpg";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "white";
  height?: number;
  isAdminMode?: boolean;
  customLogo?: string;
  onUpdateLogo?: (base64: string) => void;
}

function removeWhiteBackground(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const brightness = (r + g + b) / 3;
          
          // Make white/light grey background fully transparent
          if (brightness > 220) {
            const alpha = Math.max(0, Math.min(255, (255 - brightness) * (255 / (255 - 220))));
            data[i + 3] = Math.min(data[i + 3], alpha);
          }
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        resolve(src);
      }
    };
    img.onerror = () => {
      resolve(src);
    };
    img.src = src;
  });
}

export default function Logo({ 
  className = "", 
  variant = "dark", 
  height = 48,
  isAdminMode = false,
  customLogo,
  onUpdateLogo
}: LogoProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imgSrc = customLogo || logoImg;
  const [processedSrc, setProcessedSrc] = useState<string>(imgSrc);

  useEffect(() => {
    let isMounted = true;
    removeWhiteBackground(imgSrc).then((res) => {
      if (isMounted) {
        setProcessedSrc(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [imgSrc]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isAdminMode || !onUpdateLogo) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onUpdateLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`relative flex items-center select-none group/logo ${className}`} 
      style={{ height: `${height}px` }}
    >
      <img 
        src={processedSrc} 
        alt="Homero Embalagens" 
        className={`h-full w-auto object-contain transition-all ${
          variant === "white" ? "brightness-0 invert opacity-90 hover:opacity-100" : ""
        }`}
        referrerPolicy="no-referrer"
      />
      
      {isAdminMode && onUpdateLogo && (
        <>
          <div 
            onClick={handleLogoClick}
            className={`absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer transition-all border-2 border-dashed border-brand-orange z-10 p-1 ${
              variant === "white" ? "rounded-xl" : "rounded-lg"
            }`}
            title="Alterar Logo"
          >
            <span className="font-sans text-[8px] font-bold uppercase tracking-wider text-center text-white leading-none">
              Logo
            </span>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </>
      )}
    </div>
  );
}

