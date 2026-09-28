import confetti from 'canvas-confetti';

// Rich, warm celebratory palette (Deep Velvet Crimson, Brushed Copper, Amber Gold, Warm Cream Ivory, Terracotta)
const LUXURY_PALETTE = ['#be123c', '#e11d48', '#e07a5f', '#f0a282', '#f59e0b', '#faf5ef', '#881337', '#c85a38'];

/**
 * Fires a gentle ambient gold sparkle burst
 */
export const triggerSparkleBurst = (x = 0.5, y = 0.6) => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x, y },
    colors: LUXURY_PALETTE,
    ticks: 200,
    gravity: 0.8,
    decay: 0.94,
    scalar: 0.9,
    shapes: ['circle', 'square'],
    disableForReducedMotion: true,
  });
};

/**
 * Fires a grand celebratory multi-stage firework/cannon burst
 */
export const triggerGrandCelebration = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Initial center pop
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6, x: 0.5 },
    colors: LUXURY_PALETTE,
    scalar: 1.1,
  });

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

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
  }, 250);
};

/**
 * Tap burst at specific click coordinate
 */
export const triggerTapBurst = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
  let clientX = 0;
  let clientY = 0;

  if ('touches' in event && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else if ('clientX' in event) {
    clientX = (event as React.MouseEvent).clientX;
    clientY = (event as React.MouseEvent).clientY;
  }

  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 30,
    angle: 90,
    spread: 45,
    origin: { x: Math.max(0.1, Math.min(0.9, x)), y: Math.max(0.1, Math.min(0.9, y)) },
    colors: LUXURY_PALETTE,
    ticks: 150,
    gravity: 1,
    decay: 0.92,
    scalar: 0.85,
  });
};
