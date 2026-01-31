import { FC, ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MotionFrameProps {
  children: ReactNode;
  direction?: 'left' | 'right';
}

const MotionFrame: FC<MotionFrameProps> = ({ children, direction = 'left' }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xStart = direction === 'left' ? -100 : 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, x: xStart },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [direction]);

  return <div ref={ref}>{children}</div>;
};

export default MotionFrame;
