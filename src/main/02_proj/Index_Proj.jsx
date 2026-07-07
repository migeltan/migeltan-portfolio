import { useState, useRef, useEffect } from "react";
import { AiOutlineCode, AiOutlineAppstore } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { MdEmojiEvents } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import JavaSQL from "./Proj_JAVA";
import PUPEase from "./Proj_UI";
import KwageeHackathon from "./Proj_KWAGEE";
import MachineLearning from "./Proj_ML";

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
    heading: dark ? "#f0f2f8" : "#1c1e21",
    subText: dark ? "#c8cfe0" : "#374151",
    sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
    cardBg: dark ? "#1a1d27" : "#ffffff",
    cardBorder: dark ? "#2a2d3a" : "#e5e7eb",
    iconBg: dark ? "#20232f" : "#f9fafb",
    iconBorder: dark ? "#2a2d3a" : "#e5e7eb",
    shadowRest: dark
      ? "0 1px 6px rgba(0,0,0,0.5)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
  };
}

function CategoryCard({ icon: Icon, label, onClick, t }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{
        cursor: "pointer",
        borderRadius: "10px",
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        overflow: "hidden",
        boxShadow: hovered ? t.shadowHover : t.shadowRest,
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        padding: "22px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "12px",
          background: t.iconBg,
          border: `1px solid ${t.iconBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          color: t.heading,
          transform: hovered
            ? "scale(1.12) rotate(-4deg)"
            : "scale(1) rotate(0deg)",
          transition: "transform 0.25s ease",
        }}
      >
        <Icon />
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: "0.95rem",
          fontWeight: 700,
          color: t.heading,
        }}
      >
        {label}
      </h3>

      <span
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: hovered ? t.heading : t.subText,
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          transition: "color 0.2s ease",
        }}
      >
        View project
        <FaArrowRight
          style={{
            fontSize: "0.65rem",
            transform: hovered ? "translateX(3px)" : "translateX(0px)",
            transition: "transform 0.2s ease",
          }}
        />
      </span>
    </div>
  );
}

export default function projectIndex({ scrollTo: scrollToProp }) {
  const dark = useTheme();
  const t = tk(dark);
  const [selectedImage, setSelectedImage] = useState(null);
  const [counts, setCounts] = useState({
    javasql: 0,
    pupease: 0,
    kwagee: 0,
    modelpy: 0,
  });

  const javasqlRef = useRef(null);
  const pupeaseRef = useRef(null);
  const kwageeRef = useRef(null);
  const modelpyRef = useRef(null);

  const refMap = {
    javasql: javasqlRef,
    pupease: pupeaseRef,
    kwagee: kwageeRef,
    modelpy: modelpyRef,
  };

  useEffect(() => {
    if (scrollToProp && refMap[scrollToProp]) {
      setTimeout(() => {
        refMap[scrollToProp].current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToProp]);

  const summaryCards = [
    {
      label: "Programming Project",
      hash: "javasql",
      icon: AiOutlineCode,
    },
    {
      label: "UI Project",
      hash: "pupease",
      icon: BsLayoutTextSidebarReverse,
    },
    {
      label: "Hackathon Project",
      hash: "kwagee",
      icon: MdEmojiEvents,
    },
    {
      label: "Machine Learning",
      hash: "modelpy",
      icon: GiBrain,
    },
  ];

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Summary */}
      <section className="w-full h-auto">
        <div className="card">
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
            <AiOutlineAppstore
              style={{ fontSize: "1.2rem", color: t.heading }}
            />
            <h2
              className="section-title"
              style={{ margin: 0, color: t.heading }}
            >
              Summary of Projects!
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryCards.map((item) => (
              <CategoryCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => scrollTo(refMap[item.hash])}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      <JavaSQL
        sectionRef={javasqlRef}
        onImageClick={setSelectedImage}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, javasql: count }))
        }
      />

      <PUPEase
        sectionRef={pupeaseRef}
        onImageClick={setSelectedImage}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, pupease: count }))
        }
      />

      {/* Kwagee */}
      <KwageeHackathon
        sectionRef={kwageeRef}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, kwagee: count }))
        }
      />

      {/* EXAMS */}
      <MachineLearning
        sectionRef={modelpyRef}
        onImageClick={setSelectedImage}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, modelpy: count }))
        }
      />
    </>
  );
}
