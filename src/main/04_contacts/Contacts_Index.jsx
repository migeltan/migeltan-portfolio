import { HiOutlineMail } from "react-icons/hi";
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebookMessenger, FaGithub, FaInstagram } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export default function Contacts_Index() {
    return (
        <section className="w-full h-auto">
            <div className="card">
                <h2 className="section-title">Contacts</h2>

                <div className="contact-links">

                    <a className="contact-item" href="mailto:migellltan@gmail.com">
                        <HiOutlineMail className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">Email</span>
                            <span className="contact-sub">migellltan@gmail.com</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                    <a className="contact-item">
                        <MdPhoneInTalk className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">Let's Talk</span>
                            <span className="contact-sub">956-740-1232</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                    <a className="contact-item" href="https://www.facebook.com/miggie312">
                        <FaFacebookMessenger className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">Facebook</span>
                            <span className="contact-sub">Chat with me</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                    <a
                        className="contact-item"
                        href="https://www.linkedin.com/in/migel-tan-3125herrera/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsLinkedin className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">LinkedIn</span>
                            <span className="contact-sub">Migel Tan</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                    <a
                        className="contact-item"
                        href="https://github.com/migeltan"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">GitHub</span>
                            <span className="contact-sub">migeltan</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                    <a
                        className="contact-item"
                        href="https://www.instagram.com/miggytahn/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="contact-icon" />
                        <div className="contact-info">
                            <span className="contact-title">Instagram</span>
                            <span className="contact-sub">@miggytahn</span>
                        </div>
                        <span className="contact-arrow">›</span>
                    </a>

                </div>
            </div>
        </section>
    );
}
