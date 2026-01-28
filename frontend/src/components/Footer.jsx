import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen flex items-center justify-center bg-neutral-950"
    >
      <div ref={contentRef} className="text-center px-6">
        <h2
          className="text-6xl md:text-9xl mb-8 text-white"
          style={{ fontWeight: 100 }}
        >
          Let's Create Together
        </h2>
        <p
          className="text-2xl md:text-3xl text-neutral-400 mb-12"
          style={{ fontWeight: 100 }}
        >
          Transform your vision into reality
        </p>
        <button
          className="px-12 py-4 text-xl border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
          style={{ fontWeight: 100 }}
        >
          Get in Touch
        </button>
        <div className="mt-20 text-neutral-600 text-sm">
          <p style={{ fontWeight: 100 }}>© 2026 Pureminds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
