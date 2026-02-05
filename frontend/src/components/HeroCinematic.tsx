import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/demo_video.mp4";
import logoWhite from "../assets/pureminds-logo.png";

gsap.registerPlugin(ScrollTrigger);

const HeroCinematic = () => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroBRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. حركة دخول الفيديو الأولية
      gsap.fromTo(
        videoRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
      );

      // 2. التايم لاين الرئيسي - قصرنا المسافة لـ 250% لسرعة الاستجابة
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=250%", // مسافة موزونة: مو طويلة كتير ولا قصيرة بتخطف الحركة
          scrub: 0.8, // تقليل الرقم لزيادة سرعة استجابة الكلام للماوس
          pin: true,
        },
      });

      // الخطوة 1: الخلفية الزرقاء تغطي الشاشة
      tl.to(heroBRef.current, { yPercent: -100, ease: "none" })

        // الخطوة 2: وقفة قصيرة جداً (ثبات) بعد ما تظهر الخلفية
        .to({}, { duration: 0.2 })

        // الخطوة 3: الجملة الأولى تظهر (بمجرد أول حركة ماوس بعد الثبات)
        .fromTo(
          ".phrase-1",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        )

        // الخطوة 4: الجملة الثانية تظهر مباشرة بعد الأولى مع السكرول المستمر
        .fromTo(
          ".phrase-2",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "+=0.2", // تأخير بسيط جداً لتبين إنها حركة منفصلة
        );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden bg-[#011936]"
    >
      {/* Hero A: الفيديو */}
      <div className="absolute inset-0 w-full h-screen">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo in center of video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logoWhite}
            alt="Pureminds"
            className="h-24 md:h-32 lg:h-40 object-contain"
          />
        </div>
      </div>

      {/* Hero B: القسم الأزرق */}
      <div
        ref={heroBRef}
        className="absolute top-full left-0 w-full h-screen bg-[#011936] px-12 md:px-24 z-20"
      >
        <div className="relative z-30 flex flex-col justify-center h-full max-w-5xl">
          <div className="space-y-6">
            {/* الجملة الأولى */}
            <div className="overflow-hidden">
              <h2
                className="phrase-1 text-5xl md:text-8xl text-white font-thin italic antialiased leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                it all starts
              </h2>
            </div>

            {/* الجملة الثانية */}
            <div className="overflow-hidden">
              <h2
                className="phrase-2 text-5xl md:text-8xl text-white font-thin italic antialiased leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                and ends with
              </h2>
            </div>

            {/* اللوجو الثابت أسفل الجمل */}
            <div className="pt-10">
              <img
                src={logoWhite}
                alt="Pureminds"
                className="h-14 md:h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCinematic;
