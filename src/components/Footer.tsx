import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export const Footer: React.FC = () => {
  const handleLoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playSparkleChime();
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <footer className="py-16 px-4 text-center border-t border-copper-500/20 relative z-10">
      <div className="max-w-md mx-auto space-y-4">
        {/* Monogram / Signature */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-crimson-700/50 to-copper-500/30 border border-copper-400/40 flex items-center justify-center mx-auto shadow-inner">
          <span className="font-serif font-bold text-copper-100 text-lg">D</span>
        </div>

        <div>
          <h3 className="font-serif text-xl font-medium text-cream-100">
            Happy Birthday, Deborah ❤️
          </h3>
          <p className="font-script text-2xl text-crimson-300 pt-1">
            Wishing my fine girl a year of unbounded joy & royalty
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={handleLoveClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-mahogany-900/90 text-xs text-copper-200 hover:text-cream-100 border border-copper-400/30 transition-transform active:scale-95 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-crimson-400 fill-crimson-400" />
            <span>Forever Loved & Celebrated</span>
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
          </button>
        </div>

        <p className="text-[11px] text-copper-300/50 font-mono tracking-wider uppercase pt-4">
          Bespoke Digital Tribute • 2026 Edition
        </p>
      </div>
    </footer>
  );
};
