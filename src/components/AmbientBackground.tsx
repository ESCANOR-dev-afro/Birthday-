import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      ctx = null;
    }

    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth || 360);
    let height = (canvas.height = window.innerHeight || 640);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 360;
      height = canvas.height = window.innerHeight || 640;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Warm, intimate particles: Brushed Copper, Deep Crimson Velvet, Warm Amber, Cream Ivory
    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      fadeSpeed: number;
      color: string;
      glowColor: string;
    }

    const particleTypes = [
      { color: 'rgba(224, 122, 95, ', glow: 'rgba(224, 122, 95, 0.4)' },   // Brushed Copper
      { color: 'rgba(225, 29, 72, ', glow: 'rgba(225, 29, 72, 0.5)' },    // Crimson Red
      { color: 'rgba(245, 158, 11, ', glow: 'rgba(245, 158, 11, 0.35)' },  // Warm Amber
      { color: 'rgba(250, 245, 239, ', glow: 'rgba(250, 245, 239, 0.25)' },// Warm Ivory
      { color: 'rgba(244, 194, 171, ', glow: 'rgba(244, 194, 171, 0.35)' },// Soft Terracotta
    ];

    // Reduced to 24 particles for silky 60fps on low-end mobile devices
    const particles: Particle[] = Array.from({ length: 24 }, () => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.08,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.006) + 0.002,
        color: type.color,
        glowColor: type.glow,
      };
    });

    const render = () => {
      try {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;
          p.alpha += p.fadeSpeed;

          if (p.alpha >= p.maxAlpha || p.alpha <= 0.05) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
          ctx.shadowBlur = p.radius * 5;
          ctx.shadowColor = p.glowColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        animationFrameId = requestAnimationFrame(render);
      } catch {
        // Stop animation if canvas rendering fails
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep atmospheric ambient velvet lights */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-crimson-600/18 blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute top-[30%] -right-[15%] w-[550px] h-[550px] rounded-full bg-copper-500/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] -left-[15%] w-[500px] h-[500px] rounded-full bg-crimson-800/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-1/4 w-[400px] h-[400px] rounded-full bg-copper-600/12 blur-[120px] pointer-events-none" />

      {/* Subtle traditional Ankara fold rhythmic geometric overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #e07a5f 2%, transparent 0%), radial-gradient(circle at 75px 75px, #be123c 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Floating Canvas Dust / Starlets */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-75 pointer-events-none" />

      {/* Subtle Warm Noise Texture */}
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
    </div>
  );
};
