import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { triggerGrandCelebration, triggerSparkleBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface WaxSealCelebrationProps {
  onCelebrate: () => void;
  celebrationCount: number;
}

export const WaxSealCelebration: React.FC<WaxSealCelebrationProps> = ({
  onCelebrate,
  celebrationCount,
}) => {
  const handlePressSeal = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    soundFx.playCelebrationFanfare();
    onCelebrate();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    triggerGrandCelebration();
    triggerSparkleBurst(x, y);
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto text-center relative">
      <div className="card-invitation rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 relative overflow-hidden border border-violet-500/30">

        {/* Ambient violet glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 xs:space-y-2 mb-5 sm:mb-6">
          <span className="text-[9px] xs:text-[10px] font-mono tracking-[0.22em] xs:tracking-[0.25em] text-lavender-400 uppercase block font-medium">
            DROP BIG BLESSINGS
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-lavender-glow leading-tight">
            Seal of Celebration
          </h3>
          <p className="text-xs text-lavender-300/80 font-sans font-light max-w-xs mx-auto leading-relaxed">
            Press the seal to shower Semilore with violet sparkles, gold confetti, and all your biggest blessings.
          </p>
        </div>

        {/* Digital Celebration Seal in Electric Violet & Champagne Gold */}
        <div className="relative my-5 sm:my-6 flex justify-center items-center">
          {/* Pulsing Backlight */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-violet-600/40 via-gold-500/25 to-violet-900/30 blur-xl animate-subtle-pulse pointer-events-none" />

          <motion.button
            onClick={handlePressSeal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#6d28d9] via-[#4c1d95] to-[#2e1065] border-2 border-gold-400/60 shadow-[0_14px_35px_rgba(0,0,0,0.85),inset_0_2px_5px_rgba(255,235,180,0.3),inset_0_-4px_8px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center cursor-pointer group select-none touch-manipulation active:scale-92 border-glow-animated"
            aria-label="Press celebration seal for Semilore"
          >
            {/* Concentric rings */}
            <div className="absolute inset-1.5 rounded-full border border-gold-300/40 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-lavender-400/25 pointer-events-none" />

            {/* Monogram */}
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors">
              S
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-lavender-200/90 uppercase mt-0.5 font-medium">
              SEMILORE
            </span>
          </motion.button>
        </div>

        {/* Stat Counter Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-violet-500/25 text-xs text-pearl-100 shadow-sm min-h-[34px]">
          <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
          <span className="font-mono text-[10px] xs:text-[11px] text-lavender-300 tracking-wider uppercase">
            Blessings Dropped: <strong className="text-gold-300 font-semibold">{celebrationCount}</strong>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        </div>

      </div>
    </section>
  );
};
