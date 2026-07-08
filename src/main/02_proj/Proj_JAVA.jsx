import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaJava,
  FaGithub,
  FaBookOpen,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaUserTie,
  FaRoute,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import act1 from "../../images/multimedia/img4.jpg";
import docu from "../../assets/documentation/pagconnect.pdf";

const walkthroughModules = import.meta.glob(
  "../../assets/walkthrough/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const pagConnectWalkthrough = Object.keys(walkthroughModules)
  .sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true }), // so 2.png comes before 10.png
  )
  .map((path) => walkthroughModules[path].default);

// ── Project data ─────────────────────────────────────────────────
// video: set to a YouTube embed URL (https://www.youtube.com/embed/XXXX)
// or a direct .mp4 URL once you have a demo recorded. Leave as null to
// show the "coming soon" placeholder over the poster image instead.
// images: add every walkthrough screenshot here, in the order you want
// them stepped through. captions are optional and line up by index.
const javasql = [
  {
    id: 1,
    name: "Pag-CONNECT: A Digital Registration System of Pag-IBIG Membership Fund using Java",
    tags: ["Java", "Swing", "MySQL", "CRUD"],
    video: null, // TODO: add a demo video URL
    poster: pagConnectWalkthrough[0],
    images: pagConnectWalkthrough,
    captions: [<strong>Pag-CONNECT Photo Walkthrough</strong>],
    overview: (
      <>
        <strong>Pag-CONNECT:</strong> A database-driven membership registration
        platform inspired by the Pag-IBIG Member's Data Form (MDF). Developed
        using Java Swing and MySQL, the system streamlines applicant onboarding
        through modular registration forms, secure member authentication,
        profile management, employment tracking, and an administrative dashboard
        for efficient record maintenance. The project demonstrates practical
        applications of relational database design, CRUD operations, and
        full-stack software development.
      </>
    ),
    role: (
      <>
        Lead Developer and Database Designer. I was responsible for designing
        the database schema together with my team, and integrating MySQL for
        data storage and retrieval. I also ensured that the system adhered to
        best practices in software development and user experience.
      </>
    ),
    walkthroughNote: (
      <>
        The first image in the walkthrough shows the login screen, followed by
        the modular dashboard, then the modules that the applicant needs to fill
        out. Then, we can see the administrative dashboard. Each step
        demonstrates the system's functionality and user interface.
      </>
    ),
    githubUrl: "https://github.com/migeltan/Pag-IBIG-OOP.git", // TODO: replace with your repo link
    docUrl: docu, // TODO: set a documentation link, or leave null to hide the button
    jarUrl:
      "https://github.com/migeltan/Pag-IBIG-OOP/releases/download/java-project/pagibigapp.jar",
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
    // Stronger frame borders/shadows so media panels read as distinct
    // contained "device frames" rather than blending into the card bg.
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

// ── Video demo slot ──────────────────────────────────────────────
// Full panel width, height controlled by the aspect-ratio. The stronger
// frame border/shadow keeps it reading as a contained panel.
function VideoDemo({ video, poster, t }) {
  const isYouTube = video && /youtube\.com|youtu\.be/.test(video);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${t.frameBorder}`,
        boxShadow: t.frameShadow,
        background: t.mediaBg,
      }}
    >
      {video ? (
        isYouTube ? (
          <iframe
            src={video}
            title="Project demo video"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            controls
            poster={poster}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={video} />
          </video>
        )
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
                fontSize: "1.1rem",
              }}
            >
              <FaPlay style={{ marginLeft: "3px" }} />
            </div>
            <span
              style={{
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 600,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              Video demo coming soon
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Walkthrough stepper — crossfades between screenshots, no flips ─
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
// Opens the documentation PDF inline via an <iframe>, mirroring the
// image lightbox pattern, so it always renders regardless of what the
// visitor's browser would otherwise do with a raw PDF link.
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
              <FaDownload /> Open raw file
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

function ActionButton({
  href,
  onClick,
  icon: Icon,
  label,
  variant,
  t,
  download,
}) {
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

  // Buttons that trigger an in-page action (like the PDF preview modal)
  // render as <button>; everything else stays a real link.
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
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
      download={download}
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
  video,
  poster,
  images,
  captions,
  overview,
  role,
  walkthroughNote,
  githubUrl,
  docUrl,
  jarUrl,
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
        <VideoDemo video={video} poster={poster} t={t} />

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

            {walkthroughNote && (
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
                <FaRoute
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
                    Reading the Walkthrough
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      color: t.subText,
                    }}
                  >
                    {walkthroughNote}
                  </p>
                </div>
              </div>
            )}
          </div>

          <WalkthroughStepper
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
              label="Documentation"
              variant="secondary"
              t={t}
            />
          )}
          {jarUrl && (
            <ActionButton
              href={jarUrl}
              icon={FaDownload}
              label="Download .jar"
              variant="secondary"
              t={t}
              download="PagConnect.jar"
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

export default function JavaSQL({ sectionRef, onCountChange }) {
  const dark = useTheme();
  const t = tk(dark);
  const [revealRef, inView] = useInView(0.1);

  useEffect(() => {
    onCountChange?.(javasql.length);
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
          <FaJava style={{ fontSize: "1.3rem", color: t.heading }} />
          <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
            Project #1: Java with MySQL Database!
          </h2>
        </div>
        <div style={{ width: "100%", padding: "16px" }}>
          {javasql.map((exam) => (
            <ExamPanel key={exam.id} {...exam} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
