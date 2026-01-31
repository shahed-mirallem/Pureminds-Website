import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Header from "./components/Header";
import HeroCinematic from "./components/HeroCinematic";
import CategoryReveal from "./components/CategoryReveal";
import CertificateCarousel from "./components/CertificateCarousel";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // 1. Initialize Lenis with 'People & Co' style smoothing
    const lenis = new Lenis({
      duration: 1.5, // High duration for that 'heavy' luxury feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential easing
      smoothWheel: true,
      syncTouch: true, // Crucial for smooth mobile performance
    });

    // 2. Optimized RAF Loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Simple GSAP Integration (Avoids Proxy Lag)
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when everything is loaded
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    // 'antialiased' ensures your thin serif fonts look premium
    <div className="bg-[#011936] text-white antialiased selection:bg-[#0055FF]">
      <Header />
      <main>
        <HeroCinematic />
        <CategoryReveal />
        <CertificateCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default App;
