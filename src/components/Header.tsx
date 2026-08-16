import * as React from "react";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ColorModeIconDropdown from "~/shared-theme/ColorModeIconDropdown";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Voices", href: "#testimonials" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="wordmark" href="#top" aria-label="Rohit Madas, home">
          <span>Rohit Madas</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-contact"
            href="https://www.linkedin.com/in/rohit-madas-41328b178/"
            target="_blank"
            rel="noreferrer"
          >
            Let's talk <ArrowOutwardRoundedIcon fontSize="small" />
          </a>
          <ColorModeIconDropdown />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="mobile-contact"
          href="https://www.linkedin.com/in/rohit-madas-41328b178/"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Start a conversation <ArrowOutwardRoundedIcon />
        </a>
      </div>
    </header>
  );
}
