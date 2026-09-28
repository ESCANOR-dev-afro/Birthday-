import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export const InteractiveCandles: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true]);

  const allBlown = candles.every((c) => !c);

  const blowCandle = (index: number) => {
    soundFx.playSoftTap();
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });

    // If this was the last candle
    const remaining = candles.filter((c, i) => i !== index && c).length;
    if (remaining === 0) {
      soundFx.playCelebrationFanfare();
      triggerSparkleBurst(0.5, 0.4);
    }
  };

  const blowAll = () => {
    soundFx.playCelebrationFanfare();
    setCandles([false, false, false]);
    triggerSparkleBurst(0.5, 0.4);
  };

  const relightCandles = () => {
    soundFx.playSparkleChime();
    setCandles([true, true, true]);
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto">
      <div className="card-invitation rounded-[2rem] sm:rounded-3xl p-4.5 xs:p-6 sm:p-8 text-center relative overflow-hidden border border-copper-500/30">
        
        {/* Subtle background ambient flare */}
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${allBlown ? 'opacity-20' : 'opacity-60'} bg-gradient-to-b from-crimson-600/15 via-transparent to-espresso-950`} />

        {/* Section Header */}
        <div className="relative z-10 mb-5 sm:mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mahogany-900/90 border border-copper-500/20 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] text-copper-300 uppercase">
            <Heart className="w-3 h-3 text-crimson-400 fill-crimson-400" />
            <span>Intimate Birthday Ritual</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-copper-glow leading-tight">
            Make A Wish, Beautiful
          </h2>
          <p className="text-xs text-copper-200/80 max-w-xs mx-auto font-light leading-relaxed">
            {allBlown
              ? '✨ Your wish is sealed with love and answered by grace, my darling Deborah!'
              : 'Close your eyes, fine girl. Make that secret wish in your heart, and tap each flame to blow them out.'}
          </p>
        </div>

        {/* Cake & Candle Visual Stage */}
        <div className="relative z-10 my-6 sm:my-8 flex flex-col items-center">
          
          {/* Candles Container */}
          <div className="flex items-end justify-center gap-5 xs:gap-7 sm:gap-8 mb-[-4px] relative z-20">
            {candles.map((isLit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame with Touch Target >= 48px */}
                <div
                  onClick={() => isLit && blowCandle(idx)}
                  className={`relative cursor-pointer select-none -m-2 p-2 min-w-[48px] min-h-[52px] flex items-center justify-center touch-manipulation transition-transform duration-300 active:scale-95 ${
                    isLit ? 'hover:scale-115' : ''
                  }`}
                  aria-label={`Blow candle ${idx + 1}`}
                >
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        key="lit"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.15, 0.95, 1.1, 1],
                          opacity: 1,
                          filter: ['drop-shadow(0 0 10px rgba(225, 29, 72, 0.9))', 'drop-shadow(0 0 16px rgba(224, 122, 95, 0.9))', 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))']
                        }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ repeat: Infinity, duration: 1.8 + idx * 0.2 }}
                        className="relative"
                      >
                        <div className="w-5 h-8 sm:w-6 sm:h-9 bg-gradient-to-t from-crimson-600 via-amber-400 to-yellow-100 rounded-[50%_50%_20%_20%] shadow-lg animate-pulse" />
                        <div className="absolute inset-0 bg-yellow-200/50 rounded-full blur-xs" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -20, scale: 1.4 }}
                        transition={{ duration: 0.8 }}
                        className="w-4 h-6 text-cream-300 flex items-center justify-center text-xs"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div className="w-3.5 sm:w-4 h-12 xs:h-14 sm:h-16 rounded-t-sm bg-gradient-to-b from-copper-300 via-copper-500 to-crimson-700 border border-copper-400/50 shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60" />
                </div>
              </div>
            ))}
          </div>

          {/* Birthday Cake Base (Stylized Luxury Mahogany Tier) */}
          <div className="w-44 xs:w-48 sm:w-56 h-10 xs:h-12 bg-gradient-to-b from-mahogany-800 via-espresso-900 to-espresso-950 rounded-t-2xl border-t border-x border-copper-400/40 shadow-2xl relative flex items-center justify-center">
            <div className="absolute -top-1 left-2 right-2 h-2 rounded-full bg-crimson-500/30 blur-xs" />
            <span className="font-serif italic text-copper-200 text-xs tracking-wider">
              Deborah's Royal Tier
            </span>
          </div>
          <div className="w-52 xs:w-56 sm:w-64 h-7 xs:h-8 bg-gradient-to-b from-espresso-850 to-espresso-950 rounded-b-xl border border-copper-500/30 shadow-inner flex items-center justify-center">
            <div className="flex gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-crimson-400/60" />
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls with Min Touch Target 44px */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {!allBlown ? (
            <button
              onClick={blowAll}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-crimson-600 to-copper-600 hover:from-crimson-500 hover:to-copper-500 text-cream-50 border border-copper-400/50 text-xs font-semibold flex items-center gap-2 transition-transform active:scale-95 shadow-md touch-manipulation"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Blow All Candles</span>
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-mahogany-850 hover:bg-mahogany-800 text-copper-200 border border-copper-400/50 text-xs font-semibold flex items-center gap-2 transition-transform active:scale-95 shadow-md touch-manipulation"
            >
              <RefreshCw className="w-3.5 h-3.5 text-copper-300" />
              <span>Relight Candles</span>
              <Sparkles className="w-3.5 h-3.5 text-crimson-400" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
