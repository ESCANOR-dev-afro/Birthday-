import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Sun, HeartHandshake, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

interface Trait {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  gradient: string;
  borderAccent: string;
}

const traits: Trait[] = [
  {
    icon: Sun,
    title: 'Unmatched Radiance',
    tagline: 'Fine Girl • Pure Light',
    description: 'Your smile brightens even my darkest days. Your warmth is pure, comforting, and unforgettable.',
    gradient: 'from-crimson-600/25 via-copper-500/15 to-transparent',
    borderAccent: 'border-copper-400/30',
  },
  {
    icon: Crown,
    title: 'Royal Poise & Grace',
    tagline: "Nwunye 'm • True Queen",
    description: 'You carry yourself with a natural, effortless royalty that commands admiration and respect everywhere you go.',
    gradient: 'from-crimson-700/30 via-crimson-500/15 to-transparent',
    borderAccent: 'border-crimson-400/40',
  },
  {
    icon: Compass,
    title: 'Fierce Drive & Wisdom',
    tagline: 'Brilliant • Inspiring',
    description: 'Your ambition and sharpness inspire me daily. Watching you conquer your goals with determination is pure poetry.',
    gradient: 'from-copper-600/25 via-terracotta-500/15 to-transparent',
    borderAccent: 'border-copper-400/30',
  },
  {
    icon: HeartHandshake,
    title: 'A Pure, Loyal Heart',
    tagline: 'My Safe Haven • Precious',
    description: 'Your genuine loyalty and sweet soul make you one in a billion. Having you in my life is a blessing I treasure endlessly.',
    gradient: 'from-crimson-800/30 via-copper-500/20 to-transparent',
    borderAccent: 'border-crimson-400/40',
  },
];

export const DeborahHighlights: React.FC = () => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playSparkleChime();
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md sm:max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-1.5 xs:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mahogany-900/90 border border-copper-500/25 text-copper-300 text-[9px] xs:text-[10px] font-mono tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3 h-3 text-crimson-400" />
          <span>The Radiance of Deborah</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-copper-glow leading-tight">
          Why I Celebrate You
        </h2>
        <p className="text-xs sm:text-sm text-copper-200/80 max-w-md mx-auto font-light leading-relaxed">
          Every single day, you remind me of what true beauty, kindness, and royal grace look like.
        </p>
      </div>

      {/* Grid of bespoke trait cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-3.5 sm:gap-4">
        {traits.map((trait, index) => {
          const IconComponent = trait.icon;
          return (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={handleCardClick}
              className={`p-4 xs:p-4.5 sm:p-5 rounded-2xl card-memoir relative overflow-hidden cursor-pointer group transition-all duration-300 border ${trait.borderAccent} hover:border-crimson-500/50 hover:shadow-invitation touch-manipulation select-none active:scale-[0.98]`}
            >
              {/* Background gradient splash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${trait.gradient} opacity-40 group-hover:opacity-85 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-2.5 xs:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-espresso-950/90 border border-copper-400/30 flex items-center justify-center text-copper-300 group-hover:text-copper-100 group-hover:border-crimson-400/60 transition-colors shadow-inner">
                    <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-crimson-400" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono tracking-wider text-copper-300/90 uppercase font-medium">
                    {trait.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-cream-50 group-hover:text-copper-100 transition-colors leading-snug">
                    {trait.title}
                  </h3>
                  <p className="text-xs text-cream-200/80 leading-relaxed mt-1 font-light">
                    {trait.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
