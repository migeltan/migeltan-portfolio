import { useState, useRef, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import C from "../../images/tech_stack/C.svg";
import java from "../../images/tech_stack/java.svg";

const TrafficLights = ({ size = 12 }) => (
  <span
    style={{
      display: "flex",
      gap: "5px",
      alignItems: "center",
      marginRight: "8px",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#ff5f57",
        display: "inline-block",
      }}
    />
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#febc2e",
        display: "inline-block",
      }}
    />
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#28c840",
        display: "inline-block",
      }}
    />
  </span>
);

function useTheme() {
  const [dark, setDark] = useState(
    () =>
      document.querySelector(".container")?.classList.contains("dark-mode") ??
      false,
  );
  useEffect(() => {
    const el = document.querySelector(".container");
    if (!el) return;
    const observer = new MutationObserver(() =>
      setDark(el.classList.contains("dark-mode")),
    );
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

function tk(dark) {
  return {
    panelBg: dark ? "#161b22" : "#ffffff",
    panelBorder: dark ? "#30363d" : "#e5e7eb",
    panelHeaderBg: dark ? "#11151b" : "#fafafa",
    panelHeaderBorder: dark ? "#30363d" : "#f0f0f0",
    panelTitle: dark ? "#e6edf3" : "#1c1e21",
    logoBg: dark ? "#161b22" : "#fafafa",
    logoBorder: dark ? "#30363d" : "#e5e7eb",
    logoText: dark ? "#e6edf3" : "#374151",
    arrowBg: dark ? "#161b22" : "#ffffff",
    arrowBorder: dark ? "#30363d" : "#e5e7eb",
    arrowText: dark ? "#c9d1d9" : "#374151",
    sectionDivider: dark ? "#30363d" : "#e5e7eb",
  };
}

// NOTE: `label` is always plain text (used as the fallback / accessible text).
// `icon` (optional) is an imported image asset, rendered via <img src={...}>.
// Previously `label` was overloaded to sometimes hold an imported SVG, which
// React just printed as text/nothing instead of rendering an image.
const techStack = [
  {
    category: "Programming & Data",
    items: [
      { name: "Python", label: "Py" },
      { name: "Pandas", label: "Pd" },
      { name: "Matplotlib", label: "Mpl" },
      { name: "Scikit-learn", label: "Skl" },
      { name: "SQL", label: "SQL" },
      { name: "Java", label: "J", icon: java },
      { name: "C", label: "C", icon: C },
      { name: "COBOL", label: "Cb" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "HTML", label: "H" },
      { name: "CSS", label: "C" },
      { name: "JavaScript", label: "JS" },
      { name: "Node.js", label: "Nd" },
      { name: "React", label: "Rx" },
    ],
  },
  {
    category: "Visualization & Design",
    items: [
      { name: "Figma", label: "Fi" },
      { name: "Matplotlib", label: "Mpl" },
    ],
  },
  {
    category: "Cloud & Tools",
    items: [
      { name: "AWS", label: "AWS" },
      { name: "Git", label: "Git" },
      { name: "GitHub", label: "GH" },
      { name: "MySQL", label: "My" },
      { name: "PostgreSQL", label: "Pg" },
      { name: "MS Office", label: "MS" },
      { name: "Google Workspace", label: "GW" },
    ],
  },
];

function ScrollRow({ items, t }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * 120,
      behavior: "smooth",
    });
  };

  const arrowStyle = {
    flexShrink: 0,
    alignSelf: "center",
    width: "clamp(22px, 6vw, 28px)",
    height: "clamp(22px, 6vw, 28px)",
    borderRadius: "50%",
    border: `1px solid ${t.arrowBorder}`,
    background: t.arrowBg,
    color: t.arrowText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: "8px",
        padding: "14px 12px",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        minHeight: 0,
      }}
    >
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        style={arrowStyle}
      >
        <FaChevronLeft />
      </button>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "14px",
          overflowX: "auto",
          scrollBehavior: "smooth",
          flex: 1,
          minWidth: 0,
          height: "100%",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              width: "clamp(60px, 13vw, 90px)",
              height: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                width: "100%",
                minHeight: 0,
                borderRadius: "10px",
                border: `1px solid ${t.logoBorder}`,
                background: t.logoBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "clamp(11px, 3vw, 16px)",
                color: t.logoText,
                overflow: "hidden",
                boxSizing: "border-box",
                padding: "10%",
              }}
            >
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              ) : (
                item.label
              )}
            </div>
            <span
              style={{
                flexShrink: 0,
                fontSize: "11px",
                fontWeight: 600,
                color: t.logoText,
                textAlign: "center",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        style={arrowStyle}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default function TechStack() {
  const dark = useTheme();
  const t = tk(dark);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div
        className="section-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "8px",
          paddingBottom: "16px",
          borderBottom: `1px solid ${t.sectionDivider}`,
        }}
      >
        <MdOutlineVerified style={{ fontSize: "1.1rem" }} />
        <h2 className="section-title" style={{ margin: 0 }}>
          Tech Stack
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gridTemplateRows: isMobile ? undefined : "repeat(2, 1fr)",
          gap: "16px",
          marginTop: "16px",
          width: "100%",
          flex: 1,
        }}
      >
        {techStack.map(({ category, items }) => (
          <div
            key={category}
            style={{
              width: "100%",
              minWidth: 0,
              border: `1px solid ${t.panelBorder}`,
              borderRadius: "10px",
              background: t.panelBg,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: `1px solid ${t.panelHeaderBorder}`,
                background: t.panelHeaderBg,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <TrafficLights size={10} />
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: t.panelTitle,
                }}
              >
                {category}
              </h3>
            </div>

            <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
              <ScrollRow items={items} t={t} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
