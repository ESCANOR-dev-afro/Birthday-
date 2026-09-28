import { useState, useCallback, useEffect } from 'react';
import { soundFx } from '../utils/audio';

export function useSound() {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [isPlayingMusic, setIsPlayingMusic] = useState(soundFx.isPlayingMelody());

  const toggleSound = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playSparkleChime();
    } else {
      setIsPlayingMusic(false);
    }
  }, [isMuted]);

  const toggleMusic = useCallback(() => {
    if (isPlayingMusic) {
      soundFx.stopMelody();
      setIsPlayingMusic(false);
    } else {
      if (isMuted) {
        setIsMuted(false);
        soundFx.setMuted(false);
      }
      soundFx.playBirthdayMelody(() => {
        setIsPlayingMusic(false);
      });
      setIsPlayingMusic(true);
    }
  }, [isPlayingMusic, isMuted]);

  const playChime = useCallback(() => {
    soundFx.playSparkleChime();
  }, []);

  const playFanfare = useCallback(() => {
    soundFx.playCelebrationFanfare();
  }, []);

  const playTap = useCallback(() => {
    soundFx.playSoftTap();
  }, []);

  useEffect(() => {
    return () => {
      soundFx.stopMelody();
    };
  }, []);

  return {
    isMuted,
    isPlayingMusic,
    toggleSound,
    toggleMusic,
    playChime,
    playFanfare,
    playTap,
  };
}
