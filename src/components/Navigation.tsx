import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Music } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { triggerSparkleBurst } from '../utils/confetti';

interface NavigationProps {
  onOpenWishModal: () => void;
  celebrationCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenWishModal }) => {
  const { isMuted, isPlayingMusic, toggleSound, toggleMusic, playChime, playTap } = useSound();

  const handleSparkleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playChime();
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2 xs:px-3 sm:px-4 pt-[max(0.6rem,env(safe-area-inset-top))] pb-1.5 transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between card-invitation px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 rounded-full shadow-invitation border-copper-500/30">
        
        {/* Monogram / Title */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-crimson-700/60 via-crimson-600/40 to-copper-500/30 flex items-center justify-center border border-copper-400/50 shadow-inner shrink-0">
            <span className="font-serif font-bold text-copper-100 text-sm tracking-wider">D</span>
          </div>
          <div className="min-w-0 truncate">
            <span className="font-serif text-xs sm:text-sm tracking-wider text-cream-100 font-semibold block leading-none truncate">
              Deborah
            </span>
            <span className="text-[8px] sm:text-[9px] text-copper-300/90 font-mono tracking-wider uppercase leading-tight truncate block mt-0.5">
              Nwunye 'm • Pure Royalty
            </span>
          </div>
        </div>

        {/* Quick Actions (Touch Target Optimized >= 40-44px) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Music Serenade Toggle */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? "Pause Serenade" : "Play Birthday Serenade"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all active:scale-90 touch-manipulation ${
              isPlayingMusic
                ? 'bg-crimson-600/40 text-crimson-300 border-crimson-400/70 shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                : 'bg-espresso-900/85 hover:bg-copper-500/20 text-copper-300 border-copper-400/30'
            }`}
            aria-label="Play Serenade"
          >
            <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
          </button>

          {/* Sparkle Confetti Quick Trigger */}
          <button
            onClick={handleSparkleClick}
            title="Send Love Sparkles"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-espresso-900/85 hover:bg-crimson-500/20 text-copper-300 hover:text-copper-200 flex items-center justify-center border border-copper-400/30 transition-transform active:scale-90 touch-manipulation"
            aria-label="Sparkle burst"
          >
            <Sparkles className="w-4 h-4 text-copper-300" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-espresso-900/85 hover:bg-espresso-800 text-cream-300 flex items-center justify-center border border-copper-500/20 transition-transform active:scale-90 touch-manipulation"
            aria-label="Toggle sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-copper-700" />
            ) : (
              <Volume2 className="w-4 h-4 text-copper-400" />
            )}
          </button>

          {/* Wish Modal Trigger */}
          <button
            onClick={() => {
              playTap();
              onOpenWishModal();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-crimson-600 via-crimson-700 to-copper-600 hover:from-crimson-500 hover:to-copper-500 text-cream-50 font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 border border-copper-400/40 touch-manipulation min-h-[38px] sm:min-h-[42px]"
          >
            <Heart className="w-3.5 h-3.5 fill-cream-50" />
            <span className="hidden xs:inline text-[10px] sm:text-[11px]">Wish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
