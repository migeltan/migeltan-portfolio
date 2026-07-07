import { useState, useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";

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

const certificates = [
  {
    href: "https://github.com/migeltan/COBOL-Practices",
    title: "Data Collection and Annotation NC II",
    desc: "A TESDA certificate of completion for the Data Collection and Annotation NC II course. \
    This course covers the fundamentals of data collection, annotation techniques, and best practices in data management.\
    Accumulated 224 hours of training and successfully completed the required assessments.",
    tag: "TESDA Certificate",
  },
  {
    href: "https://github.com/migeltan/Java-OOP",
    title: "Programming (Java) NC III",
    desc: "A TESDA certificate of completion for the Programming (Java) NC III course. \
    This course covers the fundamentals of Java programming, object-oriented programming concepts, and software development best practices.",
    tag: "TESDA Certificate",
  },
  {
    href: "https://github.com/migeltan/Pag-IBIG-Project",
    title: "DataCamp: Intermediate Python and SQL for Data Science",
    desc: "A DataCamp certificate of completion for the Intermediate Python and SQL for Data Science course. \
    This course covers advanced Python programming techniques, data manipulation, and SQL querying for data analysis.\
    Accumulated 8 hours of self-paced learning and successfully completed the required assessments.",
    tag: "DataCamp Certificate",
  },
  {
    href: "https://github.com/migeltan/C-Practices",
    title: "Cisco Networking Academy: Networking Basics",
    desc: "A Cisco Networking Academy certificate of completion for the Networking Basics course. \
    This course covers the fundamentals of networking, including network protocols, IP addressing, and network troubleshooting.\
    Accumulated 15 hours of self-paced learning and successfully completed the required assessments.",
    tag: "Cisco Networking Academy Certificate",
  },
];

export default function RecentCertificates() {
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
        <h2 className="section-title" style={{ margin: 0 }}>
          <MdOutlineDashboard className="section-icon" /> Recent Certificates
        </h2>
      </div>

      <div className="project-list">
        {certificates.map((certificate, i) => (
          <div className="project-item" key={i}>
            <a
              href={certificate.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <h3 className="project-title">{certificate.title}</h3>
              <p className="project-desc">{certificate.desc}</p>
              <span className="project-tag">{certificate.tag}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
