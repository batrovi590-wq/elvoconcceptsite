import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { PhilosophySection } from './components/PhilosophySection';
import { AestheticsSection } from './components/AestheticsSection';
import { InteriorCarousel } from './components/InteriorCarousel';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Header onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero />
        <FeaturesSection />
        <PhilosophySection />
        <AestheticsSection />
        <InteriorCarousel />
      </main>
      <Footer />
      <ContactModal open={isContactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}