import { useState, useRef, useEffect } from "react";
import JavaSQL from "./Proj_JAVA";
import PUPEase from "./Proj_UI";
import KwageeHackathon from "./Proj_KWAGEE";
import MachineLearning from "./Proj_ML";

export default function projectIndex({ scrollTo: scrollToProp }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    { label: "Programming Project", hash: "javasql", countKey: "javasql" },
    { label: "UI Project", hash: "pupease", countKey: "pupease" },
    { label: "Hackathon Project", hash: "kwagee", countKey: "kwagee" },
    { label: "Machine Learning", hash: "modelpy", countKey: "modelpy" },
  ];

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Summary */}
      <section className="w-full h-auto">
        <div className="card">
          <h2 className="section-title">Related Projects</h2>
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
