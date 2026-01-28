import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MaskReveal() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of items with mask effect
      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        });

        // Text animation
        const text = item.querySelector('.mask-text');
        if (text) {
          gsap.from(text, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: 'Creative Strategy',
      description: 'Purposeful design that resonates with your audience',
    },
    {
      title: 'Digital Innovation',
      description: 'Cutting-edge technology meets artistic expression',
    },
    {
      title: 'Brand Evolution',
      description: 'Transformative experiences that define legacies',
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-6xl md:text-8xl mb-20 text-white text-center"
          style={{ fontWeight: 100 }}
        >
          Our Expertise
        </h2>

        <div className="space-y-32">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative overflow-hidden"
            >
              <div className="h-96 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-lg flex items-center justify-center px-12">
                <div className="mask-text text-center">
                  <h3
                    className="text-5xl md:text-7xl mb-6 text-white"
                    style={{ fontWeight: 100 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-2xl md:text-3xl text-neutral-400"
                    style={{ fontWeight: 100 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
