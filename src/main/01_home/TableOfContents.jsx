import { PiFlask } from "react-icons/pi";

const tableOfContents = [
  {
    category: "Home",
    items: [
      { label: "Introduction", component: null, props: {} },
      {
        label: "Additional Information",
        component: null,
        props: { scrollTo: "projects-cert" },
      },
    ],
  },

  
  {
    category: "Midterm",
    items: [
      { label: "Quizzes", component: null, props: { scrollTo: "quizzes" } },
      { label: "Seatworks", component: null, props: { scrollTo: "seatworks" } },
      {
        label: "Activities",
        component: null,
        props: { scrollTo: "activities" },
      },
      { label: "Exams", component: null, props: { scrollTo: "exams" } },
    ],
  },
  {
    category: "Finals",
    items: [
      { label: "Quizzes", component: null, props: { scrollTo: "quizzes" } },
      { label: "Seatworks", component: null, props: { scrollTo: "seatworks" } },
      {
        label: "Activities",
        component: null,
        props: { scrollTo: "activities" },
      },
      { label: "Exams", component: null, props: { scrollTo: "exams" } },
    ],
  },
  {
    category: "Contacts",
    items: [{ label: "Contacts", component: null, props: {} }],
  },
];

export default function TableOfContents({ onPageChange, onScrollTo }) {
  const handleClick = (category, label, props) => {
    if (category === "Midterm") {
      onPageChange("Midterms", props);
    } else if (category === "Finals") {
      onPageChange("Finals", props);
    } else if (category === "Contacts") {
      onPageChange("Contacts", {});
    } else if (category === "Home") {
      if (label === "Introduction") {
        onScrollTo("introduction");
      } else if (label === "Additional Information") {
        onScrollTo("projects-cert");
      }
    }
  };

  return (
    <section className="card">
      <div className="section-header">
        <h2 className="section-title">
          <PiFlask className="section-icon" />
          Table of Contents
        </h2>
      </div>

      {tableOfContents.map(({ category, items }) => (
        <div className="tech-category" key={category}>
          <h3 className="category-title">{category}</h3>
          <div className="tag-group">
            {items.map(({ label, props }) => (
              <span
                key={label}
                className="tag"
                onClick={() => handleClick(category, label, props)}
                style={{ cursor: "pointer" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
