import { useState, useCallback } from 'react';
import { triggerGrandCelebration, triggerSparkleBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

export function useCelebration(initialCount = 148) {
  const [celebrationCount, setCelebrationCount] = useState(initialCount);

  const celebrate = useCallback((originX?: number, originY?: number) => {
    setCelebrationCount((prev) => prev + 1);
    soundFx.playCelebrationFanfare();
    triggerGrandCelebration();

    if (originX !== undefined && originY !== undefined) {
      triggerSparkleBurst(originX, originY);
    }
  }, []);

  const sendSparkle = useCallback((clientX: number, clientY: number) => {
    soundFx.playSparkleChime();
    setCelebrationCount((prev) => prev + 1);
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    triggerSparkleBurst(x, y);
  }, []);

  return {
    celebrationCount,
    celebrate,
    sendSparkle,
  };
}
