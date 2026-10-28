import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export interface WishMessage {
  id: string;
  sender: string;
  relationship: string;
  message: string;
  badge: string;
  date: string;
  likes: number;
}

interface BirthdayWishesCardProps {
  wishes: WishMessage[];
  onOpenWishModal: () => void;
  onLikeWish: (id: string) => void;
}

export const BirthdayWishesCard: React.FC<BirthdayWishesCardProps> = ({
  wishes,
  onOpenWishModal,
  onLikeWish,
}) => {
  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md sm:max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-5 sm:mb-7 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-violet-500/30 text-lavender-400 text-[9px] xs:text-[10px] font-mono tracking-widest uppercase mb-1.5 shadow-sm">
            <Heart className="w-3 h-3 text-violet-400 fill-violet-400" />
            <span>Love & Birthday Blessings</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-lavender-glow leading-tight">
            Tributes to Semilore
          </h2>
        </div>

        <button
          onClick={() => {
            soundFx.playSoftTap();
            onOpenWishModal();
          }}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-gold-500 hover:from-violet-500 hover:to-gold-400 text-pearl-50 border border-violet-400/40 text-xs font-semibold transition-all active:scale-95 shadow-md shrink-0 touch-manipulation min-h-[44px]"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="text-[11px] sm:text-xs">Write Note</span>
        </button>
      </div>

      {/* Wish Cards */}
      <div className="space-y-3 sm:space-y-4">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card-memoir rounded-2xl p-4 xs:p-4.5 sm:p-5 border border-violet-500/20 hover:border-violet-400/40 transition-all group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5 xs:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-obsidian-950 to-obsidian-800 border border-violet-400/40 flex items-center justify-center text-sm shadow-inner shrink-0">
                  {wish.badge}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-pearl-50 group-hover:text-lavender-200 transition-colors truncate">
                    {wish.sender}
                  </h4>
                  <span className="text-[9px] xs:text-[10px] text-lavender-400/80 uppercase tracking-wider block font-medium truncate">
                    {wish.relationship}
                  </span>
                </div>
              </div>

              <span className="text-[9px] xs:text-[10px] text-lavender-300/60 font-mono shrink-0">
                {wish.date}
              </span>
            </div>

            {/* Message Body */}
            <div className="relative pl-3 border-l-2 border-violet-500/40 my-2.5">
              <p className="font-serif italic text-xs sm:text-sm text-pearl-100/90 leading-relaxed font-light">
                "{wish.message}"
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-violet-500/10 text-[11px]">
              <span className="text-lavender-300/80 font-mono flex items-center gap-1 text-[10px] xs:text-[11px]">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>Cherished Tribute</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playSparkleChime();
                  triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
                  onLikeWish(wish.id);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-obsidian-950/90 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 transition-all active:scale-90 shadow-sm min-h-[44px] min-w-[44px] touch-manipulation"
                aria-label={`Like tribute from ${wish.sender}`}
              >
                <Heart className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
                <span className="font-mono text-[10px] text-gold-300">{wish.likes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
