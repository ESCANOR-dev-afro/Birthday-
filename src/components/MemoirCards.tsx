import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Feather } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

interface MemoirItem {
  id: string;
  number: string;
  category: string;
  title: string;
  preview: string;
  leadParagraph: string;
  bodyParagraph: string;
  closingLine: string;
  sealDate: string;
}

const MEMOIRS: MemoirItem[] = [
  {
    id: 'note-today',
    number: '01',
    category: 'FROM MY HEART',
    title: 'A Note for My Special One ✨',
    preview: 'Thinking of you today and always. Your strength and grace are my greatest inspiration...',
    leadParagraph: 'Thinking of you today and always. Your strength and grace are my greatest inspiration.',
    bodyParagraph: 'From the very first moment our paths crossed, I knew there was something exceptionally rare about you. You bring such effortless light, warmth, and peace into my world. In every season, watching you walk with such poise, quiet strength, and genuine heart reminds me how blessed I am to have you in my corner.',
    closingLine: 'Always proud of the woman you are, my darling.',
    sealDate: 'ALWAYS & FOREVER',
  },
  {
    id: 'why-iconic',
    number: '02',
    category: 'PURE ROYALTY',
    title: "Why You're Truly Iconic",
    preview: "From the day I met you, I knew you were special. You light up every room you enter, nwunye 'm...",
    leadParagraph: "From the day I met you, I knew you were special. You light up every room you enter, nwunye 'm...",
    bodyParagraph: 'You are the complete definition of elegance meets substance. Your infectious laughter, your sharp intellect, your unmatched style, and that pure heart of yours—everything about you is magnetic. You don’t even have to try; you simply command respect, warmth, and love wherever you step.',
    closingLine: 'An undeniable Queen in every sense of the word.',
    sealDate: 'TIMELESS BEAUTY',
  },
  {
    id: 'birthday-wish',
    number: '03',
    category: 'MY PRAYER & BLESSING',
    title: 'My Wish for You This Year',
    preview: 'My prayer for you this new age is that joy, peace, and overflowing blessings locate you...',
    leadParagraph: 'My prayer for you this new age is that joy, peace, and overflowing blessings locate you. Shine on, beautiful!',
    bodyParagraph: 'I pray that every single door you knock on opens wide for you. May your heart find absolute serenity, your laughter remain loud and carefree, and every silent prayer you whisper be answered in ways greater than you imagined. You deserve only the finest things this life has to offer.',
    closingLine: 'Shine on endlessly, my fine girl.',
    sealDate: 'HEARTFELT BLESSING',
  },
];

export const MemoirCards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('note-today');

  const toggleCard = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playSoftTap();
    const nextState = expandedId === id ? null : id;
    setExpandedId(nextState);

    if (nextState) {
      soundFx.playSparkleChime();
      const rect = e.currentTarget.getBoundingClientRect();
      triggerSparkleBurst((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
    }
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto">
      {/* Section Tag & Editorial Header */}
      <div className="text-center mb-5 sm:mb-7 space-y-1.5 xs:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mahogany-900/90 border border-copper-500/30 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] xs:tracking-[0.25em] text-copper-300 uppercase shadow-sm">
          <Feather className="w-3 h-3 text-crimson-400" />
          <span>Intimate Reflections</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-copper-glow leading-tight">
          Words from My Heart
        </h2>
        <p className="text-xs text-copper-200/80 font-sans max-w-xs mx-auto font-light leading-relaxed">
          Tap each folio below to unseal personal reflections and wishes straight from me to you, nwunye 'm.
        </p>
      </div>

      {/* Accordion Tactile Mahogany Folio Cards */}
      <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
        {MEMOIRS.map((memoir) => {
          const isExpanded = expandedId === memoir.id;

          return (
            <motion.div
              key={memoir.id}
              layout
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer touch-manipulation select-none active:scale-[0.99] ${
                isExpanded
                  ? 'card-memoir-active'
                  : 'card-memoir hover:border-copper-400/40'
              }`}
              onClick={(e) => toggleCard(memoir.id, e)}
            >
              {/* Header Bar with Min Touch Height 48px */}
              <div className="p-3.5 xs:p-4.5 sm:p-6 flex items-start justify-between gap-2.5 sm:gap-3 min-h-[52px]">
                <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3.5 min-w-0">
                  {/* Traditional bead / copper coin shaped index */}
                  <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center font-mono text-xs transition-colors shadow-inner shrink-0 ${
                    isExpanded
                      ? 'bg-crimson-600/30 text-copper-200 border border-crimson-500/60'
                      : 'bg-mahogany-800 text-copper-400 border border-copper-500/20'
                  }`}>
                    {memoir.number}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] xs:text-[9px] font-mono tracking-[0.2em] text-copper-400 uppercase block mb-0.5 font-medium">
                      {memoir.category}
                    </span>
                    <h3 className="font-serif text-sm xs:text-base sm:text-lg font-medium text-cream-100 leading-snug">
                      {memoir.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-[10px] xs:text-[11px] text-copper-200/70 font-sans mt-0.5 line-clamp-1 font-light">
                        {memoir.preview}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-mahogany-900/90 border border-copper-400/30 flex items-center justify-center text-copper-300 shrink-0 mt-0.5 shadow-sm"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </div>

              {/* Expandable Letter Body */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="px-3.5 xs:px-4.5 sm:px-6 pb-4.5 sm:pb-6 pt-1 border-t border-crimson-500/20"
                  >
                    {/* Lead Paragraph */}
                    <p className="font-garamond italic text-xs xs:text-sm sm:text-base text-copper-200/95 leading-relaxed mb-2.5 pt-1.5 sm:pt-3">
                      "{memoir.leadParagraph}"
                    </p>

                    {/* Body */}
                    <p className="font-sans text-xs sm:text-sm text-cream-200/90 leading-relaxed font-light mb-3.5">
                      {memoir.bodyParagraph}
                    </p>

                    {/* Closing Line & Timestamp */}
                    <div className="pt-2.5 border-t border-copper-500/15 flex items-center justify-between gap-2">
                      <p className="font-script text-lg xs:text-xl sm:text-2xl text-crimson-300 leading-none">
                        {memoir.closingLine}
                      </p>
                      <span className="text-[8px] xs:text-[9px] font-mono text-copper-400 tracking-widest uppercase shrink-0">
                        {memoir.sealDate}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
