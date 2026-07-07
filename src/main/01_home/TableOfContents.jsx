import { useState, useEffect, useRef } from "react";
import { PiFlask } from "react-icons/pi";

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

// Fires once, the first time the element scrolls into view.
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function tk(dark) {
  return {
    panelBg: dark ? "#161b22" : "#ffffff",
    panelBorder: dark ? "#30363d" : "#e5e7eb",
    panelHeaderBg: dark ? "#11151b" : "#fafafa",
    panelHeaderBorder: dark ? "#30363d" : "#f0f0f0",
    panelTitle: dark ? "#e6edf3" : "#1c1e21",
    sectionDivider: dark ? "#30363d" : "#e5e7eb",
    btnText: dark ? "#e6edf3" : "#1c1e21",
    btnBg: dark ? "#161b22" : "#fafafa",
    btnBorder: dark ? "#30363d" : "#e5e7eb",
    btnHoverBg: dark ? "#21262d" : "#f0f0f0",
    placeholderBorder: dark ? "#30363d" : "#d1d5db",
    panelShadowHover: dark
      ? "0 12px 24px rgba(0,0,0,0.5)"
      : "0 12px 24px rgba(0,0,0,0.1)",
  };
}

const tableOfContents = [
  {
    category: "Dashboard",
    items: [
      { label: "Introduction", component: null, props: {} },
      {
        label: "Life @ PUP",
        component: null,
        props: { scrollTo: "life-at-pup" },
      },
      {
        label: "Foundation",
        component: null,
        props: { scrollTo: "foundation" },
      },
      {
        label: "More About Me!",
        component: null,
        props: { scrollTo: "more-about-me" },
      },
    ],
  },
  {
    category: "Projects",
    items: [
      { label: "Programming", component: null, props: { scrollTo: "javasql" } },
      { label: "UI/UX", component: null, props: { scrollTo: "figma" } },
      {
        label: "Web Development",
        component: null,
        props: { scrollTo: "kwagee" },
      },
      {
        label: "Machine Learning",
        component: null,
        props: { scrollTo: "machinelearning" },
      },
    ],
  },
  {
    category: "Contacts",
    items: [
      { label: "GitHub", component: null, props: {} },
      { label: "LinkedIn", component: null, props: {} },
      { label: "Email", component: null, props: {} },
      { label: "Facebook", component: null, props: {} },
    ],
  },
];
const maxItems = Math.max(...tableOfContents.map((c) => c.items.length));

export default function TableOfContents({ onPageChange, onScrollTo }) {
  const dark = useTheme();
  const t = tk(dark);
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  const handleClick = (category, label, props) => {
    if (category === "Projects") {
      onPageChange("Projects", props);
    } else if (category === "Contacts") {
      onPageChange("Contacts", {});
    } else if (category === "Home" || category === "Dashboard") {
      if (label === "Introduction") {
        onScrollTo("introduction");
      } else if (label === "Additional Information") {
        onScrollTo("projects-cert");
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
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
        <PiFlask style={{ fontSize: "1.1rem" }} />
        <h2 className="section-title" style={{ margin: 0 }}>
          Inside the E-Portfolio
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(6px, 2.5vw, 16px)",
          marginTop: "16px",
        }}
      >
        {tableOfContents.map(({ category, items }, idx) => {
          const placeholderCount = maxItems - items.length;
          const hovered = hoveredPanel === category;

          return (
            <div
              key={category}
              onMouseEnter={() => setHoveredPanel(category)}
              onMouseLeave={() => setHoveredPanel(null)}
              style={{
                minWidth: 0,
                border: `1px solid ${t.panelBorder}`,
                borderRadius: "10px",
                background: t.panelBg,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: hovered ? t.panelShadowHover : "none",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                opacity: inView ? 1 : 0,
                transition:
                  `opacity 0.6s ease ${0.08 + idx * 0.12}s, ` +
                  `transform 0.25s ease, box-shadow 0.25s ease`,
              }}
            >
              <div
                style={{
                  padding: "clamp(8px, 3vw, 12px) clamp(6px, 3vw, 16px)",
                  borderBottom: `1px solid ${t.panelHeaderBorder}`,
                  background: t.panelHeaderBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TrafficLights size={10} />
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.78rem, 3.2vw, 1rem)",
                    fontWeight: 700,
                    color: t.panelTitle,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category}
                </h3>
              </div>

              <div
                style={{
                  padding: "clamp(8px, 3vw, 14px) clamp(6px, 3vw, 16px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(6px, 2vw, 10px)",
                }}
              >
                {items.map(({ label, props }) => (
                  <button
                    key={label}
                    onClick={() => handleClick(category, label, props)}
                    style={{
                      textAlign: "left",
                      fontSize: "clamp(0.62rem, 2.6vw, 0.85rem)",
                      fontWeight: 600,
                      color: t.btnText,
                      background: t.btnBg,
                      border: `1px solid ${t.btnBorder}`,
                      borderRadius: "8px",
                      padding: "clamp(6px, 2vw, 10px) clamp(6px, 2vw, 14px)",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = t.btnHoverBg)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = t.btnBg)
                    }
                  >
                    {label}
                  </button>
                ))}

                {Array.from({ length: placeholderCount }).map((_, i) => (
                  <div
                    key={`placeholder-${i}`}
                    style={{
                      height: "clamp(28px, 8vw, 37px)",
                      borderRadius: "8px",
                      border: `1.5px dashed ${t.placeholderBorder}`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
