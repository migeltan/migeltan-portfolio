import { useState, useEffect, useRef } from "react";
import { PiFlask } from "react-icons/pi";
import { IoPersonOutline, IoInformationCircleOutline } from "react-icons/io5";
import { PiStudent, PiBuildings } from "react-icons/pi";
import { FaCode, FaFigma, FaGlobe, FaBrain } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook } from "react-icons/fa";

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

// Stacks the category panels full-width below this breakpoint instead of
// squeezing 3 columns and truncating every label to "Da...", "Pro...", etc.
function useIsMobile(breakpoint = 560) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
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
    btnIcon: dark ? "#8b949e" : "#65676b",
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
      {
        label: "Introduction",
        icon: IoPersonOutline,
        props: { scrollTo: "Introduction" },
      },
      {
        label: "Life @ PUP",
        icon: PiStudent,
        props: { scrollTo: "life-at-pup" },
      },
      {
        label: "Foundation",
        icon: PiBuildings,
        props: { scrollTo: "foundation" },
      },
      {
        label: "More About Me!",
        icon: IoInformationCircleOutline,
        props: { scrollTo: "more-about-me" },
      },
    ],
  },
  {
    category: "Projects",
    items: [
      { label: "Programming", icon: FaCode, props: { scrollTo: "javasql" } },
      { label: "UI/UX", icon: FaFigma, props: { scrollTo: "figma" } },
      {
        label: "Web Development",
        icon: FaGlobe,
        props: { scrollTo: "kwagee" },
      },
      {
        label: "Machine Learning",
        icon: FaBrain,
        props: { scrollTo: "machinelearning" },
      },
    ],
  },
  {
    category: "Contacts",
    items: [
      { label: "GitHub", icon: FaGithub, props: {} },
      { label: "LinkedIn", icon: FaLinkedin, props: {} },
      { label: "Email", icon: FaEnvelope, props: {} },
      { label: "Facebook", icon: FaFacebook, props: {} },
    ],
  },
];
const maxItems = Math.max(...tableOfContents.map((c) => c.items.length));

export default function TableOfContents({ onPageChange, onScrollTo }) {
  const dark = useTheme();
  const t = tk(dark);
  const isMobile = useIsMobile();
  const [sectionRef, inView] = useInView(0.1);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  const handleClick = (category, props) => {
    if (category === "Projects") {
      onPageChange("Projects", props);
    } else if (category === "Contacts") {
      onPageChange("Contacts", {});
    } else {
      if (props.scrollTo) onScrollTo(props.scrollTo);
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
          // 1 column (stacked, full width) on mobile so labels never truncate;
          // 3 columns side-by-side once there's actually room for them.
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "10px" : "clamp(6px, 2.5vw, 16px)",
          marginTop: "16px",
        }}
      >
        {tableOfContents.map(({ category, items }, idx) => {
          const placeholderCount = isMobile ? 0 : maxItems - items.length;
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
                  padding: isMobile
                    ? "10px 14px"
                    : "clamp(8px, 3vw, 12px) clamp(6px, 3vw, 16px)",
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
                    fontSize: isMobile
                      ? "0.95rem"
                      : "clamp(0.78rem, 3.2vw, 1rem)",
                    fontWeight: 700,
                    color: t.panelTitle,
                    // no more truncation now that panels are full-width on mobile
                    whiteSpace: isMobile ? "normal" : "nowrap",
                    overflow: isMobile ? "visible" : "hidden",
                    textOverflow: isMobile ? "clip" : "ellipsis",
                  }}
                >
                  {category}
                </h3>
              </div>

              <div
                style={{
                  padding: isMobile
                    ? "10px 14px"
                    : "clamp(8px, 3vw, 14px) clamp(6px, 3vw, 16px)",
                  display: isMobile ? "grid" : "flex",
                  gridTemplateColumns: isMobile ? "1fr 1fr" : undefined,
                  flexDirection: isMobile ? undefined : "column",
                  gap: isMobile ? "8px" : "clamp(6px, 2vw, 10px)",
                }}
              >
                {items.map(({ label, icon: Icon, props }) => (
                  <button
                    key={label}
                    onClick={() => handleClick(category, props)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textAlign: "left",
                      fontSize: isMobile
                        ? "0.78rem"
                        : "clamp(0.62rem, 2.6vw, 0.85rem)",
                      fontWeight: 600,
                      color: t.btnText,
                      background: t.btnBg,
                      border: `1px solid ${t.btnBorder}`,
                      borderRadius: "8px",
                      padding: isMobile
                        ? "8px 10px"
                        : "clamp(6px, 2vw, 10px) clamp(6px, 2vw, 14px)",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      // full labels visible now — no more ellipsis truncation on mobile
                      whiteSpace: isMobile ? "normal" : "nowrap",
                      overflow: "hidden",
                      lineHeight: 1.25,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = t.btnHoverBg)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = t.btnBg)
                    }
                  >
                    <Icon
                      style={{
                        fontSize: "1em",
                        color: t.btnIcon,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        overflow: isMobile ? "visible" : "hidden",
                        textOverflow: isMobile ? "clip" : "ellipsis",
                      }}
                    >
                      {label}
                    </span>
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
