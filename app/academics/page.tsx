import type { Metadata } from "next";
import Certifications from "../certifications";
import CourseworkTable from "../coursework-table";
import LeetCodePractice from "../leetcode-practice";
import { leadership, undergraduateCourseGroups } from "../portfolio-data";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Academics — Dheepak Karan",
  description:
    "Graduate and relevant undergraduate coursework, academic service and algorithm practice for Dheepak Karan.",
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

        <section id="undergraduate-coursework">
          <h2>Relevant Undergraduate Coursework</h2>
          <p>
            Selected B.E. Electrical and Electronics Engineering courses relevant to computing,
            electronics, control and intelligent systems. Course codes follow the undergraduate
            transcript; <strong>O</strong> denotes Outstanding (10/10).
          </p>
          <dl className="academic-area-list undergraduate-coursework-list">
            {undergraduateCourseGroups.map((group) => (
              <div key={group.area}>
                <dt>{group.area}</dt>
                <dd>
                  {group.courses.map((course) => (
                    <span className="undergraduate-course" key={course.code}>
                      <span className="undergraduate-course-code">{course.code}</span>{" "}
                      <span>{`${course.title} (${course.grade})`}</span>
                    </span>
                  ))}
                </dd>
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

        <Certifications />

        <LeetCodePractice />
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Academics</small>
      </footer>
    </div>
  );
}
