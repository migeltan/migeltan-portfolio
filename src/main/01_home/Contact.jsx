import { useState, useEffect, useRef } from "react";
import { AiOutlineCode, AiOutlineTool, AiOutlineBook } from "react-icons/ai";
import { BsLinkedin, BsPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaInstagram } from "react-icons/fa";

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
    cardBg: dark ? "#1a1d27" : "#ffffff",
    cardBorder: dark ? "#2a2d3a" : "#e5e7eb",
    titleBarBg: dark ? "#13151f" : "#fafafa",
    titleBarBorder: dark ? "#2a2d3a" : "#f0f0f0",
    sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
    heading: dark ? "#f0f2f8" : "#1c1e21",
    subText: dark ? "#c8cfe0" : "#374151",
    itemBg: dark ? "#20232f" : "#f9fafb",
    itemBorder: dark ? "#2a2d3a" : "#e5e7eb",
    itemBgHover: dark ? "#262a38" : "#f0f1f3",
    linkText: dark ? "#f0f2f8" : "#1c1e21",
    shadowRest: dark
      ? "0 1px 6px rgba(0,0,0,0.5)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
  };
}

// Fill these in with whatever's actually true for you right now —
// this panel is meant to be a quick, easy-to-update snapshot.
const rightNow = [
  {
    icon: AiOutlineCode,
    label: "Learning",
    value: "Advanced React patterns & TypeScript",
  },
  {
    icon: AiOutlineTool,
    label: "Building",
    value: "Kwagee — a Stellar blockchain wallet",
  },
  {
    icon: AiOutlineBook,
    label: "Reading",
    value: "Clean Code by Robert C. Martin",
  },
];

function Panel({ title, delay, inView, t, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${t.cardBorder}`,
        borderRadius: "10px",
        background: t.cardBg,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? t.shadowHover : t.shadowRest,
        transform: inView
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0px)"
          : "translateY(24px)",
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "clamp(8px, 1.8vw, 12px) clamp(10px, 2.2vw, 16px)",
          borderBottom: `1px solid ${t.titleBarBorder}`,
          background: t.titleBarBg,
        }}
      >
        <TrafficLights size={10} />
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
            fontWeight: 700,
            color: t.heading,
          }}
        >
          {title}
        </h3>
      </div>

      <div
        style={{
          padding: "clamp(10px, 2.2vw, 16px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(6px, 1.4vw, 10px)",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ItemRow({ t, href, target, icon: Icon, children }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: t.itemBg,
        border: `1px solid ${t.itemBorder}`,
        borderRadius: "8px",
        padding: "clamp(7px, 1.6vw, 10px) clamp(9px, 2vw, 14px)",
        color: t.linkText,
        fontSize: "clamp(0.72rem, 1.5vw, 0.85rem)",
        fontWeight: 600,
        textDecoration: "none",
        transition: "background 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = t.itemBgHover;
        e.currentTarget.style.transform = "translateX(4px)";
        const icon = e.currentTarget.querySelector(".row-icon");
        if (icon) icon.style.transform = "scale(1.15) rotate(-6deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = t.itemBg;
        e.currentTarget.style.transform = "translateX(0px)";
        const icon = e.currentTarget.querySelector(".row-icon");
        if (icon) icon.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {Icon && (
        <Icon
          className="row-icon"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
            flexShrink: 0,
            transition: "transform 0.25s ease",
          }}
        />
      )}
      {children}
    </Tag>
  );
}

export default function Contact() {
  const dark = useTheme();
  const t = tk(dark);
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="card about-me-section"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingBottom: "16px",
          borderBottom: `1px solid ${t.sectionDivider}`,
        }}
      >
        <BsPersonLinesFill style={{ fontSize: "1.3rem", color: t.heading }} />
        <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
          More About Me!
        </h2>
      </div>

      {/* PANEL GRID */}
      <div className="about-me-grid">
        {/* Goals */}
        <Panel title="Goals" delay={0.05} inView={inView} t={t}>
          <div
            style={{
              background: t.itemBg,
              border: `1px solid ${t.itemBorder}`,
              borderRadius: "8px",
              padding: "clamp(7px, 1.6vw, 10px) clamp(9px, 2vw, 14px)",
              fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)",
              color: t.subText,
              lineHeight: 1.5,
            }}
          >
            To finish this midterm project for Object-Oriented programming.
          </div>
          <div
            style={{
              background: t.itemBg,
              border: `1px solid ${t.itemBorder}`,
              borderRadius: "8px",
              padding: "clamp(7px, 1.6vw, 10px) clamp(9px, 2vw, 14px)",
              fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)",
              color: t.subText,
              lineHeight: 1.5,
            }}
          >
            Graduate the term without any irregularization!
          </div>
          <div
            style={{
              background: t.itemBg,
              border: `1px solid ${t.itemBorder}`,
              borderRadius: "8px",
              padding: "clamp(7px, 1.6vw, 10px) clamp(9px, 2vw, 14px)",
              fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)",
              color: t.subText,
              lineHeight: 1.5,
            }}
          >
            Finish this year without any problem, and achieve greater lengths in
            this field!
          </div>
        </Panel>

        {/* Social Links */}
        <Panel title="Social Links" delay={0.15} inView={inView} t={t}>
          <ItemRow
            t={t}
            href="https://www.linkedin.com/in/migel-tan-3125herrera/"
            target="_blank"
            icon={BsLinkedin}
          >
            LinkedIn
          </ItemRow>
          <ItemRow
            t={t}
            href="https://github.com/migeltan"
            target="_blank"
            icon={FaGithub}
          >
            GitHub
          </ItemRow>
          <ItemRow
            t={t}
            href="https://www.instagram.com/miggytahn/"
            target="_blank"
            icon={FaInstagram}
          >
            Instagram
          </ItemRow>
        </Panel>

        {/* Contact CTA */}
        <Panel title="Contact" delay={0.25} inView={inView} t={t}>
          <div
            style={{
              background: t.itemBg,
              border: `1px solid ${t.itemBorder}`,
              borderRadius: "8px",
              padding: "clamp(10px, 2vw, 14px)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.72rem, 1.5vw, 0.85rem)",
                color: t.subText,
                lineHeight: 1.5,
              }}
            >
              Open to learn more in the field of information technology!
            </p>
            <span
              style={{
                fontSize: "clamp(0.72rem, 1.5vw, 0.85rem)",
                fontWeight: 700,
                color: t.heading,
              }}
            >
              Get in touch →
            </span>
          </div>
        </Panel>

        {/* Right Now */}
        <Panel title="Right Now" delay={0.35} inView={inView} t={t}>
          {rightNow.map(({ icon, label, value }) => (
            <ItemRow key={label} t={t} icon={icon}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span style={{ color: t.heading }}>{label}</span>
                <span
                  style={{
                    fontWeight: 400,
                    color: t.subText,
                    fontSize: "clamp(0.66rem, 1.3vw, 0.78rem)",
                  }}
                >
                  {value}
                </span>
              </div>
            </ItemRow>
          ))}
        </Panel>
      </div>
    </section>
  );
}
