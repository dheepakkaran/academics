import type { Metadata } from "next";
import { externalLinks, projects } from "../portfolio-data";
import GitHubContributions from "../github-contributions";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Projects — Dheepak Karan",
  description:
    "Academic and engineering projects by Dheepak Karan across machine learning, networked systems, industrial automation and electric mobility.",
};

const github = externalLinks.find((link) => link.label === "GitHub");

export default function ProjectsPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#projects">Skip to projects</a>
      <ProfileHeader active="projects" />

      <main id="projects">
        <section>
          <h2>Selected Projects</h2>
          <p>Project records organized around the question, method and observed result.</p>
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
                <p><strong>Question:</strong> {project.premise}</p>
                <p><strong>Method:</strong> {project.method}</p>
                <p><strong>Result:</strong> {project.outcome}</p>
                <p className="project-links">
                  <span className="result">[{project.metric}]</span>{" · "}
                  <span>{project.stack.join(" · ")}</span>{index === 0 && github?.href ? <>{" · "}<a href={github.href} target="_blank" rel="noreferrer">Code profile</a></> : null}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <GitHubContributions />
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Projects</small>
      </footer>
    </div>
  );
}
