import { useState, useRef, useEffect } from "react";
import QuizzesSection from "./Mid_Quizzes";
import SeatworksSection from "./Mid_Seatworks";
import ActivitiesSection from "./Mid_Activities";
import Mid_Exams from "./Mid_Exams";

export default function Midterms_Index({ scrollTo: scrollToProp }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [counts, setCounts] = useState({
    Quizzes: 0,
    Seatworks: 0,
    Activities: 0,
    Exams: 0,
  });

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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (scrollToProp && refMap[scrollToProp]) {
      setTimeout(() => {
        refMap[scrollToProp].current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [scrollToProp]);

  const summaryCards = [
    { label: "Quizzes", hash: "quizzes", countKey: "Quizzes" },
    { label: "Seatworks", hash: "seatworks", countKey: "Seatworks" },
    { label: "Activities", hash: "activities", countKey: "Activities" },
    { label: "Exams", hash: "exams", countKey: "Exams" },
  ];

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Summary */}
      <section className="w-full h-auto">
        <div className="card">
          <h2 className="section-title">Midterms: School Activities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {summaryCards.map((item) => (
              <div
                key={item.label}
                className="cursor-pointer hover:opacity-80 transition-opacity card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "24px",
                  gap: "8px",
                }}
                onClick={() => scrollTo(refMap[item.hash])}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    lineHeight: 1,
                  }}
                >
                  {counts[item.countKey]}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZZES + SEATWORKS */}
      <section
        className="w-full flex gap-5"
        style={{
          alignItems: "stretch",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <QuizzesSection
          sectionRef={quizzesRef}
          onImageClick={setSelectedImage}
          onCountChange={(count) =>
            setCounts((prev) => ({ ...prev, Quizzes: count }))
          }
        />
        <SeatworksSection
          sectionRef={seatworksRef}
          onImageClick={setSelectedImage}
          onCountChange={(count) =>
            setCounts((prev) => ({ ...prev, Seatworks: count }))
          }
        />
      </section>

      {/* ACTIVITIES */}
      <ActivitiesSection
        sectionRef={activitiesRef}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, Activities: count }))
        }
      />

      {/* EXAMS */}
      <Mid_Exams
        sectionRef={examsRef}
        onImageClick={setSelectedImage}
        onCountChange={(count) =>
          setCounts((prev) => ({ ...prev, Exams: count }))
        }
      />
    </>
  );
}
