import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickySection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky pinning effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
      });

      // Content fade in
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      // Image scale effect
      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-between px-12 bg-neutral-950"
    >
      <div ref={contentRef} className="max-w-xl z-10">
        <h2
          className="text-6xl md:text-8xl mb-6 text-white"
          style={{ fontWeight: 100 }}
        >
          Elevate Your Vision
        </h2>
        <p
          className="text-xl md:text-2xl text-neutral-400 leading-relaxed"
          style={{ fontWeight: 100 }}
        >
          We craft digital experiences that transcend ordinary boundaries,
          merging artistry with technology to create unforgettable moments.
        </p>
      </div>

      <div
        ref={imageRef}
        className="w-1/2 h-2/3 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg"
      />
    </section>
  );
}
