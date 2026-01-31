import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type FC, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────── Types ────────────────────────────── */

export interface PrimaryService {
  /** Big line on the left‐hand side */
  title: string;
  /** Tailwind colour utility – e.g. `bg-[#0598DC]` */
  color: string;
}

export interface SecondaryService {
  /** Small bullet list item */
  text: string;
  /** Tailwind colour utility */
  color: string;
}

interface ServicesSectionProps {
  /** Paragraph above the grid */
  intro: string;
  /** Section heading (upper‑left) */
  heading: string;
  /** Bold rows */
  primary: PrimaryService[];
  /** Bullet rows */
  secondary: SecondaryService[];
}

/* ─────────────────────────── Component ──────────────────────────── */

const ServicesSection: FC<ServicesSectionProps> = ({
  intro,
  heading,
  primary,
  secondary,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const serviceRef = useRef<HTMLHeadingElement>(null);
  const mainRefs = useRef<Array<HTMLDivElement | null>>([]);
  const secondaryRefs = useRef<Array<HTMLLIElement | null>>([]);

  /* —–– GSAP animations –––—————————— */
  useLayoutEffect(() => {
    if (!introTextRef.current || !serviceRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(introTextRef.current, {
        opacity: 0,
        y: 80,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          serviceRef.current,
          {
            x: -80,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          mainRefs.current.filter(Boolean),
          {
            opacity: 0,
            y: 50,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.45",
        )
        .from(
          secondaryRefs.current.filter(Boolean),
          {
            opacity: 0,
            y: 35,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.35",
        );

      /* individual scroll‑scrub effects */
      mainRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      });

      secondaryRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [primary, secondary]);

  /* —–– Mark‑up –––—————————— */
  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="pointer-events-auto min-h-screen w-full bg-white flex items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* intro */}
        <p ref={introTextRef} className="max-w-2xl text-lg text-[#1F2A48]">
          {intro}
        </p>

        {/* grid: heading + lists */}
        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[auto_1fr]">
          <h3
            ref={serviceRef}
            className="text-2xl font-bold tracking-wide text-[#0598DC] uppercase md:text-4xl"
          >
            {heading}
          </h3>

          <div>
            {/* primary */}
            <div className="space-y-6">
              {primary.map(({ title, color }, i) => (
                <div
                  key={title}
                  ref={(el) => {
                    mainRefs.current[i] = el;
                  }}
                  className="flex items-center gap-x-4"
                >
                  <span className={`block h-10 w-1 rounded-sm ${color}`} />
                  <span className="text-3xl font-semibold text-[#0C1E3E] md:text-4xl lg:text-5xl">
                    {title}
                  </span>
                </div>
              ))}
            </div>

            {/* secondary */}
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 text-xl text-[#0C1E3E] sm:grid-cols-2">
              {secondary.map(({ text, color }, i) => (
                <li
                  key={text}
                  ref={(el) => {
                    secondaryRefs.current[i] = el;
                  }}
                  className="flex items-center gap-x-4"
                >
                  <span className={`block h-4 w-1 rounded-sm ${color}`} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
