import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Rocket size={14} className="text-white/70" />
            <span>Interactive Wheel Configurator</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">Select the perfect wheels for your ride</h1>
          <p className="mt-4 text-white/70 text-lg">Spin, swap, and size your wheels in real-time with smooth animations and a modern 3D hero.</p>
          <div className="mt-8 flex gap-3">
            <a href="#configurator" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-white/90 transition">Start Configuring</a>
            <a href="#preview" className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20 transition">Live Preview</a>
          </div>
        </div>
      </div>
    </header>
  );
}
