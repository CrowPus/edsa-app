import React from 'react';

export interface ImagePlaceholderProps {
  name?: string;
  filename?: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'hero';
  aspect?: string;
  className?: string;
  theme?: 'navy' | 'slate' | 'amber' | 'emerald';
  badge?: string;
  badgeText?: string;
  overlayText?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  name,
  filename,
  alt,
  aspectRatio,
  aspect,
  className = '',
  theme = 'navy',
  badge,
  badgeText,
  overlayText
}) => {
  const assetName = filename || name || 'edsa-asset.jpg';
  const effectiveBadge = badgeText || badge;
  
  let aspectClass = 'aspect-[16/9]';
  const chosenAspect = (aspectRatio || aspect || 'video') as string;
  if (chosenAspect === 'square') aspectClass = 'aspect-square';
  else if (chosenAspect === 'portrait') aspectClass = 'aspect-[3/4]';
  else if (chosenAspect === 'wide') aspectClass = 'aspect-[21/9]';
  else if (chosenAspect === 'hero') aspectClass = 'aspect-[16/8] sm:aspect-[21/9]';
  else aspectClass = 'aspect-[16/9]';

  const themeGradients = {
    navy: 'bg-inverse-canvas',
    slate: 'bg-surface-1',
    amber: 'bg-canvas',
    emerald: 'bg-surface-2'
  }[theme];

  const isRealAsset = assetName.includes('hero-edsa-infrastructure') || assetName.includes('infrastructure');
  const imageSrc = isRealAsset ? '/hero-edsa-infrastructure.png' : undefined;

  return (
    <figure className={`relative overflow-hidden ${themeGradients} border border-border group ${aspectClass} ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
        />
      ) : (
        <>
          {/* Structural technical grid pattern */}
          <svg
            className="absolute inset-0 h-full w-full opacity-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <pattern id={`grid-${name}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${name})`} />
          </svg>

          {/* Decorative Technical Geometry & Waveform */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg
              viewBox="0 0 200 120"
              className="w-3/4 h-3/4 text-fg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {/* Transmission Pylon & Wave Silhouette */}
              <path d="M100 10 L80 110 M100 10 L120 110 M70 40 L130 40 M65 70 L135 70 M85 40 L115 70 M115 40 L85 70" />
              <path d="M20 90 Q 60 70, 100 90 T 180 90" stroke="currentColor" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="100" cy="10" r="4" fill="currentColor" />
            </svg>
          </div>
        </>
      )}

      {/* Content overlays */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30">
        <div className="flex items-start justify-between gap-2">
          {effectiveBadge ? (
            <span className="inline-flex items-center px-2 py-1 text-[11px] font-bold tracking-wider uppercase bg-edsa-red text-white border border-transparent">
              {effectiveBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-900/80 border border-white/20 text-white">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-none animate-pulse" />
              Official Infrastructure Asset
            </span>
          )}

          {isRealAsset ? (
            <span className="text-[11px] font-semibold text-slate-200 bg-slate-950/80 px-2 py-0.5 border border-white/20 hidden sm:inline-block">
              EDSA Grid
            </span>
          ) : (
            <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 border border-white/20 hidden sm:inline-block">
              {assetName}
            </span>
          )}
        </div>

        <div>
          {overlayText && (
            <p className="text-sm sm:text-base font-medium text-white line-clamp-2 mb-1">
              {overlayText}
            </p>
          )}
          <figcaption className="text-xs text-slate-200 font-medium flex items-center justify-between bg-slate-950/80 px-2 py-1 border border-white/20 mt-2">
            <span className="line-clamp-1">{alt}</span>
            <span className="text-[10px] font-mono shrink-0 ml-2 hidden md:inline text-amber-400">EDSA National Grid</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
};
