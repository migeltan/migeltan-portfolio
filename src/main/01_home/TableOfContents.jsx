import { useState, useEffect } from "react";
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
      { label: "Seatworks", component: null, props: { scrollTo: "seatworks" } },
      {
        label: "Activities",
        component: null,
        props: { scrollTo: "activities" },
      },
      { label: "Exams", component: null, props: { scrollTo: "exams" } },
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
    <section className="card">
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
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {tableOfContents.map(({ category, items }) => {
          const placeholderCount = maxItems - items.length;

          return (
            <div
              key={category}
              style={{
                flex: "1 1 220px",
                minWidth: "200px",
                border: `1px solid ${t.panelBorder}`,
                borderRadius: "10px",
                background: t.panelBg,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
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
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: t.panelTitle,
                  }}
                >
                  {category}
                </h3>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {items.map(({ label, props }) => (
                  <button
                    key={label}
                    onClick={() => handleClick(category, label, props)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: t.btnText,
                      background: t.btnBg,
                      border: `1px solid ${t.btnBorder}`,
                      borderRadius: "8px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      transition: "background 0.2s",
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
                      height: "37px",
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
