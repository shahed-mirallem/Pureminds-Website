import { useEffect, useRef } from "react";
import gsap from "gsap";
import award1 from "../assets/awards/award1.png";
import award2 from "../assets/awards/award2.png";
import award3 from "../assets/awards/award3.png";
import award4 from "../assets/awards/award4.png";
import award5 from "../assets/awards/award5.png";
import award6 from "../assets/awards/award6.png";
import award7 from "../assets/awards/award7.png";
import award8 from "../assets/awards/award8.png";

const awards = [award1, award2, award3, award4, award5, award6, award7, award8];

const CertificateCarousel = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Infinite auto-scrolling loop
    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      repeat: -1,
      duration: 30,
    });

    // 1.1x hover zoom
    const cards = track.querySelectorAll(".certificate-card");

    const handleMouseEnter = (card: Element) => {
      tweenRef.current?.pause();
      gsap.to(card, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (card: Element) => {
      tweenRef.current?.resume();
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });

    return () => {
      tweenRef.current?.kill();
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => handleMouseEnter(card));
        card.removeEventListener("mouseleave", () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <section className="relative py-24 bg-[#011936] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h3 className="text-4xl md:text-5xl font-black text-white">
          Our Certifications
        </h3>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 w-[200%]"
          style={{ willChange: "transform" }}
        >
          {[...awards, ...awards].map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="certificate-card shrink-0 bg-white rounded-lg p-6 shadow-lg"
              style={{ width: "200px", height: "260px" }}
            >
              <img
                src={src}
                alt={`Certificate ${idx + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateCarousel;
