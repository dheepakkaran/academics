import type { Metadata } from "next";
import { externalLinks, projects } from "../portfolio-data";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Engineering Projects — Dheepak Karan",
  description:
    "Engineering projects by Dheepak Karan across machine learning, networked systems, industrial automation and electric mobility.",
};

const github = externalLinks.find((link) => link.label === "GitHub");

export default function WorkPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#projects">Skip to projects</a>
      <ProfileHeader active="work" />

      <main id="projects">
        <section>
          <h2>Engineering Projects</h2>
          <p>Selected projects across applied machine learning, network scheduling, industrial control and electric mobility.</p>
          <ol className="project-list">
            {projects.map((project, index) => (
              <li key={project.title}>
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <span>{project.date}</span>
                </div>
                <p className="project-field">
                  {project.category}{project.affiliation ? ` · ${project.affiliation}` : ""}
                </p>
                <p>{project.premise}</p>
                <p><strong>Approach:</strong> {project.method}</p>
                <p><strong>Outcome:</strong> {project.outcome}</p>
                <p className="project-links">
                  <span className="result">[{project.metric}]</span>{" · "}
                  <span>{project.stack.join(" · ")}</span>{index === 0 && github?.href ? <>{" · "}<a href={github.href} target="_blank" rel="noreferrer">Code profile</a></> : null}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Engineering Projects</small>
      </footer>
    </div>
  );
}
