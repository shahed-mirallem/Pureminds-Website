import { useEffect, useState } from "react";
import logoWhite from "../assets/pureminds-logo.png";
import logoDark from "../assets/pureminds-logo-dark.png";

const Header = () => {
  const [useDarkLogo, setUseDarkLogo] = useState(false);

  useEffect(() => {
    const lightSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme='light']"),
    );
    if (lightSections.length === 0) return;

    let frameId = 0;
    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        const header = document.querySelector("header");
        if (!header) return;
        const headerRect = header.getBoundingClientRect();
        const headerMid = headerRect.top + headerRect.height / 2;

        const isOnLight = lightSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return headerMid >= rect.top && headerMid <= rect.bottom;
        });

        setUseDarkLogo(isOnLight);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <img
        src={useDarkLogo ? logoDark : logoWhite}
        alt="Pureminds"
        className="h-10 md:h-12"
      />
    </header>
  );
};

export default Header;
