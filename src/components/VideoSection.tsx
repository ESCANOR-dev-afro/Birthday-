import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Video } from 'lucide-react';
import { triggerSparkleBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface VideoItem {
  src: string;
  poster: string;
  title: string;
  subtitle: string;
}

const VIDEOS: VideoItem[] = [
  {
    src: '/videos/VID-20261028-WA0020.mp4',
    poster: '/images/IMG-20261028-WA0023.jpg',
    title: 'Semilore in Her Element 🌟',
    subtitle: 'Pure joy, good energy, and bright smiles',
  },
  {
    src: '/videos/VID-20261028-WA0021.mp4',
    poster: '/images/IMG-20261028-WA0023.jpg',
    title: 'Laughter & Memories 💜',
    subtitle: 'Moments that make every day brighter',
  },
  {
    src: '/videos/VID-20261028-WA0022.mp4',
    poster: '/images/IMG-20261028-WA0023.jpg',
    title: 'Celebrating Semilore ✨',
    subtitle: 'Here is to a bright, peaceful, and happy year ahead',
  },
];

const VideoCard: React.FC<{ video: VideoItem; index: number }> = ({ video, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for viewport-bound playback & zero-lag preload control
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            // Immediately pause playback when scrolled out of view to save battery and GPU memory
            const videoEl = videoRef.current;
            if (videoEl && !videoEl.paused) {
              videoEl.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePlayToggle = () => {
    const el = videoRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // Autoplay fallback with mute
          el.muted = true;
          setIsMuted(true);
          el.play()
            .then(() => {
              setIsPlaying(true);
              setHasStarted(true);
            })
            .catch(() => {});
        });
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    soundFx.playSparkleChime();
    triggerSparkleBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    handlePlayToggle();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="card-memoir rounded-2xl overflow-hidden border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group will-change-transform transform-gpu [backface-visibility:hidden]"
    >
      {/* Video Container */}
      <div
        className="relative aspect-[9/16] sm:aspect-video cursor-pointer touch-manipulation bg-obsidian-900 overflow-hidden rounded-t-2xl"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePlayToggle();
          }
        }}
        aria-label={`Play video: ${video.title}`}
      >
        <video
          ref={videoRef}
          playsInline
          muted={isMuted}
          loop
          preload={isInView ? 'metadata' : 'none'}
          poster={video.poster}
          className="w-full h-full object-cover will-change-transform transform-gpu [backface-visibility:hidden] rounded-t-2xl"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-obsidian-950/20 pointer-events-none" />

        {/* Play / Pause button (centered, shown when paused or not started) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-violet-600/70 backdrop-blur-md border border-violet-400/60 flex items-center justify-center shadow-violet-glow transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 text-pearl-50 fill-pearl-50 ml-0.5" />
            </div>
          </div>
        )}

        {/* Mute/Unmute — shown when playing */}
        {hasStarted && (
          <button
            onClick={handleMuteToggle}
            className="absolute top-2.5 right-2.5 z-20 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-obsidian-950/85 backdrop-blur-md border border-violet-400/40 flex items-center justify-center transition-all active:scale-90 touch-manipulation hover:bg-violet-600/50"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-lavender-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-gold-400" />
            )}
          </button>
        )}

        {/* Live badge */}
        {isPlaying && (
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm border border-violet-400/40 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[9px] font-mono text-pearl-50 tracking-wider uppercase font-medium">Playing</span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-3.5 xs:p-4 sm:p-4.5 bg-obsidian-900/60">
        <h3 className="font-serif text-sm xs:text-base font-semibold text-pearl-100 leading-snug mb-0.5">
          {video.title}
        </h3>
        <p className="text-[11px] xs:text-xs text-lavender-300/80 font-light leading-relaxed">
          {video.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export const VideoSection: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 px-2 xs:px-3 sm:px-4 max-w-md mx-auto">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-7 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/90 border border-violet-500/30 text-[9px] xs:text-[10px] font-mono tracking-[0.2em] text-lavender-400 uppercase shadow-sm">
          <Video className="w-3 h-3 text-violet-400" />
          <span>Moments & Vibes</span>
        </div>
        <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-normal text-lavender-glow leading-tight">
          Her Story in Motion
        </h2>
        <p className="text-xs text-lavender-300/80 font-sans max-w-xs mx-auto font-light leading-relaxed">
          Tap any clip to play. Tap the 🔈 icon to unmute. Made for mobile, instant and seamless.
        </p>
      </div>

      {/* Vertical Video Card Reel */}
      <div className="space-y-4 xs:space-y-5">
        {VIDEOS.map((video, index) => (
          <VideoCard key={video.src} video={video} index={index} />
        ))}
      </div>
    </section>
  );
};
