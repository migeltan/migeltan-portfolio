import { IoBriefcaseOutline } from "react-icons/io5";

export default function Introduction() {
    return (
        <section className="card" id="introduction">
            <h2 className="section-title">
                <IoBriefcaseOutline className="section-icon" />
                Introduction
            </h2>

            <p className="text-content">
                This e-portfolio presents my Midterm Project in Object-Oriented Programming using HTML-CSS-JS. It
                includes quizzes, activities, and exams that demonstrate my understanding of OOP concepts.
            </p>
        </section>
    );
}