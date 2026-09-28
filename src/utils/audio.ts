// Web Audio API harmonic sound synthesizers for celebration, chimes, and ambient serenity

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMelodyPlaying: boolean = false;
  private melodyTimeout: ReturnType<typeof setTimeout> | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMelody();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public isPlayingMelody() {
    return this.isMelodyPlaying;
  }

  /**
   * Harmonious sparkle chime when tapping interactive elements
   */
  public playSparkleChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major triad sparkle)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.65);
    });
  }

  /**
   * Grand celebratory wish chime (rich harmonic bell)
   */
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chordNotes = [
      { freq: 440.0, delay: 0.0 },   // A4
      { freq: 554.37, delay: 0.1 },  // C#5
      { freq: 659.25, delay: 0.2 },  // E5
      { freq: 880.0, delay: 0.3 },   // A5
      { freq: 1108.73, delay: 0.45 }, // C#6
      { freq: 1318.51, delay: 0.6 }  // E6
    ];

    chordNotes.forEach(({ freq, delay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 1.9);
    });
  }

  /**
   * Soft pop for subtle button taps
   */
  public playSoftTap() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  }

  /**
   * Ambient Celesta / Music Box Birthday Melody
   */
  public playBirthdayMelody(onEnd?: () => void) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopMelody();
    this.isMelodyPlaying = true;

    // F4, F4, G4, F4, Bb4, A4 ... (Gentle lullaby arrangement)
    const notes: [number, number][] = [
      [349.23, 0.4], // F4
      [349.23, 0.4], // F4
      [392.00, 0.8], // G4
      [349.23, 0.8], // F4
      [466.16, 0.8], // Bb4
      [440.00, 1.4], // A4

      [349.23, 0.4], // F4
      [349.23, 0.4], // F4
      [392.00, 0.8], // G4
      [349.23, 0.8], // F4
      [523.25, 0.8], // C5
      [466.16, 1.4], // Bb4

      [349.23, 0.4], // F4
      [349.23, 0.4], // F4
      [698.46, 0.8], // F5
      [587.33, 0.8], // D5
      [466.16, 0.8], // Bb4
      [440.00, 0.8], // A4
      [392.00, 1.2], // G4

      [622.25, 0.4], // Eb5
      [622.25, 0.4], // Eb5
      [587.33, 0.8], // D5
      [466.16, 0.8], // Bb4
      [523.25, 0.8], // C5
      [466.16, 1.8], // Bb4
    ];

    let timeCursor = ctx.currentTime + 0.1;

    notes.forEach(([freq, dur]) => {
      // Bell/Celesta sound
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, timeCursor);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, timeCursor);

      gain.gain.setValueAtTime(0, timeCursor);
      gain.gain.linearRampToValueAtTime(0.09, timeCursor + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, timeCursor + dur * 1.5);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start(timeCursor);
      oscHarmonic.start(timeCursor);
      osc.stop(timeCursor + dur * 1.5);
      oscHarmonic.stop(timeCursor + dur * 1.5);

      timeCursor += dur * 0.85;
    });

    const totalDurationMs = (timeCursor - ctx.currentTime) * 1000;
    this.melodyTimeout = setTimeout(() => {
      this.isMelodyPlaying = false;
      if (onEnd) onEnd();
    }, totalDurationMs);
  }

  public stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }
}

export const soundFx = new SoundController();
