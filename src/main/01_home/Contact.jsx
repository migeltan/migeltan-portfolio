import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineTrackChanges, MdPhoneInTalk } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaFacebookMessenger, FaInstagram } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";

const TrafficLights = () => (
  <span
    style={{
      display: "flex",
      gap: "6px",
      alignItems: "center",
      marginRight: "10px",
      position: "relative",
      top: "-1px",
    }}
  >
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#ff5f57",
      }}
    />
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#febc2e",
      }}
    />
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#28c840",
      }}
    />
  </span>
);

export default function Contact() {
  return (
    <div className="connect-wrapper">
      <section className="card connect-container">
        {/* ✅ HEADER (FIXED) */}
        <div
          className="card-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <TrafficLights />
          <h2 className="section-title" style={{ margin: 0 }}>
            More About Me!
          </h2>
        </div>

        {/* ✅ GRID CONTENT */}
        <div className="connect-grid">
          {/* Goals */}
          <div className="connect-group">
            <h3 className="connect-title">
              <MdOutlineTrackChanges className="icon" /> Goals
            </h3>
            <a className="connect-item" href="#">
              To finish this midterm project for Object-Oriented programming.
            </a>
            <a className="connect-item" href="#">
              Graduate the term without any irregularization!
            </a>
            <a className="connect-item" href="#">
              Finish this year without any problem, and achieve greater lengths
              in this field!
            </a>
          </div>

          {/* Social Links */}
          <div className="connect-group">
            <h3 className="connect-title">
              <GoPaperclip className="icon" /> Social Links
            </h3>
            <a
              className="connect-item"
              href="https://www.linkedin.com/in/migel-tan-3125herrera/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin className="connect-icon" /> LinkedIn
            </a>
            <a
              className="connect-item"
              href="https://github.com/migeltan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="connect-icon" /> GitHub
            </a>
            <a
              className="connect-item"
              href="https://www.instagram.com/miggytahn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="connect-icon" /> Instagram
            </a>
          </div>

          {/* Contact CTA */}
          <div className="connect-group contact-box">
            <h3 className="connect-title">
              <AiOutlineMessage className="icon" /> Contact
            </h3>
            <div className="contact-card">
              <p className="connect-desc">
                Open to learn more in the field of information technology!
              </p>
              <a className="connect-action">Get in touch →</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="contact-layout">
            <div className="contact-links">
              <a className="contact-item" href="mailto:migellltan@gmail.com">
                <HiOutlineMail className="contact-icon" />
                <div className="contact-info">
                  <span className="contact-title">Email</span>
                  <span className="contact-sub">migellltan@gmail.com</span>
                </div>
                <span className="contact-arrow">›</span>
              </a>

              <a className="contact-item" href="tel:9567401232">
                <MdPhoneInTalk className="contact-icon" />
                <div className="contact-info">
                  <span className="contact-title">Let's Talk</span>
                  <span className="contact-sub">956-740-1232</span>
                </div>
                <span className="contact-arrow">›</span>
              </a>

              <a
                className="contact-item"
                href="https://www.facebook.com/miggie312/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookMessenger className="contact-icon" />
                <div className="contact-info">
                  <span className="contact-title">Messenger</span>
                  <span className="contact-sub">Chat with me</span>
                </div>
                <span className="contact-arrow">›</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
