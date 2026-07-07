import { useState, useRef, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import C from "../../images/tech_stack/C.svg";
import java from "../../images/tech_stack/java.svg";
import mysql from "../../images/tech_stack/mysql.svg";
import python from "../../images/tech_stack/python.svg";
import r from "../../images/tech_stack/r.svg";
import cob from "../../images/tech_stack/cobol.svg";
import postgres from "../../images/tech_stack/postgresql.svg";

import html from "../../images/tech_stack/html5.svg";
import css from "../../images/tech_stack/css.svg";
import js from "../../images/tech_stack/javascript.svg";
import nodejs from "../../images/tech_stack/nodejs.svg";
import react from "../../images/tech_stack/reactjs.svg";
import figma from "../../images/tech_stack/figma.svg";

import mpl from "../../images/tech_stack/mpl.svg";
import pandas from "../../images/tech_stack/pandas.svg";
import scikit from "../../images/tech_stack/scikitlearn.svg";

import aws from "../../images/tech_stack/aws.svg";
import git from "../../images/tech_stack/git.svg";
import github from "../../images/tech_stack/github-dark.svg";
import msoffice from "../../images/tech_stack/msoffice.png";
import googleworkspace from "../../images/tech_stack/googleworkspace.svg";

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
    logoBg: dark ? "#161b22" : "#fafafa",
    logoBorder: dark ? "#30363d" : "#e5e7eb",
    logoText: dark ? "#e6edf3" : "#374151",
    arrowBg: dark ? "#161b22" : "#ffffff",
    arrowBorder: dark ? "#30363d" : "#e5e7eb",
    arrowText: dark ? "#c9d1d9" : "#374151",
    sectionDivider: dark ? "#30363d" : "#e5e7eb",
    fadeFrom: dark ? "#161b22" : "#ffffff",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
  };
}

// Categories use consistent short titles (so headers don't wrap unevenly),
// and each item list is alphabetized by `name`.
const techStack = [
  {
    category: "Programming & Database",
    items: [
      { name: "C", label: "C", icon: C },
      { name: "COBOL", label: "Cb", icon: cob },
      { name: "Java", label: "J", icon: java },
      { name: "MySQL", label: "MySQL", icon: mysql },
      { name: "PostgreSQL", label: "Pg", icon: postgres },
      { name: "Python", label: "Py", icon: python },
    ],
  },
  {
    category: "Web Development & UI/UX",
    items: [
      { name: "CSS", label: "C", icon: css },
      { name: "Figma", label: "Fi", icon: figma },
      { name: "HTML", label: "H", icon: html },
      { name: "JavaScript", label: "JS", icon: js },
      { name: "Node.js", label: "Nd", icon: nodejs },
      { name: "React", label: "Rx", icon: react },
    ],
  },
  {
    category: "ML & Visualization",
    items: [
      { name: "Matplotlib", label: "Mpl", icon: mpl },
      { name: "Pandas", label: "Pd", icon: pandas },
      { name: "R", label: "R", icon: r },
      { name: "Scikit-learn", label: "Skl", icon: scikit },
    ],
  },
  {
    category: "Cloud & Tools",
    items: [
      { name: "AWS", label: "AWS", icon: aws },
      { name: "Git", label: "Git", icon: git },
      { name: "GitHub", label: "GH", icon: github },
      { name: "Google Workspace", label: "GW", icon: googleworkspace },
      { name: "MS Office", label: "MS", icon: msoffice },
    ],
  },
];

function ScrollRow({ items, t }) {
  const scrollRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);
  const isSnappingRef = useRef(false);

  // Pause auto-scroll briefly whenever the user interacts manually,
  // then resume after a short delay.
  const pauseAutoScroll = (duration = 2500) => {
    isPausedRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, duration);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    pauseAutoScroll();
    scrollRef.current.scrollBy({
      left: direction * 120,
      behavior: "smooth",
    });
  };

  // Snap the row to land on a whole card rather than leaving one sliced
  // in half at the edge. Called whenever the row comes to rest (hover-pause
  // or after manual arrow clicks).
  const snapToNearestCard = () => {
    const el = scrollRef.current;
    if (!el || isSnappingRef.current) return;
    const firstCard = el.querySelector("[data-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 14; // + gap
    const nearest = Math.round(el.scrollLeft / cardWidth) * cardWidth;

    isSnappingRef.current = true;
    el.scrollTo({ left: nearest, behavior: "smooth" });
    setTimeout(() => {
      isSnappingRef.current = false;
    }, 400);
  };

  // Continuous, slow auto-slide. Loops back to start on reaching the end.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (isPausedRef.current || isSnappingRef.current) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollLeft += 0.2;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

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
    zIndex: 2,
  };

  return (
    <div
      onMouseEnter={() => {
        pauseAutoScroll(999999);
        snapToNearestCard();
      }}
      onMouseLeave={() => pauseAutoScroll(0)}
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
        style={{
          position: "relative",
          flex: 1,
          minWidth: 0,
          height: "100%",
        }}
      >
        {/* Edge fade masks so a partially-scrolled card fades out instead
            of ending in a hard visual cut. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "18px",
            background: `linear-gradient(to right, ${t.fadeFrom}, transparent)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "18px",
            background: `linear-gradient(to left, ${t.fadeFrom}, transparent)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "14px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            height: "100%",
            width: "100%",
            padding: "0 6px",
            boxSizing: "border-box",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              data-card
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
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = t.shadowHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
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
  const [sectionRef, inView] = useInView(0.1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
        {techStack.map(({ category, items }, i) => (
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
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0px)" : "translateY(20px)",
              transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s ease ${0.1 + i * 0.08}s`,
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
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <TrafficLights size={10} />
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
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

            <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
              <ScrollRow items={items} t={t} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
