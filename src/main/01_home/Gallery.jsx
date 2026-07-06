import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaRegImage } from "react-icons/fa";

import img1 from "../../images/multimedia/img1.jpg";
import img2 from "../../images/multimedia/img2.jpg";
import img3 from "../../images/multimedia/img3.jpg";
import img4 from "../../images/multimedia/img4.jpg";
import img5 from "../../images/multimedia/img5.jpg";
import img6 from "../../images/multimedia/img6.jpg";
import img7 from "../../images/multimedia/img7.jpg";
import img8 from "../../images/multimedia/img8.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];
const galleryImages = [...images, ...images];

// ── Lightbox — rendered via Portal directly into document.body ─
function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);

    const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        // Lock body scroll while lightbox is open
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, prev, next]);

    return createPortal(
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.88)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 99999,
                padding: "1rem",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative", maxWidth: "900px", width: "100%",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute", top: "-40px", right: 0,
                        background: "none", border: "none", color: "#fff",
                        fontSize: "28px", cursor: "pointer", opacity: 0.7,
                    }}
                >✕</button>

                {/* Counter */}
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                    {current + 1} / {images.length}
                </p>

                {/* Image + arrows */}
                <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button
                        onClick={prev}
                        style={{
                            position: "absolute", left: "-20px", zIndex: 10,
                            background: "rgba(0,0,0,0.5)", border: "none", color: "#fff",
                            borderRadius: "50%", width: "40px", height: "40px",
                            fontSize: "22px", cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                        }}
                    >‹</button>

                    <img
                        key={current}
                        src={images[current]}
                        alt={`Gallery ${current + 1}`}
                        style={{
                            width: "100%", maxHeight: "80vh",
                            objectFit: "contain", borderRadius: "10px",
                        }}
                    />

                    <button
                        onClick={next}
                        style={{
                            position: "absolute", right: "-20px", zIndex: 10,
                            background: "rgba(0,0,0,0.5)", border: "none", color: "#fff",
                            borderRadius: "50%", width: "40px", height: "40px",
                            fontSize: "22px", cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                        }}
                    >›</button>
                </div>

                {/* Dots */}
                <div style={{ display: "flex", gap: "8px" }}>
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            style={{
                                width: "8px", height: "8px", borderRadius: "50%", border: "none",
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
        document.body  // ← renders outside all parent containers
    );
}

// ── Gallery ────────────────────────────────────────────────────
export default function Gallery() {
    const galleryRef = useRef(null);
    const animRef = useRef(null);
    const scrollRef = useRef(0);
    const pausedRef = useRef(false);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartScroll = useRef(0);
    const didDrag = useRef(false);

    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const slider = galleryRef.current;
        if (!slider) return;

        const autoScroll = () => {
            if (!pausedRef.current && !isDragging.current) {
                slider.scrollLeft += 1;
                scrollRef.current += 1;
                if (scrollRef.current >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                    scrollRef.current = 0;
                }
            }
            animRef.current = requestAnimationFrame(autoScroll);
        };

        animRef.current = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    const onMouseDown = (e) => {
        isDragging.current = true;
        didDrag.current = false;
        dragStartX.current = e.clientX;
        dragStartScroll.current = galleryRef.current.scrollLeft;
        galleryRef.current.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        const delta = dragStartX.current - e.clientX;
        if (Math.abs(delta) > 5) didDrag.current = true;
        galleryRef.current.scrollLeft = dragStartScroll.current + delta;
        scrollRef.current = galleryRef.current.scrollLeft;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (galleryRef.current) galleryRef.current.style.cursor = "grab";
    };

    const handleImageClick = (index) => {
        if (didDrag.current) return;
        setLightbox({ index: index % images.length });
    };

    return (
        <section className="card connect-container gallery-section w-full">
            <h2 className="section-title">
                <FaRegImage className="icon" /> Information Technology Life @PUP!
            </h2>

            {lightbox && (
                <Lightbox
                    images={images}
                    startIndex={lightbox.index}
                    onClose={() => setLightbox(null)}
                />
            )}

            <div
                className="gallery-scroll"
                ref={galleryRef}
                style={{ cursor: "grab", userSelect: "none" }}
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => {
                    pausedRef.current = false;
                    isDragging.current = false;
                    if (galleryRef.current) galleryRef.current.style.cursor = "grab";
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                {galleryImages.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        className="gallery-img"
                        alt="Gallery Image"
                        draggable={false}
                        onClick={() => handleImageClick(i)}
                        style={{ cursor: "pointer" }}
                    />
                ))}
            </div>
        </section>
    );
}