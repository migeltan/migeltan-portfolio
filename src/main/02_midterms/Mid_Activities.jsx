import { useEffect, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "../../css/Activities.css";

import actq1 from "../../images/mid_activities/act1.pdf";
import an1 from "../../images/mid_activities/an1.pdf";
import actq2 from "../../images/mid_activities/act2.pdf";
import an2 from "../../images/mid_activities/an2.pdf";
import actq3 from "../../images/mid_activities/act3.pdf";
import an3 from "../../images/mid_activities/an3.pdf";
import an3p2 from "../../images/mid_activities/an3p2.pdf";
import actq4 from "../../images/mid_activities/act4.pdf";
import an4 from "../../images/mid_activities/an4.pdf";
import an4p2 from "../../images/mid_activities/an4p2.pdf";
import actq5 from "../../images/mid_activities/act5.pdf";
import an5 from "../../images/mid_activities/an5.pdf";
import an5p2 from "../../images/mid_activities/an5p2.pdf";
import ansass1pdf from "../../images/mid_activities/ass1.pdf";
import abtmepdf from "../../images/mid_activities/abtme.pdf";

import prob1bg from "../../images/mid_activities_bg/prob1.png";
import ans1bg from "../../images/mid_activities_bg/ans1.png";
import prob2bg from "../../images/mid_activities_bg/prob2.png";
import ans2bg from "../../images/mid_activities_bg/ans2.png";
import prob3bg from "../../images/mid_activities_bg/prob3.png";
import ans3bg from "../../images/mid_activities_bg/ans3.png";
import prob4bg from "../../images/mid_activities_bg/prob4.png";
import ans4bg from "../../images/mid_activities_bg/ans4.png";
import prob5bg from "../../images/mid_activities_bg/prob5.png";
import ans5bg from "../../images/mid_activities_bg/ans5.png";
import probass1 from "../../images/mid_activities_bg/ass1.png";
import ansass1 from "../../images/mid_activities_bg/ansass1.png/";
import abtme from "../../images/mid_activities_bg/abtme1.png";
import abtme2 from "../../images/mid_activities_bg/abtme2.png";
import ansabtme from "../../images/mid_activities_bg/ansabtme.png";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const activities = [
  {
    id: 1,
    name: "Activity #1 - Variables",
    description: (
      <>
        <strong>Explanation:</strong> This first activity was all about tracing
        and analyzing a Java program given to us. I answered 3 parts: variable
        identification, where a variable is stored once initialized, an
        explanation of object instantiation, and the program's output once run
        in our environment.
      </>
    ),
    questionImages: [actq1],
    answerImages: [an1, ans1bg],
    ansdesc: (
      <>
        <strong>Learnings:</strong> I learned how to trace and analyze a Java
        program by identifying variables and understanding their roles in
        execution. I understood where variables are stored in memory,
        particularly the difference between the stack and the heap, and how this
        affects program behavior. I also gained a clearer idea of object
        instantiation and how it connects to the program's output.
      </>
    ),
    probBg: prob1bg,
    ansBg: ans1bg,
  },
  {
    id: 2,
    name: "Activity #2 - Operators",
    description: (
      <>
        <strong>Explanation:</strong> The second activity, I created a Java
        program and applied our learnings about Java operators. From arithmetic
        up to bitwise, I created 6 programs with their outputs with respect to
        the program rules.
      </>
    ),
    questionImages: [actq2],
    answerImages: [an2],
    ansdesc: (
      <>
        <strong>Learnings:</strong> I learned what the possible output of each
        operator could be. Using bitwise operators, I applied my learning from
        Introduction to Computing on booleans. Ternary operators showed me how a
        lengthy condition can be optimized in Java using only 3 symbols (:, ?,
        ;). We also covered arithmetic operators and a final program applying
        all of them.
      </>
    ),
    probBg: prob2bg,
    ansBg: ans2bg,
  },
  {
    id: 3,
    name: "Activity #3 - ATM with Transfer Feature",
    description: (
      <>
        <strong>Explanation:</strong> This third activity let me use control
        flows in Java. I had to use 3 types: the if-else statement, switch
        statement, and do-while loop. All of which I am quite familiar with
        already because of my C programming language background.
      </>
    ),
    questionImages: [actq3],
    answerImages: [an3p2, an3],
    ansdesc: (
      <>
        <strong>Learnings:</strong> I learned that when being restricted, such
        as having a maximum transaction limit, it lessens errors from happening
        in your program. That is what I learned from this activity, other than
        the integration of the control flows.
      </>
    ),
    probBg: prob3bg,
    ansBg: ans3bg,
  },
  {
    id: 4,
    name: "Activity #4 - Student Payment System",
    description: (
      <>
        <strong>Explanation:</strong> This fourth activity is a student payment
        system with a validation counter. I applied switch-case control flow to
        constrain the input and java.util.Scanner for user input. The program
        includes Tuition Payment, Balance Checking, Discount Application for
        Scholars, and an exit option, with guards against negative balances and
        stacked discounts.
      </>
    ),
    questionImages: [actq4],
    answerImages: [an4p2, an4],
    ansdesc: (
      <>
        <strong>Learnings:</strong> I learned how to use switch-case to manage
        different program options in a structured way. I applied input
        validation to prevent errors such as negative balances and invalid
        transactions. I also gained experience implementing discount logic
        without stacking and ensuring accurate balance checking, which improved
        my ability to design more reliable programs.
      </>
    ),
    probBg: prob4bg,
    ansBg: ans4bg,
  },
  {
    id: 5,
    name: "Activity #5 - Personal Expense Tracker",
    description: (
      <>
        <strong>Explanation:</strong> For this latest activity, I created a Java
        program that tracks expenses using methods, which is the equivalent of
        functions in other programming languages. Enhancements include user
        input and computing the remaining budget of the expense tracker.
      </>
    ),
    questionImages: [actq5],
    answerImages: [an5p2, an5],
    ansdesc: (
      <>
        <strong>Learnings:</strong> I enjoyed this activity a lot since it
        already uses methods. Having programs that are well-organized is
        something that really satisfies me. Learning about why Java calls them
        methods rather than functions was also interesting, since Java is
        object-oriented unlike C, although they share a lot of similarities in
        syntax.
      </>
    ),
    probBg: prob5bg,
    ansBg: ans5bg,
  },
  {
    id: 6,
    name: "Assignment #1 - Introduction to Java",
    description: (
      <>
        <strong>Explanation:</strong> This assignment was one of the first
        requirements given to us. It has 5 questions all about Java, from
        identifying what Java is to the difference of JDK, JRE, and JVM (which
        just encapsulates one another).
      </>
    ),
    questionImages: [probass1],
    answerImages: [ansass1pdf],
    ansdesc: (
      <>
        <strong>Learnings:</strong> This assignment taught us the fundamentals
        of Java, not in the coding sense but in terms of its features. Key ones
        include Java's platform independence and the layered relationship of
        JDK, JRE, and JVM, which is really just the compiler, runtime
        environment, and bytecode.
      </>
    ),
    probBg: probass1,
    ansBg: ansass1,
  },
  {
    id: 7,
    name: "About Me - Migel H. Tan",
    description: (
      <>
        <strong>Explanation:</strong> This was the first assignment given to us
        by Sir Bedis. It was just a brief introduction of ourselves and what we
        want to learn from the class this year. We also had to describe
        ourselves with 3 words. I chose Relentless, Committed, and Adaptable.
      </>
    ),
    questionImages: [abtme, abtme2],
    answerImages: [abtmepdf],
    ansdesc: (
      <>
        <strong>Learnings:</strong> Upon reflecting, I saw that my expectations
        for this course were met. I learned that Java is very similar to C in
        terms of syntax, which made my adjustment to this course much smoother
        than I expected.
      </>
    ),
    probBg: abtme,
    ansBg: ansabtme,
  },
];

const isPDF = (src) =>
  typeof src === "string" && src.toLowerCase().includes(".pdf");

function useTheme() {
  const [dark, setDark] = useState(
    () =>
      document.querySelector(".container")?.classList.contains("dark-mode") ??
      false
  );
  useEffect(() => {
    const el = document.querySelector(".container");
    if (!el) return;
    const observer = new MutationObserver(() => {
      setDark(el.classList.contains("dark-mode"));
    });
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
    dividerBg: dark ? "#2a2d3a" : "#f0f0f0",
    sectionDivider: dark ? "#2a2d3a" : "#e5e7eb",
    heading: dark ? "#f0f2f8" : "#1c1e21",
    subText: dark ? "#c8cfe0" : "#374151",
    mutedText: dark ? "#5a6072" : "#111111",
    badgeBg: dark ? "#f0f2f8" : "#1c1e21",
    badgeText: dark ? "#1c1e21" : "#ffffff",
    pillBg: dark ? "#1e2130" : "#f3f4f6",
    pillBorder: dark ? "#2a2d3a" : "#e5e7eb",
    pillText: dark ? "#9ba3b8" : "#9ca3af",
    btnBorder: dark ? "#3a3f55" : "#111111",
    btnBorderHover: dark ? "#5a6080" : "#000000",
    shadow: dark ? "0 1px 6px rgba(0,0,0,0.5)" : "0 1px 4px rgba(0,0,0,0.06)",
    overlayBg: dark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)",
    overlayBgHover: dark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.1)",
    overlayText: "#ffffff",
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

function Lightbox({ images, startIndex = 0, label, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  const hasMultiple = images.length > 1;
  const currentSrc = images[current];
  const currentIsPDF = isPDF(currentSrc);

  return (
    <div className="act-lightbox__overlay" onClick={onClose}>
      <div className="act-lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <button className="act-lightbox__close" onClick={onClose}>
          ✕
        </button>
        {label && (
          <p className="act-lightbox__label">
            {label} {hasMultiple && `· ${current + 1} / ${images.length}`}
          </p>
        )}
        <div className="act-lightbox__media-wrap">
          {hasMultiple && (
            <button
              className="act-lightbox__nav act-lightbox__nav--prev"
              onClick={prev}
            >
              ‹
            </button>
          )}
          {currentIsPDF ? (
            <iframe
              key={current}
              src={currentSrc}
              title={label}
              className="act-lightbox__iframe"
            />
          ) : (
            <img
              key={current}
              src={currentSrc}
              alt={label}
              className="act-lightbox__img"
            />
          )}
          {hasMultiple && (
            <button
              className="act-lightbox__nav act-lightbox__nav--next"
              onClick={next}
            >
              ›
            </button>
          )}
        </div>
        {hasMultiple && (
          <div className="act-lightbox__dots">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`act-lightbox__dot ${i === current ? "act-lightbox__dot--active" : "act-lightbox__dot--inactive"}`}
              />
            ))}
          </div>
        )}
        <p className="act-lightbox__hint">
          {hasMultiple ? "← → to navigate · ESC to close" : "ESC to close"}
        </p>
      </div>
    </div>
  );
}

