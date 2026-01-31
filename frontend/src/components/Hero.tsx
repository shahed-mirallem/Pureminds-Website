import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(maskRefs.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (maskRefs.current[i] = el)}
            className="flex-1 bg-gradient-to-b from-neutral-900 to-black"
            style={{ clipPath: 'inset(0)' }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-ultra-thin text-white mb-8 tracking-wider"
          style={{ fontWeight: 100 }}
        >
          PUREMINDS
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl font-ultra-thin text-neutral-400 tracking-widest"
          style={{ fontWeight: 100 }}
        >
          WHERE THOUGHT BECOMES FORM
        </p>
      </div>
    </section>
  );
};

export default Hero;
