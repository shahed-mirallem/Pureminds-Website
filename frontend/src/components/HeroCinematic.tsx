import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/demo_video.mp4";
import logo from "../assets/pureminds-logo.png";

gsap.registerPlugin(ScrollTrigger);

const HeroCinematic = () => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const phraseOneRef = useRef<HTMLParagraphElement | null>(null);
  const phraseTwoRef = useRef<HTMLParagraphElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero A: Scale video from 1.1 to 1.0 on mount
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
      );

      // Pin and transition timeline - UNPINS after transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Hero B slides up
      tl.fromTo(
        overlayRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "none" },
      )
        .fromTo(
          phraseOneRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.3 },
          0.3,
        )
        .fromTo(
          phraseTwoRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.3 },
          0.4,
        )
        .fromTo(
          logoRef.current,
          { yPercent: 100, opacity: 0, scale: 0.9 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 0.4 },
          0.5,
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full h-screen">
      {/* Video layer */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Hero B: Overlay that slides up */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#011936] flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="overflow-hidden">
          <p
            ref={phraseOneRef}
            className="text-3xl md:text-5xl text-white/80 italic font-thin"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            it all starts
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            ref={phraseTwoRef}
            className="text-3xl md:text-5xl text-white/80 italic font-thin"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            and ends with
          </p>
        </div>
        <div className="overflow-hidden">
          <img
            ref={logoRef}
            src={logo}
            alt="Pureminds"
            className="h-14 md:h-20"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroCinematic;
