import type { Metadata } from "next";
import CourseworkTable from "../coursework-table";
import { leadership, teachingPreparation } from "../portfolio-data";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Coursework & Teaching — Dheepak Karan",
  description:
    "Graduate coursework, academic preparation and teaching experience for Dheepak Karan at Northeastern University.",
};

const academicService = leadership.filter((item) => item.role !== "Departmental Sports Coordinator");

export default function CourseworkPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#coursework">Skip to coursework</a>
      <ProfileHeader active="coursework" />

      <main id="coursework">
        <section>
          <h2>Graduate Coursework</h2>
          <p>MS ECE concentration: <strong>Machine Learning, Computer Vision &amp; Algorithms</strong>.</p>
          <CourseworkTable />
        </section>

        <section>
          <h2>Teaching Preparation</h2>
          <dl className="academic-area-list">
            {teachingPreparation.map((item) => (
              <div key={item.area}>
                <dt>{item.area}</dt>
                <dd>{item.evidence}</dd>
              </div>
            ))}
          </dl>
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
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Coursework &amp; Teaching</small>
      </footer>
    </div>
  );
}
