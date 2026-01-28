import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MotionFrame({ children, direction = 'left' }) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xStart = direction === 'left' ? -100 : 100;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                x: xStart,
            },
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
    }, [direction]);

    return <div ref={ref}>{children}</div>;
}

export default MotionFrame;
