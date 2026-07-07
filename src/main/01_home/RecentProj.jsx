import { useState, useRef, useEffect } from "react";
import { MdHistory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// TODO: swap these for your actual cover images per project.
import javaImg from "../../images/multimedia/img4.jpg";
// import naiveBayesImg from "../../images/multimedia/YOUR_IMAGE.jpg";
// import blockchainImg from "../../images/multimedia/YOUR_IMAGE.jpg";

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
    shadowRest: dark
      ? "0 1px 4px rgba(0,0,0,0.4)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
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

// Each entry is a preview of a full project page. `page`/`props` describe
// where clicking the card should navigate — this mirrors the same
// onPageChange("Projects", { scrollTo: "..." }) pattern used in
// TableOfContents. Fill in the real scrollTo ids for the two TODO entries
// once you confirm what your Projects page uses for them.
const recentProjects = [
  {
    name: "Java Application with MySQL Database Connection",
    image: javaImg,
    empty: false,
    page: "Projects",
    props: { scrollTo: "javasql" },
  },
  {
    name: "Naive Bayes Machine Learning Model",
    image: javaImg, // TODO: replace with the ML project's cover image
    empty: false,
    page: "Projects",
    props: { scrollTo: "TODO-ml-project-id" },
  },
  {
    name: "Stellar Blockchain Wallet",
    image: javaImg, // TODO: replace with the Blockchain project's cover image
    empty: false,
    page: "Projects",
    props: { scrollTo: "TODO-blockchain-project-id" },
  },
];

const FLIP_DURATION = 650; // ms, must match the CSS transition duration below
const AUTO_ADVANCE_INTERVAL = 4000; // ms between automatic flips
const MAX_PEEK = 2; // how many cards peek out behind the front card

function CardDeck({ items, t, onSelect }) {
  const n = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [hoveredFront, setHoveredFront] = useState(false);
  const leaveTimeoutRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);

  const pauseAutoAdvance = (duration = 3000) => {
    isPausedRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, duration);
  };

  const goTo = (nextIndex) => {
    if (n <= 1) return;
    setLeavingIndex(currentIndex);
    setCurrentIndex(nextIndex);

    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setLeavingIndex(null);
    }, FLIP_DURATION);
  };

  const next = () => goTo((currentIndex + 1) % n);
  const prev = () => goTo((currentIndex - 1 + n) % n);

  const handleNextClick = () => {
    pauseAutoAdvance();
    next();
  };
  const handlePrevClick = () => {
    pauseAutoAdvance();
    prev();
  };

  // Auto-advance the deck, pausing on hover or manual interaction.
  useEffect(() => {
    if (n <= 1) return;
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      next();
    }, AUTO_ADVANCE_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, n]);

  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeoutRef.current);
      clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const styleForIndex = (i) => {
    const isFront = i === currentIndex && i !== leavingIndex;

    const base = {
      position: "absolute",
      inset: 0,
      borderRadius: "10px",
      border: `1px solid ${t.cardBorder}`,
      background: t.cardBg,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: `transform ${FLIP_DURATION}ms cubic-bezier(0.4, 0.05, 0.2, 1), opacity ${FLIP_DURATION}ms ease, box-shadow 0.25s ease`,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      willChange: "transform, opacity",
      cursor: isFront ? "pointer" : "default",
    };

    // The card currently flipping away to the back of the deck.
    if (i === leavingIndex) {
      return {
        ...base,
        transform: "translateY(18px) scale(0.82) rotateY(-180deg)",
        opacity: 0,
        zIndex: 5,
        boxShadow: "none",
      };
    }

    const delta = (i - currentIndex + n) % n;

    if (delta === 0) {
      return {
        ...base,
        transform: hoveredFront
          ? "translateY(-6px) scale(1) rotateY(0deg)"
          : "translateY(0) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 30,
        boxShadow: hoveredFront ? t.shadowHover : t.shadowRest,
      };
    }

    if (delta <= MAX_PEEK) {
      const step = delta; // 1, 2, ...
      return {
        ...base,
        transform: `translateY(${-10 * step}px) scale(${1 - 0.06 * step}) rotateY(0deg)`,
        opacity: Math.max(0.35, 1 - 0.35 * step),
        zIndex: 30 - step,
        boxShadow: "none",
        pointerEvents: "none",
      };
    }

    // Anything further back stays fully hidden, ready to appear later.
    return {
      ...base,
      transform: `translateY(${-10 * MAX_PEEK}px) scale(${1 - 0.06 * (MAX_PEEK + 1)}) rotateY(0deg)`,
      opacity: 0,
      zIndex: 1,
      boxShadow: "none",
      pointerEvents: "none",
    };
  };

  return (
    <div
      onMouseEnter={() => pauseAutoAdvance(999999)}
      onMouseLeave={() => pauseAutoAdvance(0)}
      style={{
        position: "relative",
        padding: "20px 46px",
      }}
    >
      <button
        onClick={handlePrevClick}
        aria-label="Previous project"
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
          zIndex: 40,
          fontSize: "14px",
        }}
      >
        <FaChevronLeft />
      </button>

      <div
        style={{
          position: "relative",
          minHeight: "300px",
          perspective: "1200px",
        }}
      >
        {items.map((item, i) => {
          const isFront = i === currentIndex && i !== leavingIndex;
          return (
            <div
              key={i}
              style={styleForIndex(i)}
              onMouseEnter={() => isFront && setHoveredFront(true)}
              onMouseLeave={() => isFront && setHoveredFront(false)}
              onClick={() => isFront && !item.empty && onSelect?.(item)}
            >
              {!item.empty && (
                <>
                  {/* Titlebar with traffic lights + project name */}
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: `1px solid ${t.cardHeaderBorder}`,
                      background: t.cardHeaderBg,
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
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

                  {/* Picture frame — fills the rest of the card */}
                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNextClick}
        aria-label="Next project"
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
          zIndex: 40,
          fontSize: "14px",
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default function RecentProjects({ onPageChange }) {
  const dark = useTheme();
  const t = tk(dark);

  const handleSelect = (item) => {
    onPageChange?.(item.page, item.props);
  };

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

        <CardDeck items={recentProjects} t={t} onSelect={handleSelect} />
      </section>
    </div>
  );
}
