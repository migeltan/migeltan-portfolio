import { useState, useEffect } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiHandWaving } from "react-icons/pi";

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

export default function Experience() {
  const dark = useTheme();
  const sectionDivider = dark ? "#30363d" : "#e5e7eb";

  return (
    <section className="card">
      <div
        className="section-header"
        style={{
          paddingBottom: "16px",
          borderBottom: `1px solid ${sectionDivider}`,
          marginBottom: "18px",
        }}
      >
        <h2 className="section-title section-animate">
          <IoBriefcaseOutline className="section-icon" />
          Experience and Organization
        </h2>
      </div>

      <div className="experience-list">
        <div className="exp-item">
          <div className="exp-dot active-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">
              Polytechnic University of the Philippines
            </h3>
            <p className="exp-company">
              Bachelor of Science in Information Technology Sophomore
            </p>
          </div>
          <span className="exp-year">Present</span>
        </div>

        <div className="exp-item">
          <div className="exp-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">DataCamp Scholar</h3>
            <p className="exp-company">
              Learned Intermediate Python Course and Intermediate SQL Course
            </p>
          </div>
          <span className="exp-year">2025</span>
        </div>

        <div className="exp-item">
          <div className="exp-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">AWS Cloud Club PUP</h3>
            <p className="exp-company">
              Department of Data Science and Analytics
            </p>
          </div>
          <span className="exp-year">2025</span>
        </div>

        <div className="exp-item">
          <div className="exp-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">Cisco NetConnect PUP</h3>
            <p className="exp-company">Department of Logistics</p>
          </div>
          <span className="exp-year">2025</span>
        </div>

        <div className="exp-item">
          <div className="exp-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">
              Hello World! <PiHandWaving className="wave-icon" />
            </h3>
            <p className="exp-company">
              Started Programming, enrolled in PUP BSIT!
            </p>
          </div>
          <span className="exp-year">2024</span>
        </div>

        <div className="exp-item">
          <div className="exp-dot"></div>
          <div className="exp-content">
            <h3 className="exp-title">Our Lady of Fatima Univeristy</h3>
            <p className="exp-company">
              STEM Strand - Graduated with high honors.
            </p>
          </div>
          <span className="exp-year">2024</span>
        </div>
      </div>
    </section>
  );
}
