import { useState } from 'react';
import Hero from './components/Hero';
import CarPreview from './components/CarPreview';
import WheelSelector from './components/WheelSelector';
import Footer from './components/Footer';

export default function App() {
  const [wheelVariant, setWheelVariant] = useState('sport');
  const [wheelColor, setWheelColor] = useState('#202124');
  const [wheelSize, setWheelSize] = useState(1); // multiplier 0.8 - 1.3
  const [isDriving, setIsDriving] = useState(false);
  const [speed, setSpeed] = useState(40); // 0 - 100

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />

      <main className="relative mx-auto max-w-7xl px-6 pb-24">
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 -mt-12">
          <div className="order-2 lg:order-1">
            <WheelSelector
              wheelVariant={wheelVariant}
              setWheelVariant={setWheelVariant}
              wheelColor={wheelColor}
              setWheelColor={setWheelColor}
              wheelSize={wheelSize}
              setWheelSize={setWheelSize}
              isDriving={isDriving}
              setIsDriving={setIsDriving}
              speed={speed}
              setSpeed={setSpeed}
            />
          </div>

          <div className="order-1 lg:order-2">
            <CarPreview
              wheelVariant={wheelVariant}
              wheelColor={wheelColor}
              wheelSize={wheelSize}
              isDriving={isDriving}
              speed={speed}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
