import { useEffect, useRef } from "react";
import gsap from "gsap";
import cert1 from "../assets/certifications/1.jpeg";
import cert2 from "../assets/certifications/2.jpeg";
import cert3 from "../assets/certifications/3.jpeg";
import cert4 from "../assets/certifications/4.jpeg";
import cert5 from "../assets/certifications/5.jpeg";
import cert6 from "../assets/certifications/6.jpeg";
import cert7 from "../assets/certifications/7.jpeg";
import cert8 from "../assets/certifications/8.jpeg";
import cert9 from "../assets/certifications/9.jpeg";
import cert10 from "../assets/certifications/10.jpeg";
import cert11 from "../assets/certifications/11.jpeg";
import cert12 from "../assets/certifications/12.jpeg";
import cert13 from "../assets/certifications/13.jpeg";
import cert14 from "../assets/certifications/14.jpeg";

const certifications = [
  cert1,
  cert2,
  cert3,
  cert4,
  cert5,
  cert6,
  cert7,
  cert8,
  cert9,
  cert10,
  cert11,
  cert12,
  cert13,
  cert14,
];

const CertificateCarousel = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Set initial position
    gsap.set(track, { xPercent: 0 });

    // Seamless circular infinite loop
    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      ease: "linear",
      repeat: -1,
      duration: 20,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0),
      },
    });

    // Hover effects with scale
    const cards = track.querySelectorAll(".certificate-card");

    const handleMouseEnter = (card: Element) => {
      if (tweenRef.current) {
        tweenRef.current.pause();
      }
    };

    const handleMouseLeave = (card: Element) => {
      if (tweenRef.current) {
        tweenRef.current.resume();
      }
    };

    cards.forEach((card) => {
      const enterHandler = () => handleMouseEnter(card);
      const leaveHandler = () => handleMouseLeave(card);
      card.addEventListener("mouseenter", enterHandler);
      card.addEventListener("mouseleave", leaveHandler);

      // Store handlers for cleanup
      (card as any)._enterHandler = enterHandler;
      (card as any)._leaveHandler = leaveHandler;
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      cards.forEach((card) => {
        const enterHandler = (card as any)._enterHandler;
        const leaveHandler = (card as any)._leaveHandler;
        if (enterHandler) card.removeEventListener("mouseenter", enterHandler);
        if (leaveHandler) card.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#011936] to-[#012a52] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Our Certifications
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Trusted expertise backed by industry-leading certifications
          </p>
        </div>
      </div>

      {/* Carousel wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#012a52] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#012a52] to-transparent z-10 pointer-events-none"></div>

        <div
          ref={trackRef}
          className="flex gap-8 w-[200%] px-8"
          style={{ willChange: "transform" }}
        >
          {[...certifications, ...certifications].map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="certificate-card shrink-0 group relative cursor-pointer"
              style={{ width: "340px", height: "440px" }}
            >
              {/* Card with transparent background */}
              <div className="relative h-full bg-transparent rounded-2xl overflow-hidden transition-all duration-400 group-hover:scale-105">
                {/* Certificate image */}
                <div className="relative h-full p-4 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Professional Certificate ${(idx % certifications.length) + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateCarousel;
