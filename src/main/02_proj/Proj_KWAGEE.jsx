import { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";
import act1 from "../../images/multimedia/img4.jpg";

const kwagee = [
  {
    id: 1,
    image: act1,
    name: "Kwagee: Stellar Blockchain Wallet for Remote Workers using React Native and Node.js",
    description: (
      <>
        <strong>Stellar Blockchain Wallet:</strong> A Stellar-powered payroll
        and on-chain budgeting platform built for Filipino freelancers and
        remote workers — settling international payments in seconds, converting
        funds transparently, and automatically distributing them across
        customizable budget wallets for rent, bills, taxes, SSS, and PhilHealth.
        With XLM as the base currency, Kwagee enables users to receive payments
        from anywhere in the world, convert them to local currency, and manage
        their finances efficiently.
      </>
    ),
  },
];

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
    cardBg: dark ? "#1a1d27" : "#ffffff",
    cardBorder: dark ? "#2a2d3a" : "#e5e7eb",
    titleBarBg: dark ? "#13151f" : "#fafafa",
    titleBarBorder: dark ? "#2a2d3a" : "#f0f0f0",
    sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
    heading: dark ? "#f0f2f8" : "#1c1e21",
    subText: dark ? "#c8cfe0" : "#374151",
    btnBorder: dark ? "#3a3f55" : "#111111",
    shadowRest: dark
      ? "0 1px 6px rgba(0,0,0,0.5)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    shadowHover: dark
      ? "0 14px 28px rgba(0,0,0,0.55)"
      : "0 14px 28px rgba(0,0,0,0.14)",
  };
}

const TrafficLights = () => (
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
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#ff5f57",
        display: "inline-block",
      }}
    />
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#febc2e",
        display: "inline-block",
      }}
    />
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#28c840",
        display: "inline-block",
      }}
    />
  </span>
);

function CoverImage({ image, t }) {
  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        borderRadius: "6px",
        overflow: "hidden",
        border: `1px solid ${t.btnBorder}`,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

function ExamPanel({ name, image, description, t }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="act-panel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        boxShadow: hovered ? t.shadowHover : t.shadowRest,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        width: "100%",
      }}
    >
      <div
        className="act-panel__titlebar"
        style={{
          borderBottom: `1px solid ${t.titleBarBorder}`,
          background: t.titleBarBg,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TrafficLights />
        <h3
          className="act-panel__name"
          style={{ color: t.heading, fontSize: "1.05rem", fontWeight: 700 }}
        >
          {name}
        </h3>
      </div>

      <div
        className="act-panel__body"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "12px",
        }}
      >
        <CoverImage image={image} t={t} />
        {description && (
          <p
            className="act-panel__desc"
            style={{
              color: t.subText,
              margin: 0,
              fontSize: "0.8rem",
              lineHeight: "1.75",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function KwageeHackathon({ sectionRef, onCountChange }) {
  const dark = useTheme();
  const t = tk(dark);

  useEffect(() => {
    onCountChange?.(kwagee.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto"
      style={{ height: "100%" }}
    >
      <div
        className="card act-wrapper"
        style={{ background: t.cardBg, height: "100%" }}
      >
        <div
          className="act-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: `1px solid ${t.sectionDivider}`,
            justifyContent: "flex-start",
          }}
        >
          <FaReact style={{ fontSize: "1.3rem", color: t.heading }} />
          <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
            Project #3: Stellar Blockchain: XLM Cryptocurrency
          </h2>
        </div>
        <div style={{ width: "100%", padding: "16px 16px 16px 16px" }}>
          {kwagee.map((exam) => (
            <ExamPanel key={exam.id} {...exam} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
