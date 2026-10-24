import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt = 'FreshLoop dish presentation',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // SVG Fallback for food photography
  const defaultSvgFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23F5EFE6'/%3E%3Ccircle cx='400' cy='300' r='140' fill='%23FAF7F2' stroke='%23DFD3BF' stroke-width='4'/%3E%3Cpath d='M360 270 Q400 230 440 270 Q480 310 440 350 Q400 390 360 350 Z' fill='%2326523C' opacity='0.3'/%3E%3Ccircle cx='380' cy='290' r='18' fill='%23E06D28' opacity='0.6'/%3E%3Ccircle cx='420' cy='310' r='14' fill='%237A8B7B' opacity='0.7'/%3E%3Ctext x='400' y='490' font-family='sans-serif' font-size='18' fill='%237A8982' text-anchor='middle' font-weight='500'%3EFreshLoop Culinary Kitchen%3C/text%3E%3C/svg%3E";

  const resolvedSrc = hasError ? (fallbackSrc || defaultSvgFallback) : (src || defaultSvgFallback);

  return (
    <div className={`relative overflow-hidden bg-ivory-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-ivory-200 animate-pulse" />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
};
