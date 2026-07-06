import { useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { HiOutlineDocumentText, HiOutlineMail } from "react-icons/hi";
import onebyone from "../../assets/onebyone.jpg";
import darkonebyone from "../../assets/dark.png";
import cvPDF from "../../assets/cvtan.pdf";
import About from "./Introduction";
import TableOfContents from "./TableOfContents";
import Experience from "./Experience";
import RecentProjects from "./SchoolProjects";
import RecentCertifications from "./RecentCertifications";
import Contact from "./Contact";
import Gallery from "./Gallery";

export default function Home_Index({ darkMode, onPageChange }) {
  const projectsCertRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === "projects-cert" && projectsCertRef.current) {
      projectsCertRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="profile-header">
        <img
          src={darkMode ? darkonebyone : onebyone}
          alt="Profile"
          className="profile-photo"
        />
        <div className="profile-details">
          <div className="name-badge">
            <h1>Migel H. Tan</h1>
            <MdVerified className="verified-badge" />
          </div>
          <p className="location">
            <CiLocationOn className="location-icon" />
            Valenzuela City, Philippines
          </p>
          <div className="job-title">Course: Object-Oriented Programming</div>
          <div className="info-title">
            Section and School: BSIT 2-4 | PUP Manila
          </div>
          <div className="action-buttons">
            <a
              className="btn btn-black"
              href={cvPDF}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineDocumentText className="btn-icon" />
              View Resume
            </a>
            <a className="btn btn-white" href="mailto:migellltan@gmail.com">
              <HiOutlineMail className="btn-icon" />
              Send Email
            </a>
          </div>
        </div>
      </header>

      <div className="main-grid">
        <div className="left-column">
          <About />
          <TableOfContents
            onPageChange={onPageChange}
            onScrollTo={scrollToSection}
          />
        </div>
        <div className="right-column">
          <Experience />
        </div>
      </div>

      <Gallery />

      <div className="projects-cert-grid" ref={projectsCertRef}>
        <RecentProjects />
        <RecentCertifications />
      </div>

      <Contact />

      <footer className="footer">
        <div className="footer-line"></div>
        <p className="footer-text">
          © {new Date().getFullYear()} Migel H. Tan - Submitted to Sir Severino
          Bedis - In partial fulfillment of COMP 009 OOP
        </p>
      </footer>
    </>
  );
}
