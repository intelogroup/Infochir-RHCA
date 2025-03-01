
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageOptimizerProps {
  src: string | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackText?: string;
}

export const ImageOptimizer = ({ 
  src, 
  alt, 
  className = "", 
  width = 400,
  height = 300,
  fallbackText
}: ImageOptimizerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  
  // Check if the image is from the Supabase rhca_covers bucket
  const isRhcaCover = src && (
    src.includes('rhca_covers') || 
    (src.includes('supabase.co') && src.includes('RHCA_vol'))
  );

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    
    // Add quality and resize parameters to the URL if it's an Unsplash image
    if (src.includes('unsplash.com')) {
      const optimizedSrc = `${src}&q=75&w=${width}&fit=crop`;
      img.src = optimizedSrc;
      setImageSrc(optimizedSrc);
    } 
    // Handle Supabase storage URLs
    else if (isRhcaCover || src.includes('supabase.co') || src.includes('llxzstqejdrplmxdjxlu')) {
      // For Supabase images, use the original URL
      img.src = src;
      setImageSrc(src);
      console.log(`[ImageOptimizer] Loading Supabase image: ${src}`);
    } 
    else {
      img.src = src;
      setImageSrc(src);
    }

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error(`[ImageOptimizer] Failed to load image from: ${src}`);
      setHasError(true);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, width, isRhcaCover]);

  if (isLoading) {
    return <Skeleton className={`${className} bg-muted`} style={{ width, height }} />;
  }

  if (hasError || !src) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-emerald-50/50 border border-emerald-100/50 rounded-lg`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center text-emerald-600/50">
          <FileText className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">{fallbackText || "Image non disponible"}</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};
