import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import advertisingImg from "../assets/categories/advertising.jpg";
import eventsImg from "../assets/categories/events.jpg";
import registrationImg from "../assets/categories/registration_systems.jpg";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "advertising",
    title: "Advertising",
    imgSrc: advertisingImg,
  },
  {
    id: "events",
    title: "Events",
    imgSrc: eventsImg,
  },
  {
    id: "registration",
    title: "Registration Systems",
    imgSrc: registrationImg,
  },
];

const CategoryReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = categoriesRef.current.filter(
        (panel): panel is HTMLDivElement => panel !== null,
      );
      if (sections.length === 0) return;

      // Initial setup: all sections stacked with clip-path
      sections.forEach((section, index) => {
        const title = section.querySelector(
          ".category-title",
        ) as HTMLElement | null;

        gsap.set(section, {
          clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          zIndex: index + 1,
        });

        if (title) {
          gsap.set(title, { yPercent: 100 });
        }
      });

      // Master timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (categories.length + 0.5)}`,
          pin: true,
          scrub: 1.5,
        },
      });

      // First section: reveal title
      const firstTitle = sections[0]?.querySelector(
        ".category-title",
      ) as HTMLElement | null;
      if (firstTitle) {
        tl.to(
          firstTitle,
          { yPercent: 0, duration: 0.8, ease: "power2.out" },
          0,
        );
      }

      // Subsequent sections: curtain reveal with staggered title masks
      categories.forEach((_, index) => {
        if (index === 0) return;
        const section = sections[index];
        if (!section) return;

        const title = section.querySelector(
          ".category-title",
        ) as HTMLElement | null;
        const label = `section-${index}`;

        // Curtain reveal (clip-path from bottom to top)
        tl.to(
          section,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power2.inOut",
          },
          label,
        );

        // Staggered title mask reveal
        if (title) {
          tl.to(
            title,
            {
              yPercent: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            `${label}+=0.3`,
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {categories.map((category, index) => (
        <div
          key={category.id}
          ref={(el) => {
            categoriesRef.current[index] = el;
          }}
          className="absolute inset-0 h-screen w-full flex items-center justify-center"
          style={{
            backgroundImage: `url(${category.imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-[#011936]/40" />

          {/* Title and Learn More Button */}
          <div className="absolute inset-0 flex flex-col items-start justify-between p-12 z-10">
            {/* Title centered */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <h2
                className="category-title text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                style={{
                  fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {category.title}
              </h2>
            </div>

            {/* Learn More Button - Bottom Right */}
            <div className="absolute bottom-12 right-12">
              <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/95 text-[#011936] font-semibold uppercase text-sm tracking-wider hover:bg-white transition-all duration-300 shadow-2xl">
                Learn more
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-3 h-3 text-[#011936]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryReveal;
