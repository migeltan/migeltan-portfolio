import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

import Home from "./main/01_home/Home_Index";
import Projects from "./main/02_proj/Index_Proj";
import Finals from "./main/03_finals/Finals_Index";
import Contacts from "./main/04_contacts/Contacts_Index";
import logo from "./images/multimedia/img3.jpg";

import "./App.css";
import "./css/Navbar.css";
import "./css/Activities.css";

const PAGES = ["Dashboard", "Projects", "Contacts"];

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [activeScrollTo, setActiveScrollTo] = useState(null);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          if (currentY < 80) {
            setVisible(true);
          } else if (delta > 5) {
            setVisible(false);
          } else if (delta < -5) {
            setVisible(true);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (page, props = {}) => {
    setActivePage(page);
    setActiveScrollTo(props?.scrollTo || null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Home darkMode={darkMode} onPageChange={handlePageChange} />;
      case "Projects":
        return <Projects scrollTo={activeScrollTo} />;
      case "Contacts":
        return <Contacts />;
      default:
        return <Home darkMode={darkMode} onPageChange={handlePageChange} />;
    }
  };

  const themeClass = darkMode ? "dark" : "light";
  const visibilityClass = visible ? "visible" : "hidden";

  return (
    <div className={darkMode ? "container dark-mode" : "container"}>
      {/* NAVBAR */}
      <header className={`navbar ${themeClass} ${visibilityClass}`}>
        <div className="navbar-inner">
          {/* BRAND */}
          <div
            className="navbar-brand flex items-center gap-2 cursor-pointer"
            onClick={() => handlePageChange("Home")}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover mr-5"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">Migel H. Tan</span>
              <span className="text-xs opacity-70">E-Portfolio</span>
            </div>
          </div>

          {/* NAV LINKS — desktop */}
          <nav className="navbar-links">
            {PAGES.map((page) => (
              <button
                key={page}
                className={`nav-btn ${activePage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </nav>

          {/* HAMBURGER + THEME TOGGLE — grouped */}
          <div className="navbar-controls">
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className={`toggle-circle ${darkMode ? "active" : ""}`}>
                {darkMode ? (
                  <FaMoon className="theme-icon" />
                ) : (
                  <FaSun className="theme-icon" />
                )}
              </div>
            </button>
          </div>
        </div>{" "}
        {/* ← THIS closes .navbar-inner — was missing */}
        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className={`mobile-menu open ${themeClass}`}>
            {PAGES.map((page) => (
              <button
                key={page}
                className={`mobile-nav-btn ${activePage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* NAVBAR OFFSET */}
      <div className="navbar-spacer" />

      {/* PAGE CONTENT */}
      <section className="w-full h-auto">{renderPage()}</section>
    </div>
  );
}
