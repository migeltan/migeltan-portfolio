import { useState, useRef, useEffect } from "react";
import { MdHistory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    panelTitle: dark ? "#e6edf3" : "#1c1e21",
    cardBg: dark ? "#161b22" : "#fafafa",
    cardBorder: dark ? "#30363d" : "#e5e7eb",
    cardHeaderBg: dark ? "#11151b" : "#f0f0f0",
    cardHeaderBorder: dark ? "#30363d" : "#e5e7eb",
    cardTitle: dark ? "#e6edf3" : "#1c1e21",
    arrowBg: dark ? "#161b22" : "#ffffff",
    arrowBorder: dark ? "#30363d" : "#e5e7eb",
    arrowText: dark ? "#c9d1d9" : "#374151",
    sectionDivider: dark ? "#30363d" : "#e5e7eb",
  };
}

const TrafficLights = ({ size = 10 }) => (
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
        background: "#28c840",
      }}
    />
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#febc2e",
      }}
    />
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#ff5f57",
      }}
    />
  </span>
);

const recentProjects = [
  { name: "Java...", empty: false },
  { name: "", empty: true },
  { name: "", empty: true },
];

function ScrollRow({ items, t }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
    scrollRef.current.scrollBy({
      left: direction * (cardWidth + 20),
      behavior: "smooth",
    });
  };

  return (
    <div style={{ position: "relative", padding: "20px 0" }}>
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        style={{
          position: "absolute",
          left: 6,
          top: "50%",
          transform: "translateY(-50%)",
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: `1px solid ${t.arrowBorder}`,
          background: t.arrowBg,
          color: t.arrowText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          fontSize: "14px",
        }}
      >
        <FaChevronLeft />
      </button>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          padding: "0 46px",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              scrollSnapAlign: "start",
              width: "85%",
              minHeight: "260px",
              borderRadius: "10px",
              border: `1px solid ${t.cardBorder}`,
              background: t.cardBg,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!item.empty && (
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${t.cardHeaderBorder}`,
                  background: t.cardHeaderBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TrafficLights size={10} />
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: t.cardTitle,
                  }}
                >
                  {item.name}
                </span>
              </div>
            )}
            <div style={{ flex: 1 }} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        style={{
          position: "absolute",
          right: 6,
          top: "50%",
          transform: "translateY(-50%)",
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: `1px solid ${t.arrowBorder}`,
          background: t.arrowBg,
          color: t.arrowText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          fontSize: "14px",
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default function RecentProjects() {
  const dark = useTheme();
  const t = tk(dark);

  return (
    <div className="connect-wrapper">
      <section
        className="card connect-container"
        style={{
          background: t.panelBg,
          overflow: "hidden",
        }}
      >
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingBottom: "16px",
            borderBottom: `1px solid ${t.sectionDivider}`,
          }}
        >
          <MdHistory style={{ fontSize: "1.1rem", color: t.panelTitle }} />
          <h2
            className="section-title"
            style={{ margin: 0, color: t.panelTitle }}
          >
            Recent Projects
          </h2>
        </div>

        <ScrollRow items={recentProjects} t={t} />
      </section>
    </div>
  );
}
