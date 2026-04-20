// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { motion } from 'framer-motion';

// const AnimatedBackground = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;
    
//     // GSAP context for clean cleanup and scoping
//     const ctx = gsap.context(() => {
//       const streaks = gsap.utils.toArray('.gsap-streak');
      
//       streaks.forEach((streak) => {
//         const resetStreak = () => {
//           gsap.set(streak, {
//             y: gsap.utils.random(0, window.innerHeight),
//             x: '-30vw',
//             scaleX: gsap.utils.random(0.5, 2.5),
//             opacity: 0,
//           });
//         };

//         resetStreak();

//         // Animate the laser streak smoothly across the screen
//         gsap.to(streak, {
//           x: '120vw',
//           // Much more visible streaks
//           opacity: gsap.utils.random(0.4, 0.8),
//           duration: gsap.utils.random(5, 12),
//           delay: gsap.utils.random(0, 4),
//           ease: "none",
//           repeat: -1,
//           onRepeat: resetStreak
//         });
//       });
      
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      
//       {/* GSAP Light Streaks moving horizontally - Made thicker and brighter */}
//       {[...Array(15)].map((_, i) => (
//         <div 
//           key={`streak-${i}`} 
//           className={`gsap-streak absolute h-[2px] w-[30vw] bg-gradient-to-r from-transparent ${i % 2 === 0 ? 'via-pink-500' : 'via-blue-500'} to-transparent blur-[2px]`}
//         />
//       ))}

//       {/* Framer Motion Geometric Abstract Topology Grid - Drastically increased opacity */}
//       <motion.div 
//         animate={{ rotate: 360 }}
//         transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
//         className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30"
//       >
//         <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
//           {/* Concentric expanding rings */}
//           {[...Array(18)].map((_, i) => (
//             <motion.circle 
//               key={`circle-${i}`}
//               cx="50" cy="50" r={i * 3 + 6} 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="0.15"
//               animate={{ 
//                 r: [i * 3 + 6, i * 3 + 8, i * 3 + 6],
//                 opacity: [0.4, 1, 0.4]
//               }}
//               transition={{ duration: 6 + (i * 0.5), repeat: Infinity, ease: "easeInOut" }}
//             />
//           ))}
//           {/* Radar sweeping lines */}
//           {[...Array(16)].map((_, i) => (
//              <line 
//                key={`line-${i}`}
//                x1="50" y1="50" 
//                x2={50 + 60 * Math.cos((i * 22.5) * Math.PI / 180)} 
//                y2={50 + 60 * Math.sin((i * 22.5) * Math.PI / 180)} 
//                stroke="currentColor" 
//                strokeWidth="0.1"
//              />
//           ))}
//         </svg>
//       </motion.div>

//       {/* Softer vignette shadow overlay to let the background pop more */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.15)_150%)] mix-blend-overlay" />
//     </div>
//   );
// };

// export default AnimatedBackground;








import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animFrameId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Determine colors based on theme
    const getThemeColors = () => {
      if (isDark) {
        return {
          particleColors: ['#10b981', '#0d9488', '#34d399'],
          gridColor: 'rgba(16,185,129,0.08)',
          connectionColor: 'rgba(16,185,129,0.06)',
          lineColor1: '#10b981',
          lineColor2: '#0d9488',
          orbColor1: 'rgba(6,78,59,0.35)',
          orbColor2: 'rgba(13,148,136,0.25)',
          orbColor3: 'rgba(4,78,59,0.12)',
          scanlineColor: 'rgba(16,185,129,0.15)',
          scanlineHighlight: 'rgba(52,211,153,0.25)',
        };
      } else {
        return {
          particleColors: ['#059669', '#0891b2', '#06b6d4'],
          gridColor: 'rgba(5,150,105,0.12)',
          connectionColor: 'rgba(5,150,105,0.08)',
          lineColor1: '#059669',
          lineColor2: '#0891b2',
          orbColor1: 'rgba(5,150,105,0.15)',
          orbColor2: 'rgba(8,145,178,0.12)',
          orbColor3: 'rgba(5,150,105,0.08)',
          scanlineColor: 'rgba(5,150,105,0.12)',
          scanlineHighlight: 'rgba(8,145,178,0.15)',
        };
      }
    };

    const colors = getThemeColors();

    // Organic floating particles (leaf-like)
    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.5 + 0.1,
      color: colors.particleColors[i % colors.particleColors.length],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Energy flow lines
    const lines = Array.from({ length: 6 }, () => ({
      startX: Math.random() * w,
      startY: Math.random() * h,
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 200 + 100,
      opacity: 0,
      targetOpacity: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.003 + 0.001,
      progress: 0,
      color: Math.random() > 0.5 ? colors.lineColor1 : colors.lineColor2,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw grid dots (subtle topology)
      const gridSize = 60;
      for (let gx = 0; gx < w; gx += gridSize) {
        for (let gy = 0; gy < h; gy += gridSize) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = colors.gridColor;
          ctx.fill();
        }
      }

      // Draw flowing particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.7 + 0.3 * Math.sin(p.pulse);
        const currentOpacity = p.opacity * pulseFactor;

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        // Leaf-like shape
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
      });

      // Connect nearby particles with thin lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 4).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${colors.connectionColor.slice(0, -1)}, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Energy flow lines
      lines.forEach(line => {
        line.progress += line.speed;
        if (line.progress > 1) {
          line.progress = 0;
          line.startX = Math.random() * w;
          line.startY = Math.random() * h;
          line.angle = Math.random() * Math.PI * 2;
          line.length = Math.random() * 200 + 100;
        }

        const endX = line.startX + Math.cos(line.angle) * line.length * line.progress;
        const endY = line.startY + Math.sin(line.angle) * line.length * line.progress;

        const grad = ctx.createLinearGradient(line.startX, line.startY, endX, endY);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `${line.color}25`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Canvas for organic particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Large ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: isDark ? 'radial-gradient(circle, rgba(6,78,59,0.35) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full"
        style={{ background: isDark ? 'radial-gradient(circle, rgba(13,148,136,0.25) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{ background: isDark ? 'radial-gradient(circle, rgba(4,78,59,0.12) 0%, transparent 60%)' : 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 60%)' }}
      />

      {/* Subtle horizontal scan line */}
      <motion.div
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        className="absolute left-0 w-full h-px"
        style={{ background: isDark ? 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.15) 30%, rgba(52,211,153,0.25) 50%, rgba(16,185,129,0.15) 70%, transparent 100%)' : 'linear-gradient(90deg, transparent 0%, rgba(5,150,105,0.12) 30%, rgba(8,145,178,0.15) 50%, rgba(5,150,105,0.12) 70%, transparent 100%)' }}
      />

      {/* Corner accent glows */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-20"
        style={{ background: isDark ? 'radial-gradient(circle at top right, rgba(16,185,129,0.4) 0%, transparent 60%)' : 'radial-gradient(circle at top right, rgba(5,150,105,0.2) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-15"
        style={{ background: isDark ? 'radial-gradient(circle at bottom left, rgba(13,148,136,0.4) 0%, transparent 60%)' : 'radial-gradient(circle at bottom left, rgba(8,145,178,0.2) 0%, transparent 60%)' }}
      />
    </div>
  );
};

export default AnimatedBackground;