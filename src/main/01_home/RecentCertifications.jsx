import { useState } from "react";
import { MdOutlineVerified } from "react-icons/md";

import netBasics from "../../images/netcert.png";

const certifications = [
    {
        title: "Networking Basics",
        org: "Cisco",
        img: netBasics, // clickable modal
    },
    {
        title: "Intermediate Python",
        org: "DataCamp",
        href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/e3cb5ad646a7e2e732db8870615b8f94d9e2c987",
    },
    {
        title: "PostgreSQL",
        org: "DataCamp",
        href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/ed3ef2483126328a1e7e11c941be8ae8187bd4ed",
    },
    {
        title: "Java Programming NC III",
        org: "Tesda",
    },
];

export default function RecentCertifications() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);

    const openModal = (img) => {
        setSelectedCert(img);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCert(null);
    };

    return (
        <>
            <section className="card">
                <div className="section-header">
                    <h2 className="section-title">
                        <MdOutlineVerified className="section-icon" /> Recent Certifications
                    </h2>
                </div>

                <div className="cert-list">
                    {certifications.map((cert, i) =>
                        cert.img ? (
                            <div className="cert-item" key={i} onClick={() => openModal(cert.img)}>
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-org">{cert.org}</p>
                            </div>
                        ) : (
                            <div className="cert-item" key={i}>
                                <a
                                    href={cert.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-link"
                                >
                                    <h3 className="cert-title">{cert.title}</h3>
                                    <p className="cert-org">{cert.org}</p>
                                </a>
                            </div>
                        )
                    )}
                </div>
            </section>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={selectedCert} alt="Certificate" className="modal-img" />
                    </div>
                </div>
            )}
        </>
    );
}
