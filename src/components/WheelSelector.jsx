import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const variants = [
  { id: 'sport', label: 'Sport' },
  { id: 'classic', label: 'Classic' },
  { id: 'mesh', label: 'Mesh' },
  { id: 'aero', label: 'Aero' },
];

const presetColors = ['#202124', '#d1d5db', '#9ca3af', '#eab308', '#22d3ee', '#ef4444'];

export default function WheelSelector({
  wheelVariant,
  setWheelVariant,
  wheelColor,
  setWheelColor,
  wheelSize,
  setWheelSize,
  isDriving,
  setIsDriving,
  speed,
  setSpeed,
}) {
  return (
    <div id="configurator" className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-white/10 backdrop-blur">
      <h2 className="text-lg font-medium">Customize Wheels</h2>
      <p className="mt-1 text-sm text-white/60">Choose a style, color and size. Then hit Drive to see it in motion.</p>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-white/80">Style</h3>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setWheelVariant(v.id)}
              className={`group relative overflow-hidden rounded-lg border px-4 py-3 text-left transition ${
                wheelVariant === v.id ? 'border-white/40 bg-white/10' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{v.label}</span>
                <span className="text-[10px] text-white/50">{v.id}</span>
              </div>
              <motion.div
                layoutId={`underline-${v.id}`}
                className={`${wheelVariant === v.id ? 'mt-2 h-0.5 w-full bg-white' : 'h-0 w-0'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-white/80">Color</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => setWheelColor(c)}
              aria-label={`wheel color ${c}`}
              className={`h-9 w-9 rounded-full ring-2 transition ${wheelColor === c ? 'ring-white' : 'ring-white/10 hover:ring-white/40'}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="relative ml-2 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">
            <span className="text-white/70">Custom</span>
            <input
              type="color"
              value={wheelColor}
              onChange={(e) => setWheelColor(e.target.value)}
              className="h-6 w-10 cursor-pointer rounded border-0 bg-transparent p-0 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="flex items-center justify-between text-sm text-white/80">
            Wheel Size
            <span className="text-white/60">{(wheelSize * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.01"
            value={wheelSize}
            onChange={(e) => setWheelSize(parseFloat(e.target.value))}
            className="mt-2 w-full accent-white"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm text-white/80">
            Speed
            <span className="text-white/60">{speed}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="mt-2 w-full accent-white"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => setIsDriving((d) => !d)}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
            isDriving ? 'bg-white text-neutral-900 hover:bg-white/90' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isDriving ? <Pause size={16} /> : <Play size={16} />}
          {isDriving ? 'Pause Drive' : 'Drive'}
        </button>
        <span className="text-xs text-white/60">Real-time wheel rotation with smooth transitions</span>
      </div>
    </div>
  );
}
