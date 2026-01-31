import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/demo_video.mp4";
import logo from "../assets/pureminds-logo.png";

gsap.registerPlugin(ScrollTrigger);

const HeroCinematic = () => {
  const mainContainer = useRef<HTMLDivElement | null>(null);
  const videoSection = useRef<HTMLDivElement | null>(null);
  const overlaySection = useRef<HTMLDivElement | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Load: Scale down video from 1.1 to 1.0
      gsap.fromTo(
        videoElement.current,
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: "power2.out" },
      );

      // 2. Master Timeline: Pinning and Transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainer.current,
          start: "top top",
          end: "+=150%", // Enough room for weighted scroll
          pin: true,
          scrub: 1.2, // Adds premium kinetic weight
        },
      });

      tl.to(overlaySection.current, {
        yPercent: -100, // Slides UP to cover the video
        ease: "none",
      }).to(
        ".reveal-line",
        {
          yPercent: -100, // Reveals masked text
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      ); // Starts while section is sliding
    }, mainContainer);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainContainer}
      className="relative w-full overflow-hidden bg-[#011936]"
    >
      {/* Dynamic Header: The Logo that flips color */}
      <header className="fixed top-0 left-0 w-full z-50 p-8 mix-blend-difference">
        <img
          src={logo}
          alt="Pureminds"
          className="h-8 md:h-10 object-contain invert"
        />
      </header>

      {/* Hero A: Fixed Video Section */}
      <div
        ref={videoSection}
        className="relative h-screen w-full overflow-hidden"
      >
        <video
          ref={videoElement}
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[#011936]/30 radial-gradient" />
      </div>

      {/* Hero B: Sliding Narrative Section */}
      <div
        ref={overlaySection}
        className="absolute top-full left-0 h-screen w-full bg-[#011936] flex flex-col items-center justify-center gap-4 z-20"
      >
        <div className="overflow-hidden h-fit">
          <p
            className="reveal-line translate-y-full text-4xl md:text-6xl text-white font-thin italic antialiased"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            it all starts
          </p>
        </div>
        <div className="overflow-hidden h-fit">
          <p
            className="reveal-line translate-y-full text-4xl md:text-6xl text-white font-thin italic antialiased"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            and ends with
          </p>
        </div>
        <div className="overflow-hidden h-fit mt-4">
          <img
            src={logo}
            alt="Pureminds"
            className="reveal-line translate-y-full h-20 md:h-32 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCinematic;
