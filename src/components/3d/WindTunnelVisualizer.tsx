import React, { useEffect, useRef } from 'react';
import { AeroMode, AeroTelemetry } from '../../types/automotive';

interface WindTunnelVisualizerProps {
  mode: AeroMode;
  telemetry: AeroTelemetry;
  className?: string;
}

export const WindTunnelVisualizer: React.FC<WindTunnelVisualizerProps> = ({
  mode,
  telemetry,
  className = 'w-full h-80 sm:h-96',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    // Particle streamlines
    const streamCount = mode === 'CORSA' ? 140 : mode === 'SPORT' ? 95 : 65;
    const speedMultiplier = mode === 'CORSA' ? 2.4 : mode === 'SPORT' ? 1.7 : 1.1;

    interface Particle {
      x: number;
      y: number;
      initialY: number;
      speed: number;
      length: number;
      alpha: number;
      thickness: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < streamCount; i++) {
      const startY = Math.random() * (height * 0.7) + height * 0.15;
      particles.push({
        x: Math.random() * width,
        y: startY,
        initialY: startY,
        speed: (Math.random() * 4 + 6) * speedMultiplier,
        length: Math.random() * 60 + 40,
        alpha: Math.random() * 0.6 + 0.3,
        thickness: Math.random() * 1.5 + 1.0,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Car silhouette profile geometry coordinates normalized
    const renderCarProfile = (cx: number, cy: number, scale: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Chassis outline (Lamborghini profile)
      ctx.beginPath();
      // Start at front splitter
      ctx.moveTo(-220, 45);
      // Low wedge hood
      ctx.lineTo(-170, 40);
      ctx.lineTo(-110, 10);
      // Raked windshield
      ctx.lineTo(-30, -35);
      // Flat stealth roof
      ctx.lineTo(40, -38);
      // Sloped rear deck
      ctx.lineTo(130, -5);
      // Active wing based on mode
      const wingHeight = mode === 'CORSA' ? -55 : mode === 'SPORT' ? -38 : -22;
      const wingAngle = (telemetry.wingAngleDeg * Math.PI) / 180;
      
      // Rear wing
      ctx.lineTo(165, wingHeight);
      ctx.lineTo(195, wingHeight + 5);
      // Rear diffuser
      ctx.lineTo(190, 45);
      // Underbody floor
      ctx.lineTo(-220, 45);
      ctx.closePath();

      // Carbon matte fill
      const grad = ctx.createLinearGradient(-200, 0, 200, 0);
      grad.addColorStop(0, '#1c1c22');
      grad.addColorStop(0.5, '#2a2a32');
      grad.addColorStop(1, '#18181e');
      ctx.fillStyle = grad;
      ctx.fill();

      // Hairline metallic border
      ctx.strokeStyle = mode === 'CORSA' ? 'rgba(239, 68, 68, 0.7)' : mode === 'SPORT' ? 'rgba(229, 168, 35, 0.7)' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Wheels
      const drawWheel = (wx: number) => {
        ctx.beginPath();
        ctx.arc(wx, 45, 34, 0, Math.PI * 2);
        ctx.fillStyle = '#09090b';
        ctx.fill();
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Rim spokes
        ctx.beginPath();
        ctx.arc(wx, 45, 20, 0, Math.PI * 2);
        ctx.strokeStyle = mode === 'CORSA' ? '#ef4444' : '#e5a823';
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawWheel(-130);
      drawWheel(130);

      // Cabin Glass
      ctx.beginPath();
      ctx.moveTo(-100, 10);
      ctx.lineTo(-25, -30);
      ctx.lineTo(35, -32);
      ctx.lineTo(95, -5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    let t = 0;
    const render = () => {
      animFrameId.current = requestAnimationFrame(render);
      t += 0.02;

      // Dark background
      ctx.fillStyle = '#060609';
      ctx.fillRect(0, 0, width, height);

      // Technical Wind Tunnel Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center car profile
      const carCenterX = width * 0.48;
      const carCenterY = height * 0.56;
      const carScale = Math.min(width / 600, 1.15);

      // Streamlines simulation with deflection over vehicle body
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width + 50) {
          p.x = -50;
          p.y = p.initialY;
        }

        // Deflection math: when particle approaches car, bend upward over the hood/roof
        const relX = (p.x - carCenterX) / carScale;
        const distToCenter = Math.abs(relX);

        let targetY = p.initialY;
        if (distToCenter < 240) {
          // Over hood/roof contour
          if (relX < -80 && relX > -220) {
            targetY = p.initialY - 35 * Math.sin(((relX + 220) / 140) * (Math.PI / 2));
          } else if (relX >= -80 && relX < 40) {
            targetY = p.initialY - 65;
          } else if (relX >= 40 && relX < 190) {
            // Down the rear deck and into wing wake
            targetY = p.initialY - (mode === 'CORSA' ? 50 : 25) * Math.cos(((relX - 40) / 150) * (Math.PI / 2));
          }
        }

        p.y += (targetY - p.y) * 0.18;

        // Draw particle streak
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y);

        // Streamline color grading based on velocity & aerodynamic mode
        const streamGrad = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
        if (mode === 'CORSA') {
          streamGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
          streamGrad.addColorStop(0.6, 'rgba(239, 68, 68, ' + p.alpha + ')');
          streamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
        } else if (mode === 'SPORT') {
          streamGrad.addColorStop(0, 'rgba(229, 168, 35, 0)');
          streamGrad.addColorStop(0.6, 'rgba(229, 168, 35, ' + p.alpha + ')');
          streamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.85)');
        } else {
          streamGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
          streamGrad.addColorStop(0.6, 'rgba(6, 182, 212, ' + p.alpha + ')');
          streamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
        }

        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = p.thickness;
        ctx.stroke();
      });

      // Render car silhouette
      renderCarProfile(carCenterX, carCenterY, carScale);

      // Low-pressure vortex curl behind wing
      if (mode === 'CORSA') {
        ctx.save();
        ctx.translate(carCenterX + 180 * carScale, carCenterY - 45 * carScale);
        ctx.beginPath();
        const vortexRadius = 25 * carScale;
        ctx.arc(0, 0, vortexRadius, t * 5, t * 5 + Math.PI * 1.5);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [mode, telemetry]);

  return (
    <div className={`relative overflow-hidden border border-white/10 bg-[#060609] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating HUD Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-4 text-xs font-mono">
        <div className="bg-black/80 backdrop-blur-md px-3 py-2 border border-white/10">
          <span className="text-[10px] text-zinc-500 uppercase block">Active Aero Mode</span>
          <span
            className={`text-sm font-bold tracking-wider ${
              mode === 'CORSA' ? 'text-red-500' : mode === 'SPORT' ? 'text-[#E5A823]' : 'text-cyan-400'
            }`}
          >
            {mode}
          </span>
        </div>

        <div className="bg-black/80 backdrop-blur-md px-3 py-2 border border-white/10">
          <span className="text-[10px] text-zinc-500 uppercase block">Total Downforce</span>
          <span className="text-sm font-mono-num font-bold text-white">{telemetry.downforceKg} kg</span>
        </div>

        <div className="bg-black/80 backdrop-blur-md px-3 py-2 border border-white/10">
          <span className="text-[10px] text-zinc-500 uppercase block">Drag Coeff (Cd)</span>
          <span className="text-sm font-mono-num font-bold text-white">{telemetry.dragCoefficient.toFixed(2)}</span>
        </div>

        <div className="bg-black/80 backdrop-blur-md px-3 py-2 border border-white/10">
          <span className="text-[10px] text-zinc-500 uppercase block">Wing Angle</span>
          <span className="text-sm font-mono-num font-bold text-white">{telemetry.wingAngleDeg}°</span>
        </div>
      </div>

      {/* Mode Status Pill */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:block bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs text-zinc-400">
        <span className="text-[#E5A823] font-bold">ALA 2.0 STATUS: </span>
        <span className="text-white">{telemetry.activeStatus}</span>
      </div>
    </div>
  );
};
