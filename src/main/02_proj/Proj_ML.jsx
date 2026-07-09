import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaBrain,
  FaGithub,
  FaBookOpen,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaUserTie,
  FaLightbulb,
  FaTimes,
  FaDatabase,
} from "react-icons/fa";

// Drop your 6 exported chart images (class distribution, train/test split,
// heatmap, confusion matrix, accuracy comparison, per-class metrics) into
// src/assets/visualizations/phishing/ named so they sort in figure order
// (1_class-distribution.png, 2_train-test-split.png, etc.)
const vizModules = import.meta.glob(
  "../../assets/walkthrough/phishing/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const phishingViz = Object.keys(vizModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => vizModules[path].default);

// ── Project data ─────────────────────────────────────────────────
const phishingModel = [
  {
    id: 1,
    name: "Think Before You Click: Bernoulli Naive Bayes Phishing URL Detection",
    tags: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Bernoulli Naive Bayes",
      "Matplotlib",
      "Seaborn",
      "Data Science",
    ],
    metrics: [
      { label: "Training Accuracy", value: "97.45%" },
      { label: "Test Accuracy", value: "97.10%" },
      { label: "Generalization Gap", value: "0.35 pp" },
      { label: "Balanced Records", value: "10,000" },
    ],
    images: phishingViz,
    captions: [
      <>
        Figure 1: Class distribution: 5,000 legitimate vs 5,000 phishing URLs.
      </>,
      <>
        Figure 2: Class balance held across the 8,000/2,000 train-test split.
      </>,
      <>Figure 3: Feature correlation heatmap against the phishing label.</>,
      <>Figure 4: Confusion matrix on the 2,000-sample test set.</>,
      <>Figure 5: Training vs test accuracy comparison.</>,
      <>Figure 6: Precision, recall, and F1-score per class.</>,
    ],
    overview: (
      <>
        <strong>Phishing URL Detection:</strong> A Bernoulli Naive Bayes
        classifier trained on the PhiUSIIL Phishing URL Dataset, reduced from
        235,795 records to a stratified, class-balanced 10,000-record set. 17
        binarized URL and webpage-content features, HTTPS usage, form submission
        targets, subdomain count, and more, feed the model to classify a given
        URL as legitimate (0) or phishing (1).
      </>
    ),
    role: (
      <>
        I worked on the interpretation or the analytics of the model's
        performance and feature importance, and corrected the
        feature-interpretation logic behind the correlation heatmap for our
        final report and presentation.
      </>
    ),
    keyFindings: (
      <>
        Contrary to literature assumptions, <strong>HasSocialNet</strong> (r =
        0.79), <strong>HasCopyrightInfo</strong> (r = 0.76), and{" "}
        <strong>HasDescription</strong> (r = 0.71) were the strongest positive
        predictors of phishing, not legitimacy. Modern phishing pages
        deliberately mimic these "trust signal" elements to appear credible.
      </>
    ),
    githubUrl: "https://github.com/migeltan/phishing-url-detection", // TODO: replace with your repo link
    datasetUrl:
      "https://www.kaggle.com/datasets/hasibur013/url-data-for-phishing-website-detection/data",
    docUrl: null, // TODO: set to your paper PDF (e.g. imported asset) to enable "Read Paper"
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

function useInView(threshold = 0.1) {
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

function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
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
    mediaBg: dark ? "#11141c" : "#f3f4f6",
    chipBg: dark ? "#20232f" : "#f0f2f5",
    chipBorder: dark ? "#2a2d3a" : "#dddfe2",
    btnPrimaryBg: dark ? "#f0f2f8" : "#1c1e21",
    btnPrimaryText: dark ? "#1c1e21" : "#ffffff",
    btnSecondaryBg: dark ? "#1a1d27" : "#ffffff",
    btnSecondaryBorder: dark ? "#3a3f55" : "#dddfe2",
    frameBorder: dark ? "#3d4256" : "#c7cbd6",
    frameShadow: dark
      ? "0 6px 20px rgba(0,0,0,0.5)"
      : "0 6px 20px rgba(0,0,0,0.12)",
    calloutBg: dark ? "#171a24" : "#f7f8fa",
    calloutBorder: dark ? "#2a2d3a" : "#e9eaee",
    statBg: dark ? "#171a24" : "#f7f8fa",
    statBorder: dark ? "#2a2d3a" : "#e9eaee",
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

// ── Metrics hero — replaces the live-app embed for this project ──
function MetricsHero({ metrics, t }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
        gap: "10px",
      }}
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          style={{
            borderRadius: "8px",
            border: `1px solid ${t.statBorder}`,
            background: t.statBg,
            padding: "16px 10px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px 0",
              fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)",
              fontWeight: 800,
              color: t.heading,
            }}
          >
            {m.value}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "0.68rem",
              fontWeight: 600,
              color: t.subText,
              lineHeight: 1.3,
            }}
          >
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Visualization stepper — same crossfade pattern as the walkthroughs ─
function VizStepper({ images, captions = [], t, stretch = false }) {
  const n = images.length;
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    if (n <= 1) return;
    const interval = setInterval(() => {
      if (!pausedRef.current) setCurrent((c) => (c + 1) % n);
    }, 4500);
    return () => clearInterval(interval);
  }, [n]);

  const pause = (duration = 3500) => {
    pausedRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, duration);
  };

  const goTo = (i) => setCurrent(((i % n) + n) % n);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const arrowStyle = (side) => ({
    position: "absolute",
    [side]: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    zIndex: 2,
  });

  if (n === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: stretch ? "100%" : "auto",
          aspectRatio: stretch ? undefined : "4 / 3",
          minHeight: stretch ? 260 : undefined,
          borderRadius: "8px",
          border: `1px dashed ${t.frameBorder}`,
          background: t.mediaBg,
          color: t.subText,
          fontSize: "0.8rem",
          fontWeight: 600,
          textAlign: "center",
          padding: "16px",
        }}
      >
        Visualization exports coming soon
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: stretch ? "100%" : "auto",
      }}
    >
      <div
        onClick={() => setLightboxOpen(true)}
        style={{
          position: "relative",
          width: "100%",
          ...(stretch ? { flex: 1, minHeight: 0 } : { aspectRatio: "4 / 3" }),
          borderRadius: "8px",
          overflow: "hidden",
          border: `1px solid ${t.frameBorder}`,
          boxShadow: t.frameShadow,
          background: t.mediaBg,
          cursor: "zoom-in",
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Figure ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: t.cardBg,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "3px 9px",
            borderRadius: "20px",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: "0.68rem",
            fontWeight: 600,
            zIndex: 2,
          }}
        >
          {current + 1} / {n}
        </div>

        {n > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                pause();
                prev();
              }}
              aria-label="Previous figure"
              style={arrowStyle("left")}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                pause();
                next();
              }}
              aria-label="Next figure"
              style={arrowStyle("right")}
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {captions[current] && (
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            lineHeight: 1.5,
            color: t.subText,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {captions[current]}
        </p>
      )}

      {n > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                pause();
                goTo(i);
              }}
              aria-label={`Go to figure ${i + 1}`}
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                background: i === current ? t.heading : t.cardBorder,
                transition: "width 0.25s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>
      )}

      {lightboxOpen &&
        createPortal(
          <div
            onClick={() => setLightboxOpen(false)}
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
            <img
              src={images[current]}
              alt="Figure expanded"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw",
                maxHeight: "88vh",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

function PdfPreviewModal({ pdfUrl, onClose, t }) {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "2rem 1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 100%)",
          height: "100%",
          maxHeight: "88vh",
          background: t.cardBg,
          borderRadius: "10px",
          overflow: "hidden",
          border: `1px solid ${t.frameBorder}`,
          boxShadow: t.frameShadow,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderBottom: `1px solid ${t.titleBarBorder}`,
            background: t.titleBarBg,
          }}
        >
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: t.heading,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaBookOpen /> Full Paper
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: t.subText,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FaExternalLinkAlt /> Open raw file
            </a>
            <button
              onClick={onClose}
              aria-label="Close paper preview"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: t.chipBg,
                color: t.heading,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <iframe
          src={pdfUrl}
          title="Paper preview"
          style={{ flex: 1, width: "100%", border: "none" }}
        />
      </div>
    </div>,
    document.body,
  );
}

