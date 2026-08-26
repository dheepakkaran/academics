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

      <header>
        <h1>Dheepak Karan</h1>
        <p><strong>Software Engineer / MS Electrical &amp; Computer Engineering Candidate</strong></p>
        <p>Northeastern University · Boston, Massachusetts · Expected May 2028</p>
        <nav aria-label="Primary navigation">
          <a href="#profile">Profile</a> · <a href="#work">Work</a> · <a href="#experience">Experience</a> · <a href="#skills">Skills</a> · <a href="/blog">Notes</a> · <a href="/resume.pdf" download>Résumé</a>
        </nav>
        <p>
          {externalLinks.map((link, index) => (
            <span key={link.label}>
              {index > 0 && " · "}
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
        </p>
      </header>

      <main>
        <section id="profile" aria-labelledby="profile-title">
          <h2 id="profile-title">Profile</h2>
          <p>
            Software engineer working across backend infrastructure, resource-efficient machine learning,
            intelligent networks and industrial control. Currently pursuing an MS in Electrical and
            Computer Engineering at Northeastern University.
          </p>
          <h3>Selected results</h3>
          <ul>
            {profileMetrics.map((metric) => (
              <li key={metric.label}><strong>{metric.value}</strong> — {metric.label}</li>
            ))}
          </ul>
        </section>

        <section id="work" aria-labelledby="work-title">
          <h2 id="work-title">Selected work</h2>
          {projects.map((project) => (
            <article key={project.title}>
              <h3>{project.title}</h3>
              <p><strong>{project.category}</strong> · {project.date}</p>
              <p>{project.premise}</p>
              <p><strong>Method:</strong> {project.method}</p>
              <p><strong>Outcome:</strong> {project.outcome}</p>
              <p><strong>Key result:</strong> {project.metric}</p>
              <p><strong>Tools:</strong> {project.stack.join(", ")}</p>
            </article>
          ))}
          <p><a href="https://github.com/dheepakkaran" target="_blank" rel="noreferrer">View GitHub profile</a></p>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Education and experience</h2>
          {experiences.map((experience) => (
            <article key={`${experience.organization}-${experience.role}`}>
              <h3>{experience.role}</h3>
              <p><strong>{experience.organization}</strong> · {experience.location} · {experience.period}</p>
              <p>{experience.summary}</p>
              <ul>
                {experience.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
              <p><strong>Tools and topics:</strong> {experience.stack.join(", ")}</p>
            </article>
          ))}
        </section>

        <section id="writing" aria-labelledby="writing-title">
          <h2 id="writing-title">Engineering notes</h2>
          <ol>
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <a href={`/blog#note-${index + 1}`}><strong>{post.title}</strong></a>
                <br />
                {post.summary}
              </li>
            ))}
          </ol>
          <p><a href="/blog">Read all notes</a></p>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          {skillGroups.map((group) => (
            <p key={group.label}><strong>{group.label}:</strong> {group.values.join(", ")}</p>
          ))}
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p><a href="mailto:elumalaisanthakuma.d@northeastern.edu">elumalaisanthakuma.d@northeastern.edu</a></p>
        </section>
      </main>

      <footer>
        <p>© 2026 Dheepak Karan · Boston, Massachusetts</p>
      </footer>
    </div>
  );
}
