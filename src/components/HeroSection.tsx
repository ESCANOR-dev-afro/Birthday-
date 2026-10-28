import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { triggerGrandCelebration, triggerSparkleBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onCelebrate: () => void;
  celebrationCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCelebrate, celebrationCount }) => {
  const [photoAdmirers, setPhotoAdmirers] = useState(84);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
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

      {/* Main Tribute Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md card-invitation rounded-[2rem] sm:rounded-[2.5rem] p-4.5 xs:p-5 sm:p-7 relative overflow-hidden text-center"
      >

        {/* Header register marks */}
        <div className="flex items-center justify-between pb-3 sm:pb-5 mb-3.5 sm:mb-5 border-b border-violet-500/20 text-[9px] xs:text-[10px] font-mono tracking-wider xs:tracking-[0.25em] text-lavender-400 uppercase">
          <span>OCTOBER 28</span>
          <span className="flex items-center gap-1 text-gold-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block animate-pulse" />
            FOR SEMILORE
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
          <p className="text-[10px] xs:text-[11px] font-mono uppercase tracking-wider xs:tracking-[0.28em] text-lavender-400 font-medium break-words">
            Celebrating an Amazing Soul • Happy Birthday Semilore
          </p>

          <h1 className="font-editorial text-2xl xs:text-3xl sm:text-4xl leading-[1.15] tracking-wide text-lavender-glow font-normal">
            Celebrating Semilore,
            <span className="block font-serif italic text-pearl-100 font-normal mt-0.5 text-2xl xs:text-3xl sm:text-4xl leading-tight">
              On Your Special Day ✨
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-lavender-300/90 font-sans max-w-xs mx-auto leading-relaxed font-light tracking-wide pt-0.5">
            Happy Birthday to one of the most genuine and hardworking people I know.
          </p>

          {/* Milestone badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 pt-2">
            <span className="badge-gold px-2.5 py-1 rounded-full text-[9px] xs:text-[10px] font-mono tracking-wider text-gold-300 uppercase flex items-center gap-1">
              <Star className="w-3 h-3 text-gold-400" />
              Birthday Edition ✨
            </span>
            <span className="badge-nursing px-2.5 py-1 rounded-full text-[9px] xs:text-[10px] font-mono tracking-wider text-lavender-300 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-400" />
              Celebrating You
            </span>
          </div>
        </motion.div>

        {/* Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto my-3 sm:my-5 perspective-1000 w-full max-w-[245px] xs:max-w-[275px] sm:max-w-[310px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Halo Backlight */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-[3rem] sm:rounded-[3.5rem] bg-gradient-to-tr from-violet-600/35 via-gold-500/20 to-violet-900/25 blur-xl sm:blur-2xl opacity-90 animate-subtle-pulse pointer-events-none border-glow-animated" />

          {/* 3D Tilting Frame */}
          <motion.div
            style={{ rotateX, rotateY }}
            onClick={handlePhotoTap}
            whileTap={{ scale: 0.97 }}
            className="frame-hero p-2 xs:p-2.5 sm:p-3 relative cursor-pointer group transition-shadow duration-500 touch-manipulation"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full rounded-[1.75rem_0.5rem_1.75rem_0.5rem] xs:rounded-[2rem_0.5rem_2rem_0.5rem] overflow-hidden bg-obsidian-900 ring-1 ring-violet-500/40">

              {/* Skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/80 via-obsidian-900 to-obsidian-800 animate-pulse flex flex-col items-center justify-center space-y-2 z-0">
                  <div className="w-8 h-8 rounded-full bg-violet-800/40 border border-lavender-400/30 flex items-center justify-center animate-spin">
                    <Sparkles className="w-4 h-4 text-lavender-300" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-lavender-300/70 uppercase">
                    Unveiling Portrait...
                  </span>
                </div>
              )}

              {/* Portrait Image */}
              <img
                src="/test/IMG-20261028-WA0001.jpg"
                alt="Semilore • Celebrating an Amazing Soul"
                width={310}
                height={388}
                fetchPriority="high"
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu [backface-visibility:hidden] ${
                  isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                loading="eager"
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/75 via-transparent to-obsidian-950/10 pointer-events-none z-10" />

              {/* Admirer Badge */}
              <div className="absolute top-2 right-2 xs:top-2.5 xs:right-2.5 sm:top-3 sm:right-3 px-2 xs:px-2.5 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-violet-500/40 text-[10px] text-pearl-100 flex items-center gap-1.5 shadow-sm min-h-[30px] z-20">
                <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                <span className="font-mono text-xs text-gold-300">{photoAdmirers}</span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 xs:bottom-3 xs:left-3 xs:right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between text-left z-20">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-lavender-400 uppercase block">
                    THE HONOREE
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm text-pearl-50 font-medium">
                    Semilore
                  </span>
                </div>
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-gold-400/90 uppercase tracking-widest">
                  Birthday Edition ✨
                </span>
              </div>
            </div>

            {/* Touch hint */}
            <div className="mt-1.5 text-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-lavender-400/80 uppercase">
                Tap photo to send cheers ✨
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Milestone Banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-4 px-4 py-2 rounded-2xl glass-panel-gold text-center max-w-xs"
        >
          <p className="text-[9px] xs:text-[10px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
            Celebrating an Amazing Soul • Happy Birthday Semilore
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4.5 sm:mt-6 space-y-2 xs:space-y-2.5"
        >
          <button
            onClick={handleCelebrateClick}
            className="w-full py-3.5 sm:py-4 px-4 xs:px-6 rounded-2xl bg-gradient-to-r from-violet-700 via-violet-600 to-gold-500 hover:from-violet-600 hover:to-gold-400 text-pearl-50 font-sans font-semibold text-xs xs:text-sm tracking-[0.12em] xs:tracking-[0.15em] uppercase shadow-violet-glow hover:shadow-halo transition-all duration-300 active:scale-97 flex items-center justify-center gap-2 border border-violet-400/40 touch-manipulation min-h-[52px]"
          >
            <Sparkles className="w-4 h-4 text-gold-200" />
            <span>Send Semilore Birthday Flowers & Cheers 🌸</span>
          </button>

          <p className="text-[10px] sm:text-[11px] font-mono text-lavender-400/70 tracking-widest uppercase">
            Blessings & Cheers Sent: <span className="text-gold-400 font-semibold">{celebrationCount}</span>
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
};
