import { MdOutlineDashboard } from "react-icons/md";

const projects = [
    {
        href: "https://github.com/migeltan/COBOL-Practices",
        title: "COBOL Programs",
        desc: "Accumulated COBOL source code all throughout the semester.\
        Includes COBOL final project, as well as test source codes.",
        tag: "Github.com",
    },
    {
        href: "https://github.com/migeltan/Java-OOP",
        title: "Java Programs",
        desc: "Java source code and some sample projects. This consists of source code made from\
        interest and passion, as well as some academic requirements.",
        tag: "Github.com",
    },
    {
        href: "https://github.com/migeltan/Pag-IBIG-Project",
        title: "Pag-CONNECT: A Digital Registration System for Pag-IBIG Fund Applicants",
        desc: "A database design project made for information management. This will integrate the design\
        of the database in GUI and applied SQL practices.",
        tag: "Github.com",
    },
    {
        href: "https://github.com/migeltan/C-Practices",
        title: "C Projects",
        desc: "C programming language source codes. Consists projects out of passion, as well\
        as academic requirement.",
        tag: "Github.com",
    },
];

export default function SchoolProjects() {
    return (
        <section className="card">
            <div className="section-header">
                <h2 className="section-title">
                    <MdOutlineDashboard className="section-icon" /> Recent Projects
                </h2>
            </div>

            <div className="project-list">
                {projects.map((project, i) => (
                    <div className="project-item" key={i}>
                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                            <span className="project-tag">{project.tag}</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
