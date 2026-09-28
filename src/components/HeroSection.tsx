import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { triggerGrandCelebration, triggerSparkleBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onCelebrate: () => void;
  celebrationCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCelebrate, celebrationCount }) => {
  const [photoAdmirers, setPhotoAdmirers] = useState(52);

  // 3D Tilt Spring Physics (gracefully damped for mobile touch)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePhotoTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    soundFx.playSparkleChime();
    setPhotoAdmirers((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = rect.left + rect.width / 2;
    let clientY = rect.top + rect.height / 2;

    if ('clientX' in e && typeof e.clientX === 'number') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    triggerSparkleBurst(clientX / window.innerWidth, clientY / window.innerHeight);
  };

  const handleCelebrateClick = () => {
    soundFx.playCelebrationFanfare();
    triggerGrandCelebration();
    onCelebrate();
  };

  return (
    <section className="relative pt-16 xs:pt-18 sm:pt-22 pb-6 sm:pb-10 px-2 xs:px-3 sm:px-4 flex flex-col items-center justify-center text-center">
      
      {/* Exclusive Tactile Gift Box / Digital Tribute Shell */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md card-invitation rounded-[2rem] sm:rounded-[2.5rem] p-4.5 xs:p-5 sm:p-7 relative overflow-hidden text-center"
      >
        
        {/* Subtle Tribute Header Register Marks */}
        <div className="flex items-center justify-between pb-3 sm:pb-5 mb-3.5 sm:mb-5 border-b border-copper-500/20 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] xs:tracking-[0.25em] text-copper-300 uppercase">
          <span>SEPTEMBER 28</span>
          <span className="flex items-center gap-1 text-crimson-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 inline-block animate-pulse" />
            FOR MY DEBORAH
          </span>
          <span>MMXXVI</span>
        </div>

        {/* Editorial Overline & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-1.5 xs:space-y-2 mb-4.5 sm:mb-6"
        >
          <p className="text-[10px] xs:text-[11px] font-mono uppercase tracking-[0.22em] xs:tracking-[0.28em] text-copper-400 font-medium">
            A Sacred Tribute from My Heart
          </p>

          <h1 className="font-editorial text-2xl xs:text-3xl sm:text-4xl leading-[1.15] tracking-wide text-copper-glow font-normal">
            My Dearest Deborah,
            <span className="block font-serif italic text-cream-50 font-normal mt-0.5 text-2.5xl xs:text-3.5xl sm:text-4.5xl leading-tight">
              Happy Birthday! ❤️
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-copper-200/90 font-sans max-w-xs mx-auto leading-relaxed font-light tracking-wide pt-0.5">
            To my darling fine girl, celebrating the Queen you are today.
          </p>
        </motion.div>

        {/* Sophisticated Softly Glowing Crimson Red Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto my-3 sm:my-5 perspective-1000 w-full max-w-[245px] xs:max-w-[275px] sm:max-w-[310px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Warm Velvet Crimson & Copper Halo Backlight */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-[3rem] sm:rounded-[3.5rem] bg-gradient-to-tr from-crimson-600/30 via-copper-500/25 to-crimson-900/20 blur-xl sm:blur-2xl opacity-85 animate-subtle-pulse pointer-events-none" />

          {/* 3D Tilting Card Frame */}
          <motion.div
            style={{ rotateX, rotateY }}
            onClick={handlePhotoTap}
            whileTap={{ scale: 0.97 }}
            className="frame-asymmetric p-2 xs:p-2.5 sm:p-3 relative cursor-pointer group transition-shadow duration-500 touch-manipulation"
          >
            {/* Image Inner Container with Hairline Crimson/Copper Inset */}
            <div className="relative aspect-[4/5] w-full rounded-[1.75rem_0.5rem_1.75rem_0.5rem] xs:rounded-[2rem_0.5rem_2rem_0.5rem] sm:rounded-[2.25rem_0.5rem_2.25rem_0.5rem] overflow-hidden bg-espresso-950 ring-1 ring-crimson-500/40">
              <img
                src="/image1.png"
                alt="Deborah"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Sophisticated Editorial Velvet Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-espresso-950/15 pointer-events-none" />

              {/* Understated Status Badge */}
              <div className="absolute top-2 right-2 xs:top-2.5 xs:right-2.5 sm:top-3 sm:right-3 px-2 xs:px-2.5 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-crimson-500/40 text-[10px] text-cream-100 flex items-center gap-1.5 shadow-sm min-h-[30px]">
                <Heart className="w-3 h-3 text-crimson-400 fill-crimson-400" />
                <span className="font-mono text-xs text-copper-200">{photoAdmirers}</span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 xs:bottom-3 xs:left-3 xs:right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-copper-400 uppercase block">
                    MY HONOREE
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm text-cream-50 font-medium">
                    Deborah • Fine Girl
                  </span>
                </div>
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-crimson-300/90 uppercase tracking-widest">
                  NWUNYE 'M
                </span>
              </div>
            </div>

            {/* Subtle Touch Hint */}
            <div className="mt-1.5 text-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-copper-300/80 uppercase">
                Tap photo to send love ❤️
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Refined Action Control in Deep Crimson & Brushed Copper */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-4.5 sm:mt-6 space-y-2 xs:space-y-2.5"
        >
          <button
            onClick={handleCelebrateClick}
            className="w-full py-3.5 sm:py-4 px-4 xs:px-6 rounded-2xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-copper-600 hover:from-crimson-600 hover:to-copper-500 text-cream-50 font-sans font-semibold text-xs xs:text-sm tracking-[0.12em] xs:tracking-[0.15em] uppercase shadow-invitation hover:shadow-halo transition-all duration-300 active:scale-97 flex items-center justify-center gap-2 border border-copper-400/40 touch-manipulation min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-copper-200" />
            <span>Shower Deborah with Love ❤️</span>
          </button>

          <p className="text-[10px] sm:text-[11px] font-mono text-copper-300/70 tracking-widest uppercase">
            Love & Homages Sent: <span className="text-copper-200 font-semibold">{celebrationCount}</span>
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
};
