import {
  blogPosts,
  experiences,
  externalLinks,
  leadership,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

const email = externalLinks.find((link) => link.label === "Email");
const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");
const credly = externalLinks.find((link) => link.label === "Credly");
const education = experiences.filter((entry) => entry.kind === "education");
const professionalExperience = experiences.filter((entry) => entry.kind === "experience");
const featuredProjects = projects.slice(0, 3);

export default function Home() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="academic-intro">
        <img
          className="academic-avatar"
          src="/dheepak-karan.jpg"
          alt="Dheepak Karan"
          width="512"
          height="512"
          fetchPriority="high"
        />
        <div className="academic-bio">
          <h1>Dheepak Karan</h1>
          <p><strong>Software Engineer · Applied ML · Intelligent Systems</strong></p>
          <p className="affiliation-line">
            <img
              className="northeastern-mark"
              src="/northeastern-monogram.png"
              alt=""
              width="2560"
              height="1725"
              aria-hidden="true"
            />
            <span>MS ECE, <a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a> · 3.926 CGPA</span>
          </p>
          <p>Boston, Massachusetts · Expected May 2028</p>
          <p><a href={email?.href}>elumalaisanthakuma.d@northeastern.edu</a></p>
          <p>
            <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a>{" · "}
            <a href={linkedIn?.href} target="_blank" rel="noreferrer">LinkedIn</a>{" · "}
            <a href={credly?.href} target="_blank" rel="noreferrer">Credly</a>{" "}
            <a href="/resume.pdf" download>[Résumé]</a>
          </p>
        </div>
      </header>

      <nav className="academic-menu" aria-label="Primary navigation">
        <a className="active" href="#home">Home</a>
        <a href="/work">Work</a>
        <a href="#experience">Experience</a>
        <a href="/blog">Notes</a>
        <a href="/resume.pdf" download>CV</a>
      </nav>

      <main id="main">
        <section id="home" className="academic-summary">
          <p>
            I build reliable software and machine-learning systems under real compute, latency and safety constraints.
            My work connects <strong>production backend engineering</strong>, <strong>resource-efficient AI</strong>, <strong>network scheduling</strong>, <strong>industrial automation</strong> and <strong>electric mobility</strong>.
          </p>

          <dl className="highlight-strip" aria-label="Selected verified results">
            {profileMetrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="work">
          <h2>Selected Engineering Work</h2>
          <ol className="project-list">
            {featuredProjects.map((project, index) => (
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
          <p className="section-link"><a href="/work">View all {projects.length} projects →</a></p>
        </section>

        <section id="experience">
          <h2>Experience &amp; Education</h2>
          <h3 className="subsection-title">Education</h3>
          <ol className="experience-list">
            {education.map((experience) => (
              <li key={`${experience.organization}-${experience.role}`}>
                <span className="entry-date">{experience.period}</span>
                <div>
                  <h3>{experience.role}</h3>
                  <p className="entry-organization">{experience.organization} · {experience.location}</p>
                  <p>{experience.summary}</p>
                  <p className="entry-results">{experience.outcomes.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="subsection-title">Professional Experience</h3>
          <ol className="experience-list">
            {professionalExperience.map((experience) => (
              <li key={`${experience.organization}-${experience.role}`}>
                <span className="entry-date">{experience.period}</span>
                <div>
                  <h3>{experience.role}</h3>
                  <p className="entry-organization">{experience.organization} · {experience.location}</p>
                  <p>{experience.summary}</p>
                  <p className="entry-results">{experience.outcomes.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="leadership">
          <h2>Leadership &amp; Honors</h2>
          <ol className="experience-list leadership-list">
            {leadership.map((item) => (
              <li key={`${item.organization}-${item.role}`}>
                <span className="entry-date">{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="entry-organization">
                    {item.organization}{item.location ? ` · ${item.location}` : ""}
                  </p>
                  <p>{item.summary}</p>
                  <p className="entry-results">{item.highlights.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="writing">
          <h2>Engineering Notes</h2>
          <ul className="note-list">
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <a href={`/blog#note-${index + 1}`}><strong>{post.title}</strong></a>
                  <p>{post.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills">
          <h2>Technical Skills</h2>
          <dl className="skills-list">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.values.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Last updated August 2026 · <a href={email?.href}>Contact</a></small>
      </footer>
    </div>
  );
}
