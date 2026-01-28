import Hero from './components/Hero';
import StickySection from './components/StickySection';
import MaskReveal from './components/MaskReveal';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black">
      <Hero />
      <StickySection />
      <MaskReveal />
      <Footer />
    </div>
  );
}

