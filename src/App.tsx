import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MemoirCards } from './components/MemoirCards';
import { InteractiveCandles } from './components/InteractiveCandles';
import { WaxSealCelebration } from './components/WaxSealCelebration';
import { SemiloreHighlights } from './components/SemiloreHighlights';
import { BirthdayWishesCard, WishMessage } from './components/BirthdayWishesCard';
import { WishModal } from './components/WishModal';
import { EditorialClosing } from './components/EditorialClosing';
import { VideoSection } from './components/VideoSection';
import { PhotoGallery } from './components/PhotoGallery';

const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'wish-1',
    sender: 'Your Best Buddy',
    relationship: 'Day-One Friend',
    message:
      'Happy Birthday, Semilore! So proud of the person you are and how hard you work. Keep glowing, enjoy your special day, and know I am always in your corner!',
    badge: 'Best Friend',
    date: 'Oct 28, 2026',
    likes: 65,
  },
  {
    id: 'wish-2',
    sender: 'The Circle',
    relationship: 'Good Friends',
    message:
      'To one of the sweetest and most dependable people around. Wishing you massive joy, good health, and zero stress this year!',
    badge: 'Inner Circle',
    date: 'Oct 28, 2026',
    likes: 47,
  },
  {
    id: 'wish-3',
    sender: 'Friends & Family',
    relationship: 'Well Wishers',
    message:
      'Happy Birthday Semilore! May your day be filled with laughter, love, and plenty of celebration. You deserve all the good things coming your way.',
    badge: 'Celebration',
    date: 'Oct 28, 2026',
    likes: 78,
  },
];

export const App: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [celebrationCount, setCelebrationCount] = useState(203);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  const handleCelebrate = () => {
    setCelebrationCount((prev) => prev + 1);
  };

  const handleAddWish = (newWish: WishMessage) => {
    setWishes((prev) => [newWish, ...prev]);
    setCelebrationCount((prev) => prev + 1);
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-full bg-[#0B0D13] text-[#f8f8fc] selection:bg-[#a855f7]/30 selection:text-[#e9d5ff] overflow-x-hidden">
      {/* Dynamic Ambient Background Canvas & Glows */}
      <AmbientBackground />

      {/* Floating Navigation */}
      <Navigation
        onOpenWishModal={() => setIsWishModalOpen(true)}
        celebrationCount={celebrationCount}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-2 xs:px-3 sm:px-4 pb-[max(2rem,env(safe-area-inset-bottom))]">

        {/* Hero Card — Semilore Portrait Spotlight */}
        <HeroSection
          onCelebrate={handleCelebrate}
          celebrationCount={celebrationCount}
        />

        {/* Personal Memoir / Letter Folios */}
        <MemoirCards />

        {/* Celebration Wax Seal */}
        <WaxSealCelebration
          onCelebrate={handleCelebrate}
          celebrationCount={celebrationCount}
        />

        {/* Photo Gallery Grid */}
        <PhotoGallery />

        {/* Moments & Vibes — Video Reel */}
        <VideoSection />

        {/* Interactive Birthday Candles */}
        <InteractiveCandles />

        {/* Why We Celebrate Semilore */}
        <SemiloreHighlights />

        {/* Guestbook & Wishes Board */}
        <BirthdayWishesCard
          wishes={wishes}
          onOpenWishModal={() => setIsWishModalOpen(true)}
          onLikeWish={handleLikeWish}
        />

        {/* Sent with Love Closing Section */}
        <EditorialClosing />
      </main>

      {/* Add Custom Birthday Wish Modal */}
      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onAddWish={handleAddWish}
      />
    </div>
  );
};

export default App;
