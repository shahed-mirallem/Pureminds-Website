import logoWhite from "../assets/pureminds-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <img
        src={logoWhite}
        alt="Pureminds"
        className="h-10 md:h-12"
        style={{ mixBlendMode: "difference" }}
      />
    </header>
  );
};

export default Header;
