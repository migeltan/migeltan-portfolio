import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MdHistory, MdZoomIn } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// TODO: swap these for your actual cover images per project.
import javaImg from "../../assets/walkthrough/java/1.png";
import hackImg from "../../assets/walkthrough/kwagee/1 (1).png";
import uiImg from "../../assets/walkthrough/figma/Screenshot 2026-07-09 223708.png";
import mlImg from "../../assets/walkthrough/phishing/figure1_class_distribution.png";

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

function useIsMobile(breakpoint = 640) {
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
    panelTitle: dark ? "#e6edf3" : "#1c1e21",
    cardBg: dark ? "#0d1117" : "#f3f4f6",
    cardBorder: dark ? "#30363d" : "#e5e7eb",
    cardHeaderBg: dark ? "#11151b" : "#f0f0f0",
    cardHeaderBorder: dark ? "#30363d" : "#e5e7eb",
    cardTitle: dark ? "#e6edf3" : "#1c1e21",
    arrowBg: dark ? "#161b22" : "#ffffff",
    arrowBorder: dark ? "#30363d" : "#e5e7eb",
    arrowText: dark ? "#c9d1d9" : "#374151",
    sectionDivider: dark ? "#30363d" : "#e5e7eb",
    accent: dark ? "#60a5fa" : "#2563eb",
    accentSoft: dark ? "rgba(96,165,250,0.14)" : "rgba(37,99,235,0.08)",
    tagBg: dark ? "#1c2128" : "#eef1f6",
    tagText: dark ? "#c9d1d9" : "#3d4451",
    dotIdle: dark ? "#30363d" : "#d7dae0",
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

// Added `tags` — short tech-stack labels shown on the card.
const recentProjects = [
  {
    name: "Programming Projects",
    image: javaImg,
    tags: ["Java", "OOP"],
    empty: false,
    page: "Projects",
    props: { scrollTo: 1 },
  },
  {
    name: "UI Project",
    image: uiImg,
    tags: ["Figma", "UI/UX"],
    empty: false,
    page: "Projects",
    props: { scrollTo: "TODO-blockchain-project-id" },
  },
  {
    name: "Hackathon Project",
    image: hackImg,
    tags: ["React", "Node.js"],
    empty: false,
    page: "Projects",
    props: { scrollTo: "TODO-blockchain-project-id" },
  },
  {
    name: "Machine Learning Project",
    image: mlImg,
    tags: ["Python", "scikit-learn"],
    empty: false,
    page: "Projects",
    props: { scrollTo: "TODO-ml-project-id" },
  },
];

const FLIP_DURATION = 650;
const AUTO_ADVANCE_INTERVAL = 4000;

// Keyframes for the auto-advance progress bar. Injected once, globally scoped
// by a unique class name so it won't collide with anything else in your app.
const ProgressBarStyles = () => (
  <style>{`
    @keyframes rp-progress-fill {
      from { width: 0%; }
      to { width: 100%; }
    }
  `}</style>
);

// ── Lightbox — same UI/behavior as Gallery.jsx's Lightbox ─
function ProjectLightbox({ items, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const item = items[current];

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: 0,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "28px",
            cursor: "pointer",
            opacity: 0.7,
          }}
        >
          ✕
        </button>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "14px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            margin: 0,
          }}
        >
          {current + 1} / {items.length}
        </p>

        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: "-20px",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>

          <img
            key={current}
            src={item.image}
            alt={item.name}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "10px",
              background: "#0b0d12",
            }}
          />

          <button
            onClick={next}
            style={{
              position: "absolute",
              right: "-20px",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: i === current ? "#fff" : "rgba(255,255,255,0.3)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}>
          ← → to navigate · ESC to close
        </p>
      </div>
    </div>,
    document.body,
  );
}