function ActionButton({ href, onClick, icon: Icon, label, variant, t }) {
  const [hovered, setHovered] = useState(false);
  const primary = variant === "primary";

  const sharedStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    border: primary
      ? `1px solid ${t.btnPrimaryBg}`
      : `1px solid ${t.btnSecondaryBorder}`,
    background: primary ? t.btnPrimaryBg : t.btnSecondaryBg,
    color: primary ? t.btnPrimaryText : t.heading,
    transform: hovered ? "translateY(-2px)" : "translateY(0px)",
    boxShadow: hovered ? t.shadowHover : "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={sharedStyle}
      >
        <Icon style={{ fontSize: "0.95rem" }} />
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={sharedStyle}
    >
      <Icon style={{ fontSize: "0.95rem" }} />
      {label}
    </a>
  );
}

function ExamPanel({
  name,
  tags = [],
  metrics = [],
  images,
  captions,
  overview,
  role,
  keyFindings,
  githubUrl,
  datasetUrl,
  docUrl,
  t,
}) {
  const [hovered, setHovered] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const isMobile = useIsMobile(720);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "10px",
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        overflow: "hidden",
        boxShadow: hovered ? t.shadowHover : t.shadowRest,
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        width: "100%",
      }}
    >
      <div
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
          style={{
            margin: 0,
            color: t.heading,
            fontSize: "1.05rem",
            fontWeight: 700,
          }}
        >
          {name}
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "18px",
          gap: "18px",
        }}
      >
        <MetricsHero metrics={metrics} t={t} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
            gap: "22px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "20px",
                      background: t.chipBg,
                      border: `1px solid ${t.chipBorder}`,
                      color: t.subText,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {overview && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: t.calloutBg,
                  border: `1px solid ${t.calloutBorder}`,
                }}
              >
                <FaInfoCircle
                  style={{
                    fontSize: "0.95rem",
                    color: t.heading,
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 3px 0",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: t.heading,
                    }}
                  >
                    Overview
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      lineHeight: 1.75,
                      color: t.subText,
                    }}
                  >
                    {overview}
                  </p>
                </div>
              </div>
            )}

            {role && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: t.calloutBg,
                  border: `1px solid ${t.calloutBorder}`,
                }}
              >
                <FaUserTie
                  style={{
                    fontSize: "0.95rem",
                    color: t.heading,
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 3px 0",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: t.heading,
                    }}
                  >
                    My Role
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      color: t.subText,
                    }}
                  >
                    {role}
                  </p>
                </div>
              </div>
            )}

            {keyFindings && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: t.calloutBg,
                  border: `1px solid ${t.calloutBorder}`,
                }}
              >
                <FaLightbulb
                  style={{
                    fontSize: "0.95rem",
                    color: t.heading,
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 3px 0",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: t.heading,
                    }}
                  >
                    Key Finding
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      color: t.subText,
                    }}
                  >
                    {keyFindings}
                  </p>
                </div>
              </div>
            )}
          </div>

          <VizStepper
            images={images}
            captions={captions}
            t={t}
            stretch={!isMobile}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <ActionButton
            href={githubUrl}
            icon={FaGithub}
            label="View Code"
            variant="primary"
            t={t}
          />
          {docUrl && (
            <ActionButton
              onClick={() => setPdfOpen(true)}
              icon={FaBookOpen}
              label="Read Paper"
              variant="secondary"
              t={t}
            />
          )}
          {datasetUrl && (
            <ActionButton
              href={datasetUrl}
              icon={FaDatabase}
              label="View Dataset"
              variant="secondary"
              t={t}
            />
          )}
        </div>
      </div>

      {pdfOpen && (
        <PdfPreviewModal
          pdfUrl={docUrl}
          onClose={() => setPdfOpen(false)}
          t={t}
        />
      )}
    </div>
  );
}

export default function PhishingML({ sectionRef, onCountChange }) {
  const dark = useTheme();
  const t = tk(dark);
  const [revealRef, inView] = useInView(0.1);

  useEffect(() => {
    onCountChange?.(phishingModel.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto"
      style={{ height: "100%" }}
    >
      <div
        ref={revealRef}
        className="card act-wrapper"
        style={{
          background: t.cardBg,
          height: "100%",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0px)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
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
          <FaBrain style={{ fontSize: "1.3rem", color: t.heading }} />
          <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
            Project #4: Machine Learning using Python!
          </h2>
        </div>
        <div style={{ width: "100%", padding: "16px" }}>
          {phishingModel.map((exam) => (
            <ExamPanel key={exam.id} {...exam} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
