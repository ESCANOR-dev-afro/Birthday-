import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerGrandCelebration } from '../utils/confetti';
import { WishMessage } from './BirthdayWishesCard';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWish: (wish: WishMessage) => void;
}

const BADGES = ['✨', '💜', '👑', '🌸', '🎂', '🌟', '🕊️', '💐'];

export const WishModal: React.FC<WishModalProps> = ({ isOpen, onClose, onAddWish }) => {
  const [sender, setSender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('✨');

  // NOTE: All hooks MUST be declared before any early return (Rules of Hooks)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    soundFx.playCelebrationFanfare();
    triggerGrandCelebration();

    const newWish: WishMessage = {
      id: `wish-${Date.now()}`,
      sender: sender.trim(),
      relationship: relationship.trim() || 'Well-Wisher & Friend',
      message: message.trim(),
      badge: selectedBadge,
      date: 'Today',
      likes: 1,
    };

    onAddWish(newWish);
    onClose();

    // Reset form
    setSender('');
    setRelationship('');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/88 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md card-invitation rounded-3xl p-5 xs:p-6 shadow-card border border-violet-400/40 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-obsidian-900/90 hover:bg-violet-600/30 text-lavender-300 flex items-center justify-center border border-violet-400/20 transition-transform active:scale-90 touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="mb-5 space-y-1 text-center">
            <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-400/50 text-lavender-200 flex items-center justify-center mx-auto mb-2 shadow-inner">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <h3 className="font-editorial text-2xl font-normal text-lavender-glow leading-tight">
              Send Blessings to Semilore
            </h3>
            <p className="text-xs text-lavender-300/80 font-light">
              Share your warmest birthday words and wishes for Semilore.
            </p>
          </div>

          {/* Form — 16px inputs to prevent iOS auto-zoom */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] xs:text-[11px] font-mono uppercase tracking-wider text-lavender-400 mb-1 font-medium">
                Your Name
              </label>
              <input
                type="text"
                required
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/90 border border-violet-500/30 text-pearl-50 placeholder-lavender-400/40 text-base sm:text-sm focus:outline-none focus:border-violet-400/70 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] xs:text-[11px] font-mono uppercase tracking-wider text-lavender-400 mb-1 font-medium">
                Relationship / Title
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Best Friend, Good Friend, Well-Wisher"
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/90 border border-violet-500/30 text-pearl-50 placeholder-lavender-400/40 text-base sm:text-sm focus:outline-none focus:border-violet-400/70 transition-colors"
              />
            </div>

            {/* Badge picker */}
            <div>
              <label className="block text-[10px] xs:text-[11px] font-mono uppercase tracking-wider text-lavender-400 mb-1 font-medium">
                Choose an Emblem
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                {BADGES.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBadge(b)}
                    className={`min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-base border transition-all touch-manipulation ${
                      selectedBadge === b
                        ? 'bg-violet-600/40 border-violet-400 scale-105 shadow-sm'
                        : 'bg-obsidian-950/80 border-violet-500/20 opacity-70 hover:opacity-100 active:scale-95'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] xs:text-[11px] font-mono uppercase tracking-wider text-lavender-400 mb-1 font-medium">
                Your Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your warmest blessings for Semilore's special day..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/90 border border-violet-500/30 text-pearl-50 placeholder-lavender-400/40 text-base sm:text-sm focus:outline-none focus:border-violet-400/70 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-1.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-700 via-violet-600 to-gold-500 hover:from-violet-600 hover:to-gold-400 text-pearl-50 font-bold text-xs xs:text-sm tracking-wide shadow-card flex items-center justify-center gap-2 transition-all active:scale-98 border border-violet-400/40 min-h-[48px] touch-manipulation"
            >
              <Send className="w-4 h-4" />
              <span>Send Birthday Blessing 💜</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
