import React, { useState, useEffect } from 'react';

interface LazyBackgroundImageProps {
  src: string;
  className?: string;
  active: boolean;
  onLoad?: () => void;
}

const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({ src, className, active, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lowQualitySrc = src.includes('unsplash') 
    ? `${src}&w=20&q=10` 
    : src; // Fallback for non-unsplash URLs

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Match the crossorigin attribute on the preload link
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      if (onLoad) {
        onLoad();
      }
    };
  }, [src, onLoad]);

  return (
    <div
      className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${className || ''} ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Low-quality, blurred placeholder */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500`}
        style={{
          backgroundImage: `url('${lowQualitySrc}')`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)', // Scale up to avoid blurred edges
          opacity: isLoaded ? 0 : 1,
        }}
      />
      {/* High-quality image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500`}
        style={{
          backgroundImage: `url('${src}')`,
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
};

export default LazyBackgroundImage;