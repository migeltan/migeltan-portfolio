import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaFigma,
  FaExternalLinkAlt,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaUserTie,
  FaRoute,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import act1 from "../../images/multimedia/img4.jpg";

// ── Project data ─────────────────────────────────────────────────
// prototypeUrl: paste your Figma "Share > Prototype" link here (a
// normal https://www.figma.com/proto/... link is fine — it gets
// auto-wrapped into an embeddable URL below; an already-embeddable
// embed.figma.com link is used as-is). Leave null to show the "Live
// prototype coming soon" placeholder instead.
// images: walkthrough screenshots, in the order you want them stepped
// through. Currently just the placeholder — swap in real exported
// frames whenever you have them. captions are optional and line up
// by index.
// figmaUrl / docUrl: leave null to hide those buttons until you have
// links ready.
const pupease = [
  {
    id: 1,
    name: "PUP-Ease: UI/UX for the Online Document Request System of Polytechnic University of the Philippines using Figma",
    tags: ["Figma", "UI/UX", "Prototyping", "HCI"],
    prototypeUrl:
      "https://embed.figma.com/proto/OmIi8f8BeI9BgsvJtHu2LP/HCI---PUP-ODRS?node-id=1-3&starting-point-node-id=1%3A3&embed-host=share",
    poster: act1,
    images: [act1], // TODO: replace with real walkthrough screenshots
    captions: [<strong>PUP-Ease Photo Walkthrough</strong>],
    overview: (
      <>
        <strong>PUP-Ease:</strong> A user interface and user experience design
        for the Online Document Request System (ODRS) of the Polytechnic
        University of the Philippines. Applying principles from Human-Computer
        Interaction, our team redesigned a more intuitive, user-friendly
        interface for the existing ODRS platform, prototyped end-to-end in
        Figma.
      </>
    ),
    role: (
      <>
        This was a group project. For the Figma components, I took the lead in
        designing the login, registration, and dashboard screens, translating
        our HCI research into a cohesive, interactive prototype.
      </>
    ),
    prototypeNote: (
      <>
        The prototype opens on the PUP-Ease splash screen — tap{" "}
        <strong>Get Started</strong> to move into the login flow, then continue
        through registration and on into the dashboard to see how the
        document-request modules connect together.
      </>
    ),
    figmaUrl: null, // TODO: set a "View in Figma" link, or leave null to hide the button
    docUrl: null, // TODO: set a documentation link, or leave null to hide the button
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

// Fires once, the first time the element scrolls into view.
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

// ── Live Figma prototype slot ────────────────────────────────────
// Desktop: a moderate portrait aspect ratio (not the full 9:16 a real
// phone would be) so it reads as a nicely sized preview rather than
// dominating the whole column — leaves room for the walkthrough
// photos underneath the boxes on the other side.
// Mobile: bleeds full-width edge-to-edge with no border/shadow/box —
// reads like a real device screen instead of a boxed thumbnail.
function FigmaPrototypeEmbed({ prototypeUrl, poster, t, isMobile }) {
  const embedSrc = prototypeUrl
    ? prototypeUrl.includes("figma.com/embed") ||
      prototypeUrl.includes("embed.figma.com")
      ? prototypeUrl
      : `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
          prototypeUrl,
        )}`
    : null;

  const frameStyle = isMobile
    ? {
        position: "relative",
        width: "calc(100% + 36px)",
        marginLeft: "-18px",
        marginRight: "-18px",
        aspectRatio: "9 / 17",
        overflow: "hidden",
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        background: t.mediaBg,
      }
    : {
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${t.frameBorder}`,
        boxShadow: t.frameShadow,
        background: t.mediaBg,
      };

  return (
    <div style={frameStyle}>
      {embedSrc ? (
        <iframe
          src={embedSrc}
          title="Figma live prototype"
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        />
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: poster ? `url(${poster})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: poster ? "grayscale(35%)" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10,12,18,0.55)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.3rem",
              }}
            >
              <FaFigma />
            </div>
            <span
              style={{
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 600,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              Live prototype coming soon
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Walkthrough stepper — crossfades between screenshots, no flips ─
// Sits beneath the description boxes and, when `stretch` is on, grows
// to fill whatever height is left over next to the prototype column.
function WalkthroughStepper({ images, captions = [], t, stretch = false }) {
  const n = images.length;
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    if (n <= 1) return;
    const interval = setInterval(() => {
      if (!pausedRef.current) setCurrent((c) => (c + 1) % n);
    }, 4000);
    return () => clearInterval(interval);
  }, [n]);

  const pause = (duration = 3000) => {
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
        ...(stretch ? { flex: "1 1 200px", minHeight: 0 } : {}),
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
            alt={`Walkthrough step ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
              aria-label="Previous step"
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
              aria-label="Next step"
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
              aria-label={`Go to step ${i + 1}`}
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
              alt="Walkthrough expanded"
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

// ── Inline PDF preview modal ─────────────────────────────────────
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
            <FaBookOpen /> Documentation
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
              aria-label="Close documentation preview"
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
          title="Documentation preview"
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
  prototypeUrl,
  poster,
  images,
  captions,
  overview,
  role,
  prototypeNote,
  figmaUrl,
  docUrl,
  t,
}) {
  const [hovered, setHovered] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const isMobile = useIsMobile(720);

  const CalloutBox = ({ icon: Icon, label, children }) => (
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
      <Icon
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
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: t.subText,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );

  const buttonsRow = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {figmaUrl && (
        <ActionButton
          href={figmaUrl}
          icon={FaFigma}
          label="View in Figma"
          variant="primary"
          t={t}
        />
      )}
      {docUrl && (
        <ActionButton
          onClick={() => setPdfOpen(true)}
          icon={FaBookOpen}
          label="Documentation"
          variant="secondary"
          t={t}
        />
      )}
      {prototypeUrl && (
        <ActionButton
          href={prototypeUrl}
          icon={FaExternalLinkAlt}
          label="Open Full Prototype"
          variant="secondary"
          t={t}
        />
      )}
    </div>
  );

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: "22px",
            alignItems: "stretch",
          }}
        >
          {/* Left: live prototype + tags */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <FigmaPrototypeEmbed
              prototypeUrl={prototypeUrl}
              poster={poster}
              t={t}
              isMobile={isMobile}
            />

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
          </div>

          {/* Right: description callouts + walkthrough photos */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {overview && (
              <CalloutBox icon={FaInfoCircle} label="Overview">
                {overview}
              </CalloutBox>
            )}
            {role && (
              <CalloutBox icon={FaUserTie} label="My Role">
                {role}
              </CalloutBox>
            )}
            {prototypeNote && (
              <CalloutBox icon={FaRoute} label="Exploring the Prototype">
                {prototypeNote}
              </CalloutBox>
            )}

            {images?.length > 0 && (
              <WalkthroughStepper
                images={images}
                captions={captions}
                t={t}
                stretch={!isMobile}
              />
            )}
          </div>
        </div>

        {buttonsRow}
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

export default function PUPEase({ sectionRef, onCountChange }) {
  const dark = useTheme();
  const t = tk(dark);
  const [revealRef, inView] = useInView(0.1);

  useEffect(() => {
    onCountChange?.(pupease.length);
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
          <FaFigma style={{ fontSize: "1.3rem", color: t.heading }} />
          <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
            Project #2: UI/UX Using Figma
          </h2>
        </div>
        <div style={{ width: "100%", padding: "16px" }}>
          {pupease.map((exam) => (
            <ExamPanel key={exam.id} {...exam} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
