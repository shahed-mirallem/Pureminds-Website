import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/demo_video.mp4';
import logoLight from '../assets/pureminds-logo.png';

gsap.registerPlugin(ScrollTrigger);

const HeroStack = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const blueRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1.2,
          pin: true,
        },
      });

      tl.fromTo(
        videoRef.current,
        { scale: 1.1, opacity: 1 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        0
      )
        .fromTo(
          blueRef.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 1 },
          0
        )
        .fromTo(
          linesRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
          0.2
        )
        .to(
          videoRef.current,
          { opacity: 0.5, duration: 1, ease: 'none' },
          0.4
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const playSafe = () => {
      vid.play().catch(() => {});
    };
    vid.addEventListener('loadedmetadata', playSafe, { once: true });
    return () => vid.removeEventListener('loadedmetadata', playSafe);
  }, []);

  return (
    <section ref={containerRef} className="relative isolate h-[200vh] w-full overflow-hidden">
      {/* Hero A: video */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-screen w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Radial gradient overlay for brand tone */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(1,25,54,0.4),transparent_70%)] pointer-events-none" />
        {/* Center logo with blend inversion */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logoLight}
            alt="Pureminds"
            className="h-16 md:h-24 mix-blend-difference"
          />
        </div>
      </div>

      {/* Hero B: sliding blue overlay */}
      <div
        ref={blueRef}
        className="absolute inset-0 bg-[#011936] flex flex-col items-center justify-center gap-6"
      >
        {['it all starts', 'and ends with', 'logo'].map((text, idx) => (
          <div key={text} className="overflow-hidden">
            {idx < 2 ? (
              <p
                ref={(el) => (linesRef.current[idx] = el)}
                className="text-3xl md:text-5xl text-white/85 italic"
                style={{ fontWeight: 100, fontFamily: "'Cormorant Garamond', serif" }}
              >
                {text}
              </p>
            ) : (
              <img
                ref={(el) => (linesRef.current[idx] = el as HTMLDivElement)}
                src={logoLight}
                alt="Pureminds"
                className="h-14 md:h-20"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroStack;
