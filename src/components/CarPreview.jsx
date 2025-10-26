import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function WheelFace({ variant = 'sport', color = '#202124' }) {
  // Returns an SVG group for the wheel face/spokes
  // Variants: sport, classic, mesh, aero
  switch (variant) {
    case 'classic':
      return (
        <g>
          <circle cx="0" cy="0" r="44" fill="#111" stroke={color} strokeWidth="6" />
          <circle cx="0" cy="0" r="14" fill={color} />
          {[...Array(6)].map((_, i) => (
            <rect key={i} x="-4" y="16" width="8" height="26" rx="3" fill={color} transform={`rotate(${i * 60})`} />
          ))}
        </g>
      );
    case 'mesh':
      return (
        <g>
          <circle cx="0" cy="0" r="44" fill="#0d0d0d" stroke={color} strokeWidth="4" />
          <circle cx="0" cy="0" r="12" fill={color} />
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="-2.5" y="14" width="5" height="28" rx="2.5" fill={color} opacity="0.9" transform={`rotate(${i * 30})`} />
          ))}
          {[...Array(12)].map((_, i) => (
            <rect key={`b-${i}`} x="-2.5" y="-42" width="5" height="14" rx="2.5" fill={color} opacity="0.5" transform={`rotate(${i * 30})`} />
          ))}
        </g>
      );
    case 'aero':
      return (
        <g>
          <circle cx="0" cy="0" r="46" fill={color} />
          <circle cx="0" cy="0" r="18" fill="#0b0b0b" />
          <circle cx="0" cy="0" r="6" fill="#222" />
          {[...Array(5)].map((_, i) => (
            <path key={i} d="M0,20 C10,24 18,14 22,4 C10,8 -2,2 -12,-4 Z" fill="#000" opacity="0.25" transform={`rotate(${i * 72})`} />
          ))}
        </g>
      );
    default:
      return (
        <g>
          <circle cx="0" cy="0" r="44" fill="#0e0e0e" stroke={color} strokeWidth="5" />
          <circle cx="0" cy="0" r="10" fill={color} />
          {[...Array(5)].map((_, i) => (
            <path key={i} d="M-4,16 L4,16 L8,36 L-8,36 Z" fill={color} transform={`rotate(${i * 72})`} />
          ))}
        </g>
      );
  }
}

export default function CarPreview({ wheelVariant, wheelColor, wheelSize, isDriving, speed }) {
  const leftWheelControls = useAnimation();
  const rightWheelControls = useAnimation();
  const carControls = useAnimation();

  useEffect(() => {
    const duration = Math.max(0.2, 2 - (speed / 100) * 1.8); // faster speed => shorter duration per rotation
    if (isDriving) {
      leftWheelControls.start({ rotate: 360 }, { repeat: Infinity, ease: 'linear', duration });
      rightWheelControls.start({ rotate: 360 }, { repeat: Infinity, ease: 'linear', duration });
      carControls.start({ x: [0, 6, 0], transition: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } });
    } else {
      leftWheelControls.stop();
      rightWheelControls.stop();
      carControls.stop();
      leftWheelControls.set({ rotate: 0 });
      rightWheelControls.set({ rotate: 0 });
      carControls.set({ x: 0 });
    }
  }, [isDriving, speed, leftWheelControls, rightWheelControls, carControls]);

  const wheelScale = 0.8 + (wheelSize - 1) * 0.5 + 0.2; // normalize size range visually

  return (
    <div id="preview" className="relative rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 ring-1 ring-white/10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Live Preview</h2>
        <span className="text-xs text-white/60">Variant: {wheelVariant}</span>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent">
        <div className="absolute inset-0">{/* road */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/40" />
          <div className="absolute bottom-6 left-0 right-0 h-2 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
        </div>

        <motion.div animate={carControls} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Car body */}
          <svg width="720" height="280" viewBox="0 0 720 280" className="drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="carPaint" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <path d="M80 200 C120 130 190 90 300 86 L470 80 C520 78 590 98 640 130 L680 170 C692 182 695 190 695 200 L695 210 C695 220 688 228 678 228 L620 228 C604 228 600 220 598 212 C592 184 540 170 500 170 L240 170 C180 170 148 184 130 206 C124 214 118 228 104 228 L72 228 C62 228 55 220 55 210 L55 206 C55 200 66 196 80 200 Z" fill="url(#carPaint)" stroke="#ffffff10" />
            {/* Windows */}
            <path d="M300 110 L450 104 C492 102 540 120 572 144 L420 144 L276 144 C274 128 286 114 300 110 Z" fill="#b9e6ff10" />
            {/* Lights */}
            <circle cx="650" cy="190" r="6" fill="#ffd1a3" opacity="0.7" />
            <circle cx="100" cy="190" r="6" fill="#9cd67a" opacity="0.6" />
          </svg>

          {/* Wheels */}
          <div className="relative">
            <motion.div
              animate={leftWheelControls}
              transition={{ type: 'tween' }}
              className="absolute"
              style={{ left: 160, top: 164, width: 120, height: 120, transformOrigin: '50% 50%' }}
            >
              <WheelSVG scale={wheelScale} variant={wheelVariant} color={wheelColor} />
            </motion.div>

            <motion.div
              animate={rightWheelControls}
              transition={{ type: 'tween' }}
              className="absolute"
              style={{ left: 520, top: 164, width: 120, height: 120, transformOrigin: '50% 50%' }}
            >
              <WheelSVG scale={wheelScale} variant={wheelVariant} color={wheelColor} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <p className="mt-4 text-sm text-white/60">Tip: Toggle Drive to see the wheels spin. Adjust speed for faster rotation.</p>
    </div>
  );

  function WheelSVG({ scale, variant, color }) {
    const s = scale; // base 1 around 120x120 canvas
    return (
      <svg viewBox="-60 -60 120 120" width={120 * s} height={120 * s} style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.45))' }}>
        <defs>
          <radialGradient id="tire" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#222" />
            <stop offset="70%" stopColor="#0d0d0d" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="56" fill="url(#tire)" />
        <circle cx="0" cy="0" r="50" fill="#0a0a0a" stroke="#2b2b2b" strokeWidth="2" />
        <WheelFace variant={variant} color={color} />
        <circle cx="0" cy="0" r="4" fill="#999" />
      </svg>
    );
  }
}