function ViewButton({ images, label, bgImage, onOpen, t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="act-viewbtn-wrap">
      <button
        className="act-viewbtn"
        style={{
          borderColor: t.btnBorder,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          color: t.overlayText,
          height: "200px",
        }}
        onClick={() => onOpen(images, 0, label)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="act-viewbtn__overlay"
          style={{ background: hovered ? t.overlayBgHover : t.overlayBg }}
        />
        <div className="act-viewbtn__info act-viewbtn__info--ontop">
          <p className="act-viewbtn__title">Click to open</p>
          <p className="act-viewbtn__sub">
            {images.length} file{images.length > 1 ? "s" : ""}
          </p>
        </div>
      </button>
    </div>
  );
}

function ActivityPanel({
  id,
  name,
  description,
  questionImages,
  answerImages,
  ansdesc,
  probBg,
  ansBg,
  onOpen,
  t,
}) {
  return (
    <div
      className="act-panel"
      style={{
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        boxShadow: t.shadow,
      }}
    >
      <div
        className="act-panel__titlebar"
        style={{
          borderBottom: `1px solid ${t.titleBarBorder}`,
          background: t.titleBarBg,
        }}
      >
        <span
          className="act-panel__badge"
          style={{ background: t.badgeBg, color: t.badgeText }}
        >
          #{id}
        </span>
        <h3
          className="act-panel__name"
          style={{ color: t.heading, fontSize: "1.05rem", fontWeight: 700 }}
        >
          {name}
        </h3>
      </div>

      <div className="act-panel__body">
        {/* ✅ FIXED: changed t.dividerBg → t.cardBorder so it blends in dark mode */}
        <div
          className="act-panel__problem"
          style={{
            borderRight: `1px solid ${t.cardBorder}`,
            borderBottom: `1px solid ${t.cardBorder}`,
          }}
        >
          <p
            className="act-panel__label"
            style={{
              color: t.mutedText,
              fontFamily: "inherit",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            Problem
          </p>
          <ViewButton
            images={questionImages}
            label={`${name} — Problem`}
            bgImage={probBg}
            onOpen={onOpen}
            t={t}
          />
          {description && (
            <p
              className="act-panel__desc"
              style={{
                color: t.subText,
                fontSize: "0.8rem",
                lineHeight: "1.75",
              }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="act-panel__answer">
          <p
            className="act-panel__label"
            style={{
              color: t.mutedText,
              fontFamily: "inherit",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            Answer and Source Code
          </p>
          <ViewButton
            images={answerImages}
            label={`${name} — Answer`}
            bgImage={ansBg}
            onOpen={onOpen}
            t={t}
          />
          {ansdesc && (
            <p
              className="act-panel__desc"
              style={{
                color: t.subText,
                fontSize: "0.8rem",
                lineHeight: "1.75",
              }}
            >
              {ansdesc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Mid_Activities({ sectionRef, onCountChange }) {
  const [lightbox, setLightbox] = useState(null);
  const dark = useTheme();
  const t = tk(dark);

  useEffect(() => {
    onCountChange(activities.length);
  }, []);

  const openLightbox = (images, startIndex, label) =>
    setLightbox({ images, startIndex, label });
  const closeLightbox = () => setLightbox(null);

  return (
    <section ref={sectionRef} className="w-full h-auto">
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          label={lightbox.label}
          onClose={closeLightbox}
        />
      )}

      <div className="card act-wrapper" style={{ background: t.cardBg }}>
        <div
          className="act-header"
          style={{
            borderBottom: `1px solid ${t.sectionDivider}`,
            justifyContent: "flex-start",
          }}
        >
          <TrafficLights />
          <h2 className="section-title" style={{ margin: 0, color: t.heading }}>
            Activities!
          </h2>
          <span
            className="act-pill"
            style={{
              color: t.pillText,
              background: t.pillBg,
              border: `1px solid ${t.pillBorder}`,
              marginLeft: "auto",
            }}
          >
            {activities.length} items
          </span>
        </div>

        <div className="act-grid">
          {activities.map((activity) => (
            <ActivityPanel
              key={activity.id}
              id={activity.id}
              name={activity.name}
              description={activity.description}
              questionImages={activity.questionImages}
              answerImages={activity.answerImages}
              ansdesc={activity.ansdesc}
              probBg={activity.probBg}
              ansBg={activity.ansBg}
              onOpen={openLightbox}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
