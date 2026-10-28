import React from 'react';
import { Sparkles, Star, MessageCircle, Globe, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export const EditorialClosing: React.FC = () => {
  const handleBlessingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playSparkleChime();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
  };

  return (
    <footer className="py-10 sm:py-14 px-3 xs:px-4 pb-[max(3rem,calc(env(safe-area-inset-bottom)+2rem))] max-w-md mx-auto text-center relative z-10 border-t border-violet-500/20">

      {/* Decorative Monogram Seal */}
      <div className="w-12 h-12 rounded-full bg-violet-800/60 border border-gold-400/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
        <span className="font-serif font-semibold text-gold-100 text-base">S</span>
      </div>

      {/* Ambient glow ring behind seal */}
      <div className="w-24 h-24 rounded-full bg-violet-600/15 blur-2xl absolute left-1/2 -translate-x-1/2 -translate-y-16 pointer-events-none" />

      {/* Main Closing Letter Block */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <span className="text-[9px] xs:text-[10px] font-mono tracking-[0.25em] xs:tracking-[0.3em] text-gold-400 uppercase block font-medium">
          SENT WITH GOOD VIBES
        </span>

        <h3 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-lavender-glow leading-tight">
          Always Cheering For You
        </h3>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent mx-auto my-2.5" />

        <p className="font-garamond italic text-sm xs:text-base sm:text-lg text-pearl-100/95 leading-relaxed max-w-sm mx-auto">
          "Semilore, thank you for being such a wonderful friend. Keep taking bold steps, keep laughing hard, and never doubt how capable you are. Happy Birthday once again!"
        </p>

        {/* Sign-off */}
        <div className="pt-2">
          <p className="font-script text-xl xs:text-2xl sm:text-3xl text-violet-400 leading-tight">
            From your close friend, always.
          </p>
          <p className="text-[10px] xs:text-[11px] font-mono text-gold-400/80 tracking-[0.15em] uppercase mt-1">
            Always in your corner 💜
          </p>
        </div>
      </div>

      {/* Blessing Action */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <button
          onClick={handleBlessingClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-700 to-gold-500 hover:from-violet-600 hover:to-gold-400 border border-violet-400/40 text-xs text-pearl-50 font-medium transition-all active:scale-95 shadow-md min-h-[44px] touch-manipulation"
        >
          <Star className="w-3.5 h-3.5 text-gold-200 fill-gold-200" />
          <span className="font-sans font-normal tracking-wider">Drop Big Birthday Blessings 🌸</span>
          <Sparkles className="w-3.5 h-3.5 text-lavender-200" />
        </button>
      </div>

      {/* Footer Impressum */}
      <div className="space-y-1 text-[9px] xs:text-[10px] font-mono tracking-[0.18em] text-lavender-400/50 uppercase">
        <p>Created with good vibes for Semilore's Birthday</p>
      </div>

      {/* Creator Acknowledgement & High-Converting CTA Card */}
      <div className="mt-8 pt-1">
        <div className="backdrop-blur-md bg-[#121524]/92 border border-violet-400/25 rounded-2xl p-3.5 xs:p-4.5 sm:p-5 mx-auto text-center max-w-md shadow-xl relative overflow-hidden group">
          {/* Subtle Ambient Backlight */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Tagline */}
          <div className="relative z-10 mb-2 px-1">
            <span className="block font-mono text-[10px] xs:text-[11px] sm:text-xs tracking-normal xs:tracking-wider font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lavender-300 via-gold-300 to-lavender-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)] select-none break-words max-w-full text-center leading-snug">
              ⚡ Brought to you with love by 亗『ESCANOR 』亗 ⚡
            </span>
          </div>

          {/* Hook / Pitch */}
          <p className="relative z-10 text-xs xs:text-[13px] text-pearl-100/90 font-sans leading-relaxed mb-4 font-light max-w-sm mx-auto px-1">
            Need a bespoke celebration website, a high-converting web platform for your brand, or a custom cross-platform mobile app? Let's bring your vision to life.
          </p>

          {/* Direct Call to Action Links */}
          <div className="relative z-10 space-y-2.5">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2348149224954?text=Hi%20Escanor,%20I%20saw%20your%20work%20and%20I'd%20like%20to%20discuss%20a%20website%20/%20mobile%20app%20project!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSoftTap()}
              className="flex items-center justify-center gap-2 w-full py-3 px-3 xs:px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-medium text-xs xs:text-sm shadow-md active:scale-95 transition-all min-h-[48px] touch-manipulation border border-emerald-400/30 text-center leading-snug"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
              <span className="tracking-wide">💬 Send a DM on WhatsApp (+234 814 922 4954)</span>
            </a>

            {/* Portfolio Link */}
            <a
              href="https://about-sammy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playSoftTap()}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 xs:px-4 rounded-xl bg-obsidian-900/90 hover:bg-violet-950/60 border border-violet-400/30 hover:border-violet-400/60 text-lavender-300 hover:text-white font-medium text-xs xs:text-sm active:scale-95 transition-all min-h-[44px] touch-manipulation shadow-sm text-center leading-snug"
            >
              <Globe className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="tracking-wide">🌐 View Developer Portfolio</span>
              <ExternalLink className="w-3 h-3 text-lavender-400/70 ml-0.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};
