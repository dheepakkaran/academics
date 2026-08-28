import {
  blogPosts,
  experiences,
  externalLinks,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

const email = externalLinks.find((link) => link.label === "Email");
const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");
const credly = externalLinks.find((link) => link.label === "Credly");

export default function Home() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="academic-intro">
        <div className="academic-avatar" aria-hidden="true">DK</div>
        <div className="academic-bio">
          <h1>Dheepak Karan</h1>
          <p><a href={email?.href}>elumalaisanthakuma.d@northeastern.edu</a></p>
          <p>Software Engineer &amp; MS ECE Candidate</p>
          <p><a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a>, Boston</p>
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
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="/blog">Notes</a>
        <a href="/resume.pdf" download>CV</a>
      </nav>

      <main id="main">
        <section id="home" className="academic-summary">
          <p>
            I am an MS candidate in <a href="https://ece.northeastern.edu/" target="_blank" rel="noreferrer">Electrical and Computer Engineering</a> at
            Northeastern University. I am interested in <strong>backend systems</strong>, <strong>machine learning</strong>, <strong>intelligent networks</strong> and <strong>industrial automation</strong>.
            My work focuses on building practical systems under real compute, latency and safety constraints.
          </p>
        </section>

        <section id="projects">
          <h2>Research &amp; Engineering Projects</h2>
          <ul className="plain-list">
            {projects.map((project) => (
              <li key={project.title}>
                <strong>{project.title}</strong>: {project.premise}{" "}
                {project.method} <span className="result">[{project.metric}]</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Updates</h2>
          <ul className="plain-list">
            <li>[2026.05] Completed a 4,415-sample Tanglish fine-tuning study on Llama 3.1 8B using QLoRA on one NVIDIA T4.</li>
            <li>[2026.05] Reduced test perplexity from 57.05 to 12.40 with a 26 MB adapter and sub-three-second responses.</li>
            <li>[2026.04] Compared FIFO, Priority, Weighted Fair and DKernelUCB schedulers in the FairShare-WiFi simulation.</li>
            <li>[2026] Began graduate study in Electrical and Computer Engineering at Northeastern University.</li>
            <li>[2022–2023] Improved API performance by 30% and reduced database latency by 25% at Guardian Life.</li>
          </ul>
        </section>

        <section id="experience">
          <h2>About Me</h2>
          <ul className="plain-list">
            {experiences.map((experience) => (
              <li key={`${experience.organization}-${experience.role}`}>
                <strong>{experience.role}</strong>, {experience.organization}, {experience.location}, {experience.period}. {experience.summary}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Selected Results</h2>
          <ul className="plain-list">
            {profileMetrics.map((metric) => (
              <li key={metric.label}><strong>{metric.value}</strong> — {metric.label}</li>
            ))}
            <li><strong>85%</strong> automated-test coverage on production backend work.</li>
          </ul>
        </section>

        <section>
          <h2>Engineering Notes</h2>
          <ul className="plain-list">
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <a href={`/blog#note-${index + 1}`}><strong>{post.title}</strong></a>: {post.summary}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Technical Skills</h2>
          <ul className="plain-list">
            {skillGroups.map((group) => (
              <li key={group.label}><strong>{group.label}</strong>: {group.values.join(", ")}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Last updated August 2026</small>
      </footer>
    </div>
  );
}
