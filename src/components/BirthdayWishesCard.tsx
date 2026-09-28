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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mahogany-900/90 border border-crimson-500/30 text-crimson-300 text-[9px] xs:text-[10px] font-mono tracking-widest uppercase mb-1.5 shadow-sm">
            <Heart className="w-3 h-3 text-crimson-400 fill-crimson-400" />
            <span>Love & Heartfelt Blessings</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-copper-glow leading-tight">
            Tributes to Deborah
          </h2>
        </div>

        <button
          onClick={() => {
            soundFx.playSoftTap();
            onOpenWishModal();
          }}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-crimson-600 to-copper-600 hover:from-crimson-500 hover:to-copper-500 text-cream-50 border border-copper-400/40 text-xs font-semibold transition-all active:scale-95 shadow-md shrink-0 touch-manipulation min-h-[44px]"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="text-[11px] sm:text-xs">Write Note</span>
        </button>
      </div>

      {/* Grid of Wish Cards */}
      <div className="space-y-3 sm:space-y-4">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card-memoir rounded-2xl p-4 xs:p-4.5 sm:p-5 border border-copper-500/25 hover:border-crimson-500/40 transition-all group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5 xs:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-espresso-950 to-mahogany-900 border border-copper-400/40 flex items-center justify-center text-sm shadow-inner shrink-0">
                  {wish.badge}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-cream-50 group-hover:text-copper-200 transition-colors truncate">
                    {wish.sender}
                  </h4>
                  <span className="text-[9px] xs:text-[10px] text-copper-300/80 uppercase tracking-wider block font-medium truncate">
                    {wish.relationship}
                  </span>
                </div>
              </div>

              <span className="text-[9px] xs:text-[10px] text-copper-300/60 font-mono shrink-0">
                {wish.date}
              </span>
            </div>

            {/* Message Body */}
            <div className="relative pl-3 border-l-2 border-crimson-500/40 my-2.5">
              <p className="font-serif italic text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light">
                "{wish.message}"
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-copper-500/10 text-[11px]">
              <span className="text-copper-300/80 font-mono flex items-center gap-1 text-[10px] xs:text-[11px]">
                <Sparkles className="w-3 h-3 text-copper-400" />
                <span>Cherished Tribute</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playSparkleChime();
                  triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
                  onLikeWish(wish.id);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso-950/90 hover:bg-crimson-600/30 text-crimson-300 border border-crimson-500/30 transition-all active:scale-90 shadow-sm min-h-[38px] touch-manipulation"
                aria-label={`Like tribute from ${wish.sender}`}
              >
                <Heart className="w-3.5 h-3.5 fill-crimson-400 text-crimson-400" />
                <span className="font-mono text-[10px] text-copper-200">{wish.likes}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
