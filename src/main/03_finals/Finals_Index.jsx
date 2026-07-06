import { useEffect, useRef } from "react";

export default function Finals_Index({ scrollTo: scrollToProp }) {
  const quizzesRef = useRef(null);
  const seatworksRef = useRef(null);
  const activitiesRef = useRef(null);
  const examsRef = useRef(null);

  const refMap = {
    quizzes: quizzesRef,
    seatworks: seatworksRef,
    activities: activitiesRef,
    exams: examsRef,
  };

  useEffect(() => {
    if (scrollToProp && refMap[scrollToProp]?.current) {
      setTimeout(() => {
        refMap[scrollToProp].current.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [scrollToProp]);

  return (
    <section className="w-full h-auto">
      <div className="card">
        <h2 className="section-title">Finals</h2>
        <p className="text-content">
          To be filled up on final fulfillment. A work in progress.
        </p>

        {/* Placeholder sections — add your real content later */}
        <div ref={quizzesRef} style={{ marginTop: "1rem" }}>
          <h3>Quizzes</h3>
        </div>
        <div ref={seatworksRef} style={{ marginTop: "1rem" }}>
          <h3>Seatworks</h3>
        </div>
        <div ref={activitiesRef} style={{ marginTop: "1rem" }}>
          <h3>Activities</h3>
        </div>
        <div ref={examsRef} style={{ marginTop: "1rem" }}>
          <h3>Exams</h3>
        </div>
      </div>
    </section>
  );
}
