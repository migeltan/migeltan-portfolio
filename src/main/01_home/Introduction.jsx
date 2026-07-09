import { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";

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

export default function Introduction() {
  const dark = useTheme();
  const sectionDivider = dark ? "#30363d" : "#e5e7eb";

  return (
    <section className="card" id="introduction">
      <div
        className="section-header"
        style={{
          paddingBottom: "16px",
          borderBottom: `1px solid ${sectionDivider}`,
          marginBottom: "18px",
        }}
      >
        <h2 className="section-title">
          <IoPersonOutline className="section-icon" />
          Introduction
        </h2>
      </div>

      <p className="text-content" style={{ marginBottom: "12px" }}>
        Hi,{" "}
        <strong> I'm Migel H. Tan, an Information Technology student </strong>{" "}
        at the Polytechnic University of the Philippines with a growing focus on
        artificial intelligence, software engineering, and data analytics.
      </p>

      <p className="text-content" style={{ marginBottom: "12px" }}>
        I enjoy building applications that solve meaningful problems, whether
        through web development, machine learning, or database-driven systems.
        My experiences in hackathons, academic projects, and leadership roles
        have strengthened both my technical foundation and collaborative skills.
      </p>

      <p className="text-content">
        Feel free to explore my portfolio to learn more about my projects,
        experiences, and the technologies I'm currently working with as I
        continue pursuing opportunities in software development and emerging
        technologies.
      </p>
    </section>
  );
}
