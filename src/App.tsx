import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MemoirCards } from './components/MemoirCards';
import { InteractiveCandles } from './components/InteractiveCandles';
import { WaxSealCelebration } from './components/WaxSealCelebration';
import { DeborahHighlights } from './components/DeborahHighlights';
import { BirthdayWishesCard, WishMessage } from './components/BirthdayWishesCard';
import { WishModal } from './components/WishModal';
import { EditorialClosing } from './components/EditorialClosing';

const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'wish-1',
    sender: 'Your Number One Fan ❤️',
    relationship: 'Forever Friends',
    message:
      'To my darling Deborah, nwunye \'m—wishing you long life, vibrant health, peace of mind, and unstoppable elevation! You are truly one of one. Happy Birthday, fine girl!',
    badge: '👑',
    date: 'Sep 28, 2026',
    likes: 48,
  },
  {
    id: 'wish-2',
    sender: 'Your Special Circle',
    relationship: 'Inner Circle',
    message:
      'To the most stylish, intelligent, and genuinely sweet soul—may your new age overflow with immense joy, laughter, and divine open doors! Keep shining, Queen.',
    badge: '🥂',
    date: 'Sep 28, 2026',
    likes: 39,
  },
  {
    id: 'wish-3',
    sender: 'Loved Ones & Family',
    relationship: 'Home & Heart',
    message:
      'Happy Birthday Deborah! Watching your grace, quiet strength, and pure heart is an absolute joy. May God bless and protect you abundantly this year and always.',
    badge: '✨',
    date: 'Sep 28, 2026',
    likes: 62,
  },
];

export const App: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [celebrationCount, setCelebrationCount] = useState(156);
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
    <div className="relative min-h-screen bg-[#140a08] text-[#faf5ef] selection:bg-[#be123c]/30 selection:text-[#f4c2ab] overflow-x-hidden">
      {/* Dynamic Ambient Background Canvas & Glows */}
      <AmbientBackground />

      {/* Floating Haute Couture Navigation */}
      <Navigation
        onOpenWishModal={() => setIsWishModalOpen(true)}
        celebrationCount={celebrationCount}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 max-w-xl mx-auto px-2 xs:px-3 sm:px-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {/* Phase 2: The Digital Tribute Hero Card with image1.png */}
        <HeroSection
          onCelebrate={handleCelebrate}
          celebrationCount={celebrationCount}
        />

        {/* Phase 3: Interactive Memoir Folios ("Open When" Cards) */}
        <MemoirCards />

        {/* Phase 3: Artisan Digital Wax Seal Grand Celebration */}
        <WaxSealCelebration
          onCelebrate={handleCelebrate}
          celebrationCount={celebrationCount}
        />

        {/* Interactive Candle Blowing Ritual */}
        <InteractiveCandles />

        {/* Personal Tribute Cards */}
        <DeborahHighlights />

        {/* Guestbook & Wishes Board */}
        <BirthdayWishesCard
          wishes={wishes}
          onOpenWishModal={() => setIsWishModalOpen(true)}
          onLikeWish={handleLikeWish}
        />

        {/* Phase 4: Sent with Love Closing Section */}
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
