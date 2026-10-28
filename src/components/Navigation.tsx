import React from 'react';
import { Volume2, VolumeX, Sparkles, Music, Star } from 'lucide-react';
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
      <div className="max-w-md mx-auto flex items-center justify-between card-invitation px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 rounded-full shadow-card">

        {/* Monogram / Title */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-violet-700/60 via-violet-500/40 to-gold-500/30 flex items-center justify-center border border-violet-400/50 shadow-inner shrink-0">
            <span className="font-serif font-bold text-lavender-200 text-sm tracking-wider">S</span>
          </div>
          <div className="min-w-0 max-w-[80px] xs:max-w-[130px] sm:max-w-none">
            <span className="font-serif text-xs sm:text-sm tracking-wider text-pearl-100 font-semibold block leading-none truncate">
              Semilore
            </span>
            <span className="text-[8px] sm:text-[9px] text-lavender-400/90 font-mono tracking-wider uppercase leading-tight truncate block mt-0.5">
              Birthday Edition
            </span>
          </div>
        </div>

        {/* Quick Actions (Touch Target ≥ 44px) */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Pause Music' : 'Play Birthday Music'}
            className={`w-9 h-9 xs:w-10 xs:h-10 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px] relative before:absolute before:-inset-1 before:content-[''] rounded-full flex items-center justify-center border transition-all active:scale-90 touch-manipulation ${
              isPlayingMusic
                ? 'bg-violet-600/40 text-violet-300 border-violet-400/70 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'bg-obsidian-900/85 hover:bg-violet-500/20 text-lavender-400 border-violet-400/30'
            }`}
            aria-label="Play music"
          >
            <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
          </button>

          {/* Sparkle Confetti */}
          <button
            onClick={handleSparkleClick}
            title="Send Celebration Sparkles"
            className="w-9 h-9 xs:w-10 xs:h-10 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px] relative before:absolute before:-inset-1 before:content-[''] rounded-full bg-obsidian-900/85 hover:bg-violet-500/20 text-lavender-400 hover:text-lavender-300 flex items-center justify-center border border-violet-400/30 transition-transform active:scale-90 touch-manipulation"
            aria-label="Sparkle burst"
          >
            <Star className="w-4 h-4 text-gold-400" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="w-9 h-9 xs:w-10 xs:h-10 min-w-[36px] min-h-[36px] xs:min-w-[40px] xs:min-h-[40px] relative before:absolute before:-inset-1 before:content-[''] rounded-full bg-obsidian-900/85 hover:bg-obsidian-800 text-pearl-300 flex items-center justify-center border border-violet-400/20 transition-transform active:scale-90 touch-manipulation"
            aria-label="Toggle sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-violet-700" />
            ) : (
              <Volume2 className="w-4 h-4 text-lavender-400" />
            )}
          </button>

          {/* Wish Modal Trigger */}
          <button
            onClick={() => {
              playTap();
              onOpenWishModal();
            }}
            className="flex items-center gap-1.5 px-2.5 xs:px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-violet-600 via-violet-700 to-gold-500 hover:from-violet-500 hover:to-gold-400 text-pearl-50 font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 border border-violet-400/40 touch-manipulation min-h-[40px] xs:min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-pearl-50" />
            <span className="hidden xs:inline text-[10px] sm:text-[11px]">Bless</span>
          </button>
        </div>
      </div>
    </header>
  );
};
