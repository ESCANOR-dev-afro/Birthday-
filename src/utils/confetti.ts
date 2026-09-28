import confetti from 'canvas-confetti';

// Rich, warm celebratory palette (Deep Velvet Crimson, Brushed Copper, Amber Gold, Warm Cream Ivory, Terracotta)
const LUXURY_PALETTE = ['#be123c', '#e11d48', '#e07a5f', '#f0a282', '#f59e0b', '#faf5ef', '#881337', '#c85a38'];

/**
 * Fires a gentle ambient gold sparkle burst
 */
export const triggerSparkleBurst = (x = 0.5, y = 0.6) => {
  try {
    if (typeof window === 'undefined') return;
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x: Math.max(0.05, Math.min(0.95, x)), y: Math.max(0.05, Math.min(0.95, y)) },
      colors: LUXURY_PALETTE,
      ticks: 180,
      gravity: 0.8,
      decay: 0.94,
      scalar: 0.9,
      shapes: ['circle', 'square'],
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback if canvas is disabled or unsupported
  }
};

/**
 * Fires a grand celebratory multi-stage firework/cannon burst
 */
export const triggerGrandCelebration = () => {
  try {
    if (typeof window === 'undefined') return;
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 100, zIndex: 9999, disableForReducedMotion: true };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Initial center pop
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.6, x: 0.5 },
      colors: LUXURY_PALETTE,
      scalar: 1.05,
      disableForReducedMotion: true,
    });

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      try {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = Math.max(15, Math.floor(35 * (timeLeft / duration)));

        // Left cannon
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: LUXURY_PALETTE,
        });

        // Right cannon
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: LUXURY_PALETTE,
        });
      } catch {
        clearInterval(interval);
      }
    }, 280);
  } catch {
    // Graceful fallback
  }
};

/**
 * Tap burst at specific click coordinate
 */
export const triggerTapBurst = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
  try {
    if (typeof window === 'undefined') return;
    let clientX = 0;
    let clientY = 0;

    if ('touches' in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if ('clientX' in event) {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }

    const x = clientX / (window.innerWidth || 360);
    const y = clientY / (window.innerHeight || 640);

    confetti({
      particleCount: 25,
      angle: 90,
      spread: 45,
      origin: { x: Math.max(0.1, Math.min(0.9, x)), y: Math.max(0.1, Math.min(0.9, y)) },
      colors: LUXURY_PALETTE,
      ticks: 140,
      gravity: 1,
      decay: 0.92,
      scalar: 0.85,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
};
