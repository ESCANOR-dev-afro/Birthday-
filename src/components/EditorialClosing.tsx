import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export const EditorialClosing: React.FC = () => {
  const handleBlessingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playSparkleChime();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
  };

  return (
    <footer className="py-10 sm:py-14 px-3 xs:px-4 pb-[max(3rem,calc(env(safe-area-inset-bottom)+2rem))] max-w-md mx-auto text-center relative z-10 border-t border-copper-500/20">
      
      {/* Decorative Monogram Seal Header */}
      <div className="w-10 h-10 rounded-full bg-crimson-800/60 border border-copper-400/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
        <span className="font-serif font-semibold text-copper-100 text-sm">D</span>
      </div>

      {/* Main Closing Letter Block */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <span className="text-[9px] xs:text-[10px] font-mono tracking-[0.25em] xs:tracking-[0.3em] text-copper-400 uppercase block font-medium">
          SENT WITH LOVE
        </span>

        <h3 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-copper-glow leading-tight">
          Always With You
        </h3>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-crimson-400/60 to-transparent mx-auto my-2.5" />

        <p className="font-garamond italic text-sm xs:text-base sm:text-lg text-cream-100/95 leading-relaxed max-w-sm mx-auto">
          "Thank you for being an amazing friend and a blessing in my life. This is just the beginning of your greatness. Happy Birthday, my darling Deborah!"
        </p>

        <p className="font-script text-xl xs:text-2xl sm:text-3xl text-crimson-300 pt-1 leading-tight">
          With all my love & respect, today and always.
        </p>
      </div>

      {/* Blessing Action */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <button
          onClick={handleBlessingClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-crimson-700 to-copper-600 hover:from-crimson-600 hover:to-copper-500 border border-copper-400/40 text-xs text-cream-50 font-medium transition-all active:scale-95 shadow-md min-h-[44px] touch-manipulation"
        >
          <Heart className="w-3.5 h-3.5 text-cream-50 fill-cream-50" />
          <span className="font-sans font-normal tracking-wider">Send My Heartfelt Blessings</span>
          <Sparkles className="w-3.5 h-3.5 text-copper-200" />
        </button>
      </div>

      {/* Haute Couture Impressum */}
      <div className="space-y-1 text-[9px] xs:text-[10px] font-mono tracking-[0.18em] text-copper-300/50 uppercase">
        <p>Bespoke Digital Tribute • Edition MMXXVI</p>
        <p>Designed with Love Exclusively for Deborah</p>
      </div>

    </footer>
  );
};