function CardDeck({ items, t, onSelect }) {
  const n = items.length;
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [hoveredFront, setHoveredFront] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [paused, setPaused] = useState(false); // reactive mirror of isPausedRef, drives the progress bar
  const leaveTimeoutRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);

  const pauseAutoAdvance = (duration = 3000) => {
    isPausedRef.current = true;
    setPaused(true);
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      setPaused(false);
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

  const goToDot = (i) => {
    if (i === currentIndex) return;
    pauseAutoAdvance();
    goTo(i);
  };

  const openLightbox = (i) => {
    pauseAutoAdvance(999999);
    setLightboxIndex(i);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    pauseAutoAdvance(0);
  };

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

  const nextIndex = n > 1 ? (currentIndex + 1) % n : currentIndex;

  const styleForIndex = (i) => {
    const isFront = i === currentIndex && i !== leavingIndex;
    const isLeaving = i === leavingIndex;
    const isPeek = !isFront && !isLeaving && i === nextIndex;

    const base = {
      position: "absolute",
      inset: 0,
      borderRadius: "10px",
      border: `1px solid ${t.cardBorder}`,
      background: t.cardBg,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: `opacity ${FLIP_DURATION}ms ease, transform ${FLIP_DURATION}ms ease, box-shadow 0.25s ease`,
    };

    if (isFront) {
      return {
        ...base,
        opacity: 1,
        transform: hoveredFront
          ? "translateY(-6px) scale(1)"
          : "translateY(0px) scale(1)",
        zIndex: 30,
        boxShadow: hoveredFront ? t.shadowHover : t.shadowRest,
        pointerEvents: "auto",
      };
    }

    if (isLeaving) {
      return {
        ...base,
        opacity: 0,
        transform: "translateY(0px) scale(0.97)",
        zIndex: 25,
        boxShadow: "none",
        pointerEvents: "none",
      };
    }

    // Peek card: the upcoming project, visible as a sliver stacked behind
    // the front card on the right — sells the "deck of cards" feel.
    if (isPeek) {
      return {
        ...base,
        opacity: 1,
        transform: isMobile
          ? "translateX(10px) scale(0.95)"
          : "translateX(18px) scale(0.95)",
        zIndex: 15,
        boxShadow: t.shadowRest,
        pointerEvents: "none",
      };
    }

    return {
      ...base,
      opacity: 0,
      transform: "translateY(0px) scale(0.97)",
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
        maxWidth: "1040px",
        width: "100%",
        margin: "0 auto",
        padding: isMobile ? "14px 40px" : "20px 56px",
      }}
    >
      <ProgressBarStyles />

      {lightboxIndex !== null && (
        <ProjectLightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}

      <button
        onClick={handlePrevClick}
        aria-label="Previous project"
        style={{
          position: "absolute",
          left: isMobile ? 2 : 6,
          top: "50%",
          transform: "translateY(-50%)",
          width: isMobile ? 28 : 34,
          height: isMobile ? 28 : 34,
          borderRadius: "50%",
          border: `1px solid ${t.arrowBorder}`,
          background: t.arrowBg,
          color: t.arrowText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 40,
          fontSize: isMobile ? "12px" : "14px",
        }}
      >
        <FaChevronLeft />
      </button>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "3 / 4" : "16 / 10",
        }}
      >
        {items.map((item, i) => {
          const isFront = i === currentIndex && i !== leavingIndex;
          return (
            <div key={i} style={styleForIndex(i)}>
              {!item.empty && (
                <>
                  {/* Auto-advance progress bar */}
                  {isFront && (
                    <div
                      style={{
                        height: "3px",
                        width: "100%",
                        background: t.accentSoft,
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        key={currentIndex}
                        style={{
                          height: "100%",
                          background: t.accent,
                          animation: `rp-progress-fill ${AUTO_ADVANCE_INTERVAL}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    </div>
                  )}

                  {/* Titlebar — click here to navigate to the project */}
                  <div
                    onClick={() => isFront && onSelect?.(item)}
                    onMouseEnter={() => isFront && setHoveredFront(true)}
                    onMouseLeave={() => isFront && setHoveredFront(false)}
                    style={{
                      padding: isMobile ? "9px 12px" : "12px 16px",
                      borderBottom: `1px solid ${t.cardHeaderBorder}`,
                      background: t.cardHeaderBg,
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                      cursor: isFront ? "pointer" : "default",
                    }}
                  >
                    <TrafficLights size={isMobile ? 8 : 10} />
                    <span
                      style={{
                        fontSize: isMobile ? "0.85rem" : "1rem",
                        fontWeight: 700,
                        color: t.cardTitle,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </span>

                    {/* Real CTA button instead of ghost text */}
                    {isFront && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect?.(item);
                        }}
                        style={{
                          marginLeft: "auto",
                          flexShrink: 0,
                          fontSize: isMobile ? "0.68rem" : "0.75rem",
                          fontWeight: 600,
                          color: hoveredFront ? "#fff" : t.accent,
                          background: hoveredFront ? t.accent : t.accentSoft,
                          border: "none",
                          borderRadius: "999px",
                          padding: isMobile ? "4px 9px" : "5px 12px",
                          cursor: "pointer",
                          transition: "background 0.2s ease, color 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        View project →
                      </button>
                    )}
                  </div>

                  {/* Tech stack tags */}
                  {item.tags?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        padding: isMobile ? "7px 12px" : "9px 16px",
                        borderBottom: `1px solid ${t.cardHeaderBorder}`,
                        background: t.cardHeaderBg,
                        flexShrink: 0,
                      }}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: isMobile ? "0.65rem" : "0.7rem",
                            fontWeight: 600,
                            color: t.tagText,
                            background: t.tagBg,
                            borderRadius: "5px",
                            padding: isMobile ? "2px 6px" : "3px 8px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Picture frame */}
                  <div
                    onMouseEnter={() => isFront && setHoveredFront(true)}
                    onMouseLeave={() => isFront && setHoveredFront(false)}
                    style={{
                      position: "relative",
                      flex: 1,
                      minHeight: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: t.cardBg,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      draggable={false}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                    {isFront && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(i);
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0,0,0,0.28)",
                          opacity: hoveredFront ? 1 : 0,
                          transition: "opacity 0.25s ease",
                          cursor: "zoom-in",
                        }}
                      >
                        <MdZoomIn
                          style={{
                            fontSize: isMobile ? "1.8rem" : "2.2rem",
                            color: "#ffffff",
                            transform: hoveredFront ? "scale(1)" : "scale(0.7)",
                            transition: "transform 0.25s ease",
                            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                          }}
                        />
                      </div>
                    )}
                  </div>
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
          right: isMobile ? 2 : 6,
          top: "50%",
          transform: "translateY(-50%)",
          width: isMobile ? 28 : 34,
          height: isMobile ? 28 : 34,
          borderRadius: "50%",
          border: `1px solid ${t.arrowBorder}`,
          background: t.arrowBg,
          color: t.arrowText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 40,
          fontSize: isMobile ? "12px" : "14px",
        }}
      >
        <FaChevronRight />
      </button>

      {/* Progress dots */}
      {n > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "7px",
            marginTop: isMobile ? "12px" : "16px",
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: i === currentIndex ? "20px" : "7px",
                height: "7px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: i === currentIndex ? t.accent : t.dotIdle,
                transition: "all 0.25s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
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
