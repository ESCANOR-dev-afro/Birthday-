import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
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
      <div className="card-invitation rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 relative overflow-hidden border border-copper-500/30">
        
        {/* Subtle Ambient Crimson Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-crimson-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 xs:space-y-2 mb-5 sm:mb-6">
          <span className="text-[9px] xs:text-[10px] font-mono tracking-[0.22em] xs:tracking-[0.25em] text-copper-400 uppercase block font-medium">
            A SACRED TRADITION OF HONOR
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-copper-glow leading-tight">
            Seal of My Heart
          </h3>
          <p className="text-xs text-copper-200/80 font-sans font-light max-w-xs mx-auto leading-relaxed">
            A ceremonial press to shower my darling Deborah with love, copper sparkles, and crimson fireworks.
          </p>
        </div>

        {/* Artisanal Digital Wax Seal Button in Deep Velvet Crimson & Copper Inlay */}
        <div className="relative my-5 sm:my-6 flex justify-center items-center">
          {/* Pulsing Crimson & Copper Backlight */}
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-crimson-600/35 via-copper-500/25 to-crimson-900/30 blur-xl animate-subtle-pulse pointer-events-none" />

          <motion.button
            onClick={handlePressSeal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative w-24 h-24 xs:w-26 xs:h-26 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#9e1633] via-[#731024] to-[#400813] border-2 border-copper-400/60 shadow-[0_14px_35px_rgba(0,0,0,0.85),inset_0_2px_5px_rgba(255,215,190,0.45),inset_0_-4px_8px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center cursor-pointer group select-none touch-manipulation active:scale-92"
            aria-label="Press ceremonial wax seal"
          >
            {/* Concentric Relief Rings in Brushed Copper */}
            <div className="absolute inset-1.5 rounded-full border border-copper-300/40 pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-copper-400/25 pointer-events-none" />

            {/* Monogram Seal 'D' */}
            <span className="font-serif text-3xl sm:text-4xl font-bold text-copper-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] group-hover:text-white transition-colors">
              D
            </span>

            <span className="text-[8px] font-mono tracking-[0.2em] text-copper-200/90 uppercase mt-0.5 font-medium">
              SEALED
            </span>
          </motion.button>
        </div>

        {/* Stat Counter Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mahogany-900/90 border border-copper-500/25 text-xs text-cream-100 shadow-sm min-h-[34px]">
          <Heart className="w-3.5 h-3.5 text-crimson-400 fill-crimson-400" />
          <span className="font-mono text-[10px] xs:text-[11px] text-copper-300 tracking-wider uppercase">
            Love Sealed: <strong className="text-copper-100 font-semibold">{celebrationCount}</strong>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-copper-400" />
        </div>

      </div>
    </section>
  );
};
