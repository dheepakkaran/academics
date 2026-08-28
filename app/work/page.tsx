import type { Metadata } from "next";
import { externalLinks, projects } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Engineering Work — Dheepak Karan",
  description:
    "Engineering projects by Dheepak Karan across machine learning, networked systems, industrial automation and electric mobility.",
};

const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");

export default function WorkPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#projects">Skip to projects</a>

      <header className="academic-intro compact-intro">
        <img
          className="academic-avatar"
          src="/dheepak-karan.jpg"
          alt="Dheepak Karan"
          width="512"
          height="512"
        />
        <div className="academic-bio">
          <h1>Dheepak Karan</h1>
          <p><a href="mailto:elumalaisanthakuma.d@northeastern.edu">elumalaisanthakuma.d@northeastern.edu</a></p>
          <p>Engineering Work</p>
          <p>
            <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a>{" · "}
            <a href={linkedIn?.href} target="_blank" rel="noreferrer">LinkedIn</a>{" "}
            <a href="/resume.pdf" download>[Résumé]</a>
          </p>
        </div>
      </header>

      <nav className="academic-menu" aria-label="Work navigation">
        <a href="/">Home</a>
        <a className="active" href="#projects">Work</a>
        <a href="/#experience">Experience</a>
        <a href="/blog">Notes</a>
        <a href="/resume.pdf" download>CV</a>
      </nav>

      <main id="projects">
        <section>
          <h2>Engineering Work</h2>
          <p>Projects across applied AI, network scheduling, industrial control and electric mobility.</p>
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
        <small>© 2026 Dheepak Karan · Engineering Work</small>
      </footer>
    </div>
  );
}
