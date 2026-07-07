import { useState, useEffect, useRef } from "react";
import { MdOutlineDashboard, MdOutlineWorkspacePremium } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

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
    heading: dark ? "#f0f2f8" : "#1c1e21",
    subText: dark ? "#c8cfe0" : "#374151",
    sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
    cardBg: dark ? "#1a1d27" : "#ffffff",
    cardBorder: dark ? "#2a2d3a" : "#e5e7eb",
    iconBg: dark ? "#20232f" : "#f9fafb",
    iconBorder: dark ? "#2a2d3a" : "#e5e7eb",
    tagBg: dark ? "#20232f" : "#f0f2f5",
    tagBorder: dark ? "#2a2d3a" : "#dddfe2",
    tagText: dark ? "#c8cfe0" : "#374151",
    shadowRest: dark
      ? "0 1px 6px rgba(0,0,0,0.5)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
  };
}

const certificates = [
  {
    href: "https://github.com/migeltan/COBOL-Practices",
    title: "Data Collection and Annotation NC II",
    desc: "A TESDA certificate of completion for the Data Collection and Annotation NC II course. This course covers the fundamentals of data collection, annotation techniques, and best practices in data management. Accumulated 224 hours of training and successfully completed the required assessments.",
    tag: "TESDA Certificate",
  },
  {
    href: "https://github.com/migeltan/Java-OOP",
    title: "Programming (Java) NC III",
    desc: "A TESDA certificate of completion for the Programming (Java) NC III course. This course covers the fundamentals of Java programming, object-oriented programming concepts, and software development best practices.",
    tag: "TESDA Certificate",
  },
  {
    href: "https://github.com/migeltan/Pag-IBIG-Project",
    title: "DataCamp: Intermediate Python and SQL for Data Science",
    desc: "A DataCamp certificate of completion for the Intermediate Python and SQL for Data Science course. This course covers advanced Python programming techniques, data manipulation, and SQL querying for data analysis. Accumulated 8 hours of self-paced learning and successfully completed the required assessments.",
    tag: "DataCamp Certificate",
  },
  {
    href: "https://github.com/migeltan/C-Practices",
    title: "Cisco Networking Academy: Networking Basics",
    desc: "A Cisco Networking Academy certificate of completion for the Networking Basics course. This course covers the fundamentals of networking, including network protocols, IP addressing, and network troubleshooting. Accumulated 15 hours of self-paced learning and successfully completed the required assessments.",
    tag: "Cisco Networking Academy Certificate",
  },
];

function CertificateCard({ certificate, t, delay, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={certificate.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "18px 20px",
        borderRadius: "12px",
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        boxShadow: hovered ? t.shadowHover : t.shadowRest,
        transform: inView
          ? hovered
            ? "translateY(-5px)"
            : "translateY(0px)"
          : "translateY(24px)",
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div
          style={{
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: "10px",
            background: t.iconBg,
            border: `1px solid ${t.iconBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            color: t.heading,
            transform: hovered
              ? "scale(1.1) rotate(-4deg)"
              : "scale(1) rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <MdOutlineWorkspacePremium />
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: "0.98rem",
            fontWeight: 700,
            lineHeight: 1.35,
            color: t.heading,
          }}
        >
          {certificate.title}
        </h3>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "0.82rem",
          lineHeight: 1.6,
          color: t.subText,
        }}
      >
        {certificate.desc}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "2px",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            padding: "5px 10px",
            borderRadius: "8px",
            background: t.tagBg,
            border: `1px solid ${t.tagBorder}`,
            color: t.tagText,
          }}
        >
          {certificate.tag}
        </span>

        <span
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: hovered ? t.heading : t.subText,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease",
          }}
        >
          View credential
          <FaArrowRight
            style={{
              fontSize: "0.65rem",
              transform: hovered ? "translateX(3px)" : "translateX(0px)",
              transition: "transform 0.2s ease",
            }}
          />
        </span>
      </div>
    </a>
  );
}

export default function RecentCertificates() {
  const dark = useTheme();
  const t = tk(dark);
  const [sectionRef, inView] = useInView(0.1);

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
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingBottom: "16px",
          borderBottom: `1px solid ${t.sectionDivider}`,
          marginBottom: "18px",
        }}
      >
        <MdOutlineDashboard style={{ fontSize: "1.2rem", color: t.heading }} />
        <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
          Recent Certificates
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {certificates.map((certificate, i) => (
          <CertificateCard
            key={certificate.title}
            certificate={certificate}
            t={t}
            delay={0.05 + i * 0.08}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
