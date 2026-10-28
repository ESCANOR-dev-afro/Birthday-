import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

interface Photo {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

const PHOTOS: Photo[] = [
  {
    src: '/images/IMG-20261028-WA0023.jpg',
    alt: 'Semilore — Birthday Spotlight',
    caption: 'Bright Smiles & Birthday Grace',
    tag: 'SPECIAL MOMENT',
  },
  {
    src: '/test/IMG-20261028-WA0002.jpg',
    alt: 'Semilore smiling',
    caption: 'Good Vibes & Warm Smiles',
    tag: 'TRUE FRIEND',
  },
  {
    src: '/test/IMG-20261028-WA0005.jpg',
    alt: 'Semilore celebrating',
    caption: 'A Bright Future Ahead',
    tag: 'BRIGHT DAYS',
  },
];

export const PhotoGallery: React.FC = () => {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playSparkleChime();
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 300);
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    soundFx.playSoftTap();
    setLightboxIndex(null);
  };

  const nextPhoto = useCallback(() => {
    soundFx.playSoftTap();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % PHOTOS.length : null));
  }, []);

  const prevPhoto = useCallback(() => {
    soundFx.playSoftTap();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + PHOTOS.length) % PHOTOS.length : null));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-7 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-gold-500/30 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] text-gold-400 uppercase shadow-sm">
          <Images className="w-3 h-3 text-gold-400" />
          <span>Memory Grid</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-lavender-glow leading-tight">
          Moments of Semilore
        </h2>
        <p className="text-xs text-lavender-300/80 font-sans max-w-xs mx-auto font-light leading-relaxed">
          Captured joy, warmth, and genuine smiles of a great friend. Tap any photo to enlarge.
        </p>
      </div>

      {/* Adaptive Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-3.5">
        {PHOTOS.map((photo, index) => {
          const isFeatured = index === 0;

          return (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer touch-manipulation group will-change-transform transform-gpu [backface-visibility:hidden] ${
                isFeatured
                  ? 'col-span-2 sm:col-span-1 aspect-[4/3] xs:aspect-[16/10] sm:aspect-[3/4]'
                  : 'col-span-1 aspect-[3/4]'
              } ${tappedIndex === index ? 'scale-[0.97]' : ''} transition-transform duration-200`}
              onClick={(e) => handlePhotoClick(index, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(index);
                }
              }}
              aria-label={`Enlarge photo: ${photo.caption}`}
            >
              {/* Glow ring on hover/tap */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 z-20 pointer-events-none ${
                  tappedIndex === index
                    ? 'border-gold-400/80 shadow-gold-glow'
                    : 'border-violet-500/30 group-hover:border-violet-400/60'
                }`}
              />

              {/* Photo with lazy loading & layout shift prevention */}
              <img
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={800}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 will-change-transform transform-gpu [backface-visibility:hidden]"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/85 via-obsidian-950/10 to-transparent z-10 pointer-events-none" />

              {/* Tag pill */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full badge-nursing text-[8px] font-mono tracking-wider text-lavender-300 uppercase z-20">
                {photo.tag}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 xs:p-3 z-20 pointer-events-none">
                <p className="font-serif italic text-[11px] xs:text-xs text-pearl-100 leading-snug">
                  {photo.caption}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-2.5 h-2.5 text-gold-400 fill-gold-400" />
                  <span className="text-[8px] font-mono text-gold-400 tracking-wider uppercase">
                    Tap to view
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-obsidian-950/92 backdrop-blur-md flex flex-col items-center justify-center p-3 xs:p-4 pb-[max(1rem,env(safe-area-inset-bottom))] select-none touch-manipulation"
            onClick={closeLightbox}
          >
            {/* Top Bar with counter & close */}
            <div
              className="absolute top-3 xs:top-4 left-3 xs:left-4 right-3 xs:right-4 flex items-center justify-between z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1 rounded-full bg-obsidian-900/80 border border-violet-500/30 text-lavender-300 text-[10px] font-mono tracking-wider uppercase">
                {lightboxIndex + 1} / {PHOTOS.length}
              </div>

              <button
                onClick={closeLightbox}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-obsidian-900/80 border border-violet-400/40 text-lavender-200 hover:text-white flex items-center justify-center transition-transform active:scale-90 touch-manipulation"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-violet-400/40 shadow-2xl bg-obsidian-900 max-h-[70vh] flex items-center justify-center">
                <img
                  src={PHOTOS[lightboxIndex].src}
                  alt={PHOTOS[lightboxIndex].alt}
                  width={800}
                  height={1000}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl will-change-transform transform-gpu"
                  loading="eager"
                  decoding="sync"
                />
              </div>

              {/* Lightbox Caption Card */}
              <div className="mt-3 px-4 py-2 rounded-xl bg-obsidian-900/90 border border-violet-500/30 text-center max-w-xs shadow-md">
                <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest block font-medium">
                  {PHOTOS[lightboxIndex].tag}
                </span>
                <p className="font-serif italic text-xs xs:text-sm text-pearl-100 mt-0.5">
                  {PHOTOS[lightboxIndex].caption}
                </p>
              </div>
            </motion.div>

            {/* Navigation Buttons (Left/Right) */}
            <div
              className="absolute inset-y-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none z-30 max-w-lg mx-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="pointer-events-auto w-11 h-11 rounded-full bg-obsidian-900/80 border border-violet-400/30 text-lavender-300 hover:text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="pointer-events-auto w-11 h-11 rounded-full bg-obsidian-900/80 border border-violet-400/30 text-lavender-300 hover:text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
