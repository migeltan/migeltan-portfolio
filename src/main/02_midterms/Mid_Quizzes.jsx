import { useEffect, useState } from "react";
import act1 from "../../images/mid_qse/img1.jpg";

const quizzes = [
    {
        id: 1,
        image: act1,
        name: "Quiz #1",
        description: <><strong>Reflection:</strong> For our first quiz, it was about the first three lessons about Java. It was about the Introduction to Java, Program Structure of Java, then Operators of Java. I expected it to be a very hard quiz, and it was. Although I answered most of the questions, a doubt still lies within me if I actually got them right. Nonetheless, I hope I got a high score.</>,
    },
];

function useTheme() {
    const [dark, setDark] = useState(
        () => document.querySelector(".container")?.classList.contains("dark-mode") ?? false
    );
    useEffect(() => {
        const el = document.querySelector(".container");
        if (!el) return;
        const observer = new MutationObserver(() => setDark(el.classList.contains("dark-mode")));
        observer.observe(el, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);
    return dark;
}

function tk(dark) {
    return {
        cardBg:         dark ? "#1a1d27" : "#ffffff",
        cardBorder:     dark ? "#2a2d3a" : "#e5e7eb",
        titleBarBg:     dark ? "#13151f" : "#fafafa",
        titleBarBorder: dark ? "#2a2d3a" : "#f0f0f0",
        sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
        heading:        dark ? "#f0f2f8" : "#1c1e21",
        subText:        dark ? "#c8cfe0" : "#374151",
        mutedText:      dark ? "#5a6072" : "#111111",
        badgeBg:        dark ? "#f0f2f8" : "#1c1e21",
        badgeText:      dark ? "#1c1e21" : "#ffffff",
        pillBg:         dark ? "#1e2130" : "#f3f4f6",
        pillBorder:     dark ? "#2a2d3a" : "#e5e7eb",
        pillText:       dark ? "#9ba3b8" : "#9ca3af",
        btnBorder:      dark ? "#3a3f55" : "#111111",
        shadow:         dark ? "0 1px 6px rgba(0,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.06)",
        overlayBg:      dark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)",
        overlayBgHover: dark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.1)",
        overlayText:    "#ffffff",
    };
}

const TrafficLights = () => (
    <span style={{ display: "flex", gap: "5px", alignItems: "center", marginRight: "8px", flexShrink: 0 }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
    </span>
);

function CoverImage({ image, t }) {
    return (
        <div
            className="act-viewbtn-wrap"
            style={{
                width:              "100%",
                height:             "200px",
                borderRadius:       "6px",
                overflow:           "hidden",
                border:             `1px solid ${t.btnBorder}`,
                backgroundImage:    `url(${image})`,
                backgroundSize:     "cover",
                backgroundPosition: "center",
            }}
        />
    );
}

function QuizPanel({ id, name, image, description, t }) {
    return (
        <div
            className="act-panel"
            style={{ border: `1px solid ${t.cardBorder}`, background: t.cardBg, boxShadow: t.shadow, width: "100%" }}
        >
            <div
                className="act-panel__titlebar"
                style={{ borderBottom: `1px solid ${t.titleBarBorder}`, background: t.titleBarBg }}
            >
                <span className="act-panel__badge" style={{ background: t.badgeBg, color: t.badgeText }}>#{id}</span>
                <h3 className="act-panel__name" style={{ color: t.heading, fontSize: "1.05rem", fontWeight: 700 }}>
                    {name}
                </h3>
            </div>

            <div className="act-panel__body" style={{ flexDirection: "column", padding: "16px", gap: "12px" }}>
                <CoverImage image={image} t={t} />
                {description && (
                    <p className="act-panel__desc" style={{ color: t.subText, margin: 0, fontSize: "0.8rem", lineHeight: "1.75" }}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Mid_Quizzes({ sectionRef, onCountChange }) {
    const dark = useTheme();
    const t    = tk(dark);

    useEffect(() => { onCountChange(quizzes.length); }, []);

    return (
        <section ref={sectionRef} className="w-full" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="card act-wrapper" style={{ background: t.cardBg, flex: 1, display: "flex", flexDirection: "column" }}>
                <div className="act-header" style={{ borderBottom: `1px solid ${t.sectionDivider}`, justifyContent: "flex-start" }}>
                    <TrafficLights />
                    <h2 className="section-title" style={{ margin: 0, color: t.heading }}>Quizzes!</h2>
                    <span className="act-pill" style={{ color: t.pillText, background: t.pillBg, border: `1px solid ${t.pillBorder}`, marginLeft: "auto" }}>
                        {quizzes.length} item
                    </span>
                </div>
                <div style={{ width: "100%", padding: "0 16px 16px 16px" }}>
                    {quizzes.map((quiz) => (
                        <QuizPanel key={quiz.id} {...quiz} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}