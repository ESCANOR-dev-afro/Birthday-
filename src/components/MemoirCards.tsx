import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';
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
    title: 'To Semilore, On Your Special Day',
    preview: 'Semilore, I\'m really glad to celebrate another year of your life with you today...',
    leadParagraph: 'Happy Birthday to one of the most genuine and hardworking people I know.',
    bodyParagraph:
      'Semilore, I\'m really glad to celebrate another year of your life with you today. Having you as a close friend has been a blessing. You put your heart into everything you do, you stay true to yourself, and you bring positive energy wherever you go. I hope this new age brings you peace of mind, big wins, and all the happiness you truly deserve.',
    closingLine: 'Always rooting for you',
    sealDate: 'ALWAYS ROOTING FOR YOU',
  },
  {
    id: 'nursing-tribute',
    number: '02',
    category: 'BRIGHT FUTURE',
    title: 'A Bright Future Ahead',
    preview: 'You have such a kind heart and a calm way of handling challenges...',
    leadParagraph: 'Whatever you set your mind to do, you always give it your best.',
    bodyParagraph:
      'You have such a kind heart and a calm way of handling challenges. That’s why I have no doubt that you are going to make a truly great nurse and excel at everything you put your hands to. The journey takes hard work, but you\'ve shown time and time again that you have what it takes.',
    closingLine: 'Destined for great things',
    sealDate: 'DESTINED FOR GREAT THINGS',
  },
  {
    id: 'birthday-wish',
    number: '03',
    category: 'BIRTHDAY WISHES',
    title: 'My Wish For Your New Year',
    preview: 'I pray that this new age opens great doors for you...',
    leadParagraph: 'May this new chapter be your easiest, most peaceful, and happiest year yet.',
    bodyParagraph:
      'I pray that this new age opens great doors for you. May your hard work pay off, may stress be far from you, and may you always find reasons to smile and laugh. Enjoy your day to the fullest, eat good food, and celebrate yourself because you\'ve truly earned it.',
    closingLine: 'Happy Birthday, Semilore',
    sealDate: 'HAPPY BIRTHDAY, SEMILORE',
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
      triggerSparkleBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    }
  };

  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-7 space-y-1.5 xs:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-violet-500/30 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] xs:tracking-[0.25em] text-lavender-400 uppercase shadow-sm">
          <BookOpen className="w-3 h-3 text-violet-400" />
          <span>From My Heart</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-lavender-glow leading-tight">
          From My Heart
        </h2>
        <p className="text-xs text-lavender-300/80 font-sans max-w-xs mx-auto font-light leading-relaxed">
          Tap each card to read a personal birthday message written for you, Semilore.
        </p>
      </div>

      {/* Accordion Folio Cards */}
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
                  : 'card-memoir hover:border-violet-400/40'
              }`}
              onClick={(e) => toggleCard(memoir.id, e)}
            >
              {/* Header Bar */}
              <div className="p-3.5 xs:p-4.5 sm:p-6 flex items-start justify-between gap-2.5 sm:gap-3 min-h-[52px]">
                <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3.5 min-w-0">
                  {/* Number Badge */}
                  <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center font-mono text-xs transition-colors shadow-inner shrink-0 ${
                    isExpanded
                      ? 'bg-violet-600/30 text-lavender-200 border border-violet-500/60'
                      : 'bg-obsidian-800 text-lavender-400 border border-violet-500/20'
                  }`}>
                    {memoir.number}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] xs:text-[9px] font-mono tracking-[0.2em] text-gold-400 uppercase block mb-0.5 font-medium">
                      {memoir.category}
                    </span>
                    <h3 className="font-serif text-sm xs:text-base sm:text-lg font-medium text-pearl-100 leading-snug">
                      {memoir.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-[10px] xs:text-[11px] text-lavender-300/70 font-sans mt-0.5 line-clamp-1 font-light">
                        {memoir.preview}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-obsidian-900/90 border border-violet-400/30 flex items-center justify-center text-lavender-300 shrink-0 mt-0.5 shadow-sm"
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
                    className="px-3.5 xs:px-4.5 sm:px-6 pb-4.5 sm:pb-6 pt-1 border-t border-violet-500/20"
                  >
                    {/* Lead Paragraph */}
                    <p className="font-garamond italic text-xs xs:text-sm sm:text-base text-lavender-300/95 leading-relaxed mb-2.5 pt-1.5 sm:pt-3">
                      "{memoir.leadParagraph}"
                    </p>

                    {/* Body */}
                    <p className="font-sans text-xs sm:text-sm text-pearl-200/90 leading-relaxed font-light mb-3.5">
                      {memoir.bodyParagraph}
                    </p>

                    {/* Closing Line & Seal Date */}
                    <div className="pt-2.5 border-t border-violet-500/15 flex items-center justify-between gap-2">
                      <p className="font-script text-lg xs:text-xl sm:text-2xl text-violet-400 leading-none">
                        {memoir.closingLine}
                      </p>
                      <span className="text-[8px] xs:text-[9px] font-mono text-gold-400 tracking-widest uppercase shrink-0">
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
