import type { Metadata } from "next";
import CourseworkTable from "../coursework-table";
import LeetCodePractice from "../leetcode-practice";
import { leadership } from "../portfolio-data";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Academics — Dheepak Karan",
  description:
    "Graduate coursework, academic service and algorithm practice for Dheepak Karan at Northeastern University.",
};

const academicService = leadership.filter((item) => item.role !== "Departmental Sports Coordinator");

export default function AcademicsPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#academics">Skip to academics</a>
      <ProfileHeader active="academics" />

      <main id="academics">
        <section>
          <h2>Graduate Coursework</h2>
          <p>MS ECE concentration: <strong>Machine Learning, Computer Vision &amp; Algorithms</strong>.</p>
          <CourseworkTable />
        </section>

        <section>
          <h2>Teaching &amp; Academic Service</h2>
          <ol className="experience-list leadership-list">
            {academicService.map((item) => (
              <li key={`${item.organization}-${item.role}`}>
                <span className="entry-date">{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="entry-organization">{item.organization}</p>
                  <p>{item.summary}</p>
                  <p className="entry-results">{item.highlights.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <LeetCodePractice />
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Academics</small>
      </footer>
    </div>
  );
}
