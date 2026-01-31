import logoLight from '../assets/pureminds-logo.png';
import logoDark from '../assets/puremindsDarkLogo.png';

const LogoHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-8 pointer-events-none">
      <div className="mix-blend-difference inline-flex items-center gap-2">
        <img src={logoLight} alt="Pureminds" className="h-7 w-auto" aria-hidden="true" />
        <span className="text-xl font-black uppercase tracking-tighter text-white">Pureminds</span>
      </div>
      {/* Dark logo import retained for explicit switching if needed */}
      <span className="hidden" aria-hidden="true">{logoDark}</span>
    </header>
  );
};

export default LogoHeader;
