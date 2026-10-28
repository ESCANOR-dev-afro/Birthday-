import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, HeartHandshake, Zap, Shield, Heart } from 'lucide-react';
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
    icon: Zap,
    title: 'Hardworking & Focused',
    tagline: 'DEDICATED • DRIVEN',
    description: 'When you set your mind on a goal, you put in the real work without making unnecessary noise about it.',
    gradient: 'from-violet-600/25 via-lavender-400/10 to-transparent',
    borderAccent: 'border-violet-400/30',
  },
  {
    icon: HeartHandshake,
    title: 'Genuine & Down-to-Earth',
    tagline: 'REAL • TRUE FRIEND',
    description: 'You\'re always yourself. In a world where real people are rare, your honesty and warmth stand out.',
    gradient: 'from-gold-500/25 via-gold-400/10 to-transparent',
    borderAccent: 'border-gold-400/30',
  },
  {
    icon: Star,
    title: 'Good Energy',
    tagline: 'WARMTH • SMILES',
    description: 'Being around you is easy and light. Your laughter and good vibes make any normal day better.',
    gradient: 'from-violet-600/25 via-lavender-500/12 to-transparent',
    borderAccent: 'border-violet-400/30',
  },
  {
    icon: Shield,
    title: 'Calm Under Pressure',
    tagline: 'STEADY • STRONG',
    description: 'Even when things get busy or stressful, you handle business with patience and a calm head.',
    gradient: 'from-gold-500/22 via-violet-500/12 to-transparent',
    borderAccent: 'border-gold-400/30',
  },
  {
    icon: Heart,
    title: 'The Caring Heart',
    tagline: 'KIND • THOUGHTFUL',
    description: 'You naturally care for the people in your corner, and that kindness is going to touch so many lives.',
    gradient: 'from-violet-700/25 via-lavender-400/10 to-transparent',
    borderAccent: 'border-violet-400/30',
  },
  {
    icon: Sparkles,
    title: 'Big Potential',
    tagline: 'BRIGHT FUTURE',
    description: 'This new year is just the beginning of bigger accomplishments. Keep shining your light.',
    gradient: 'from-gold-400/25 via-gold-300/10 to-transparent',
    borderAccent: 'border-gold-400/35',
  },
];

export const SemiloreHighlights: React.FC = () => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playSparkleChime();
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md sm:max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-1.5 xs:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-violet-500/25 text-lavender-400 text-[9px] xs:text-[10px] font-mono tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>Why We Celebrate You</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-lavender-glow leading-tight">
          What Makes Semilore Special
        </h2>
        <p className="text-xs sm:text-sm text-lavender-300/80 max-w-md mx-auto font-light leading-relaxed">
          The genuine qualities, good energy, and everyday strength that make you such an amazing friend.
        </p>
      </div>

      {/* Grid of trait cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-3.5 sm:gap-4">
        {traits.map((trait, index) => {
          const IconComponent = trait.icon;
          return (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={handleCardClick}
              className={`p-4 xs:p-4.5 sm:p-5 rounded-2xl card-memoir relative overflow-hidden cursor-pointer group transition-all duration-300 border ${trait.borderAccent} hover:border-violet-400/55 hover:shadow-card touch-manipulation select-none active:scale-[0.98]`}
            >
              {/* Background gradient splash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${trait.gradient} opacity-45 group-hover:opacity-90 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-2.5 xs:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-obsidian-950/90 border border-violet-400/30 flex items-center justify-center group-hover:border-violet-400/60 transition-colors shadow-inner">
                    <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono tracking-wider text-gold-400/90 uppercase font-medium">
                    {trait.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-pearl-50 group-hover:text-lavender-200 transition-colors leading-snug">
                    {trait.title}
                  </h3>
                  <p className="text-xs text-pearl-200/80 leading-relaxed mt-1 font-light">
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
