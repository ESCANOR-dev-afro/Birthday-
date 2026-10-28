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

    // Lavender · Violet · Gold · Pearl particle palette
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
      { color: 'rgba(192, 132, 252, ', glow: 'rgba(192, 132, 252, 0.45)' }, // Soft Lavender
      { color: 'rgba(168, 85, 247, ',  glow: 'rgba(168, 85, 247, 0.5)'  }, // Electric Violet
      { color: 'rgba(245, 158, 11, ',  glow: 'rgba(245, 158, 11, 0.4)'  }, // Candlelight Gold
      { color: 'rgba(253, 224, 71, ',  glow: 'rgba(253, 224, 71, 0.3)'  }, // Champagne Yellow
      { color: 'rgba(248, 248, 252, ', glow: 'rgba(248, 248, 252, 0.2)' }, // Pearl White
      { color: 'rgba(124, 58, 237, ',  glow: 'rgba(124, 58, 237, 0.35)' }, // Deep Violet
    ];

    // 28 particles — silky 60fps on low-end mobile
    const particles: Particle[] = Array.from({ length: 28 }, () => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.9 + 0.7,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.28 - 0.07,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.75 + 0.2,
        fadeSpeed: Math.random() * 0.006 + 0.002,
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
      {/* Deep atmospheric violet top bloom */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[580px] rounded-full bg-violet-700/20 blur-[150px] animate-pulse pointer-events-none" />
      {/* Gold right accent orb */}
      <div className="absolute top-[28%] -right-[12%] w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
      {/* Deep violet left bloom */}
      <div className="absolute top-[58%] -left-[12%] w-[480px] h-[480px] rounded-full bg-violet-800/18 blur-[130px] pointer-events-none" />
      {/* Champagne bottom center shimmer */}
      <div className="absolute bottom-[8%] right-1/4 w-[380px] h-[380px] rounded-full bg-gold-400/8 blur-[110px] pointer-events-none" />

      {/* Subtle dot-grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #c084fc 1.5%, transparent 0%), radial-gradient(circle at 70px 70px, #f59e0b 1.5%, transparent 0%)`,
          backgroundSize: '90px 90px',
        }}
      />

      {/* Floating canvas starlets */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 pointer-events-none" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg opacity-25 pointer-events-none" />
    </div>
  );
};
