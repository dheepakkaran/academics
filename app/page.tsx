import {
  blogPosts,
  experiences,
  externalLinks,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

export default function Home() {
  return (
    <div className="text-document">
      <a className="skip-link" href="#work">Skip to work</a>

      <header className="dossier-header">
        <p className="document-id">DK / ENGINEERING DOSSIER / REV. 2026.08</p>
        <h1>Dheepak Karan</h1>
        <dl className="document-meta">
          <div><dt>Status</dt><dd>MS ECE candidate / Software engineer</dd></div>
          <div><dt>Location</dt><dd>Boston, Massachusetts</dd></div>
          <div><dt>Affiliation</dt><dd>Northeastern University</dd></div>
          <div><dt>Focus</dt><dd>Backend / ML / Networks / Industrial control</dd></div>
          <div><dt>Graduation</dt><dd>Expected May 2028</dd></div>
        </dl>
        <nav aria-label="Primary navigation">
          <a href="#profile">01_Profile</a> · <a href="#work">02_Work</a> · <a href="#experience">03_Experience</a> · <a href="#writing">04_Notes</a> · <a href="#skills">05_Skills</a> · <a href="#contact">06_Contact</a>
        </nav>
        <p className="document-links">
          {externalLinks.map((link, index) => (
            <span key={link.label}>
              {index > 0 && " / "}
              <a
                href={link.href}
                {...(!link.href.startsWith("mailto:")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </span>
          ))}
          {" / "}<a href="/resume.pdf" download>Résumé PDF</a>
        </p>
      </header>

      <main>
        <section id="profile" aria-labelledby="profile-title">
          <h2 id="profile-title">01_PROFILE</h2>
          <p>
            Software engineer working across backend infrastructure, resource-efficient machine learning,
            intelligent networks and industrial control. Currently pursuing an MS in Electrical and
            Computer Engineering at Northeastern University.
          </p>
          <h3>Verified signals</h3>
          <ol className="evidence-list">
            {profileMetrics.map((metric, index) => (
              <li key={metric.label}>
                <span>{`[EVIDENCE ${String(index + 1).padStart(2, "0")}]`}</span>{" "}
                <strong>{metric.value}</strong> — {metric.label}
              </li>
            ))}
          </ol>
        </section>

        <section id="work" aria-labelledby="work-title">
          <h2 id="work-title">02_SELECTED WORK</h2>
          {projects.map((project, index) => (
            <article key={project.title}>
              <p className="record-id">{`PROJECT ${String(index + 1).padStart(2, "0")} / ${project.date}`}</p>
              <h3>{project.title}</h3>
              <dl className="record-fields">
                <div><dt>Field</dt><dd>{project.category}</dd></div>
                <div><dt>Problem</dt><dd>{project.premise}</dd></div>
                <div><dt>Method</dt><dd>{project.method}</dd></div>
                <div><dt>Outcome</dt><dd>{project.outcome}</dd></div>
                <div><dt>Result</dt><dd><strong>{project.metric}</strong></dd></div>
                <div><dt>Tools</dt><dd>{project.stack.join(" / ")}</dd></div>
              </dl>
            </article>
          ))}
          <p className="reference-line">[SOURCE] <a href="https://github.com/dheepakkaran" target="_blank" rel="noreferrer">github.com/dheepakkaran</a></p>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">03_EDUCATION &amp; EXPERIENCE</h2>
          {experiences.map((experience, index) => (
            <article key={`${experience.organization}-${experience.role}`}>
              <p className="record-id">{`RECORD ${String(index + 1).padStart(2, "0")} / ${experience.period}`}</p>
              <h3>{experience.role}</h3>
              <dl className="record-fields">
                <div><dt>Organization</dt><dd>{experience.organization}</dd></div>
                <div><dt>Location</dt><dd>{experience.location}</dd></div>
                <div><dt>Scope</dt><dd>{experience.summary}</dd></div>
                <div><dt>Evidence</dt><dd>{experience.outcomes.join(" / ")}</dd></div>
                <div><dt>Tools</dt><dd>{experience.stack.join(" / ")}</dd></div>
              </dl>
            </article>
          ))}
        </section>

        <section id="writing" aria-labelledby="writing-title">
          <h2 id="writing-title">04_ENGINEERING NOTES</h2>
          <ol className="document-list">
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <span>{`[NOTE ${String(index + 1).padStart(2, "0")}]`}</span>{" "}
                <a href={`/blog#note-${index + 1}`}><strong>{post.title}</strong></a>
                <br />
                {post.summary}
              </li>
            ))}
          </ol>
          <p className="reference-line"><a href="/blog">Open complete notebook →</a></p>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">05_TECHNICAL INDEX</h2>
          <dl className="record-fields">
            {skillGroups.map((group) => (
              <div key={group.label}><dt>{group.label}</dt><dd>{group.values.join(" / ")}</dd></div>
            ))}
          </dl>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">06_CONTACT</h2>
          <dl className="record-fields">
            <div><dt>Email</dt><dd><a href="mailto:elumalaisanthakuma.d@northeastern.edu">elumalaisanthakuma.d@northeastern.edu</a></dd></div>
            <div><dt>Résumé</dt><dd><a href="/resume.pdf" download>Download original PDF</a></dd></div>
          </dl>
        </section>
      </main>

      <footer>
        <p>DOCUMENT END / DK-2026 / FACTS VERIFIED AGAINST RÉSUMÉ</p>
      </footer>
    </div>
  );
}
