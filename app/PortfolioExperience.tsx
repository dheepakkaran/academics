"use client";

import { useMemo, useState } from "react";
import { SkillFlowField } from "./SkillFlowField";
import {
  blogPosts,
  experiences,
  externalLinks,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

const navigation = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Notes", href: "/blog" },
  { label: "Résumé", href: "/resume.pdf" },
];

export function PortfolioExperience() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) return projects;
    return projects.filter((project) =>
      [
        project.title,
        project.category,
        project.premise,
        project.method,
        project.outcome,
        project.metric,
        ...project.stack,
      ].join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <div className="bw-site">
      <SkillFlowField />
      <a className="skip-link" href="#work">Skip to selected work</a>

      <header className="plain-header">
        <a className="plain-wordmark" href="#profile">
          <strong>Dheepak Karan</strong>
          <span>Engineer / Researcher</span>
        </a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.href.endsWith(".pdf") ? { download: true } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="plain-main">
        <section id="profile" className="plain-hero" aria-labelledby="profile-title">
          <div className="hero-statement">
            <p className="mono-label">Dheepak Karan · Boston, Massachusetts</p>
            <h1 id="profile-title">Software systems.<br />Machine learning.<br />Engineering that moves.</h1>
            <p className="hero-summary">
              Software Engineer and MS ECE candidate at Northeastern University. I work across
              backend infrastructure, resource-efficient AI, intelligent networks and industrial control.
            </p>
            <div className="inline-links" aria-label="Profile links">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(!link.href.startsWith("mailto:")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="field-guide" aria-label="Interactive background instructions">
            <span>Interactive skill field</span>
            <p>Move the cursor through the field. Skills compress, connect and follow its flow.</p>
            <i aria-hidden="true">＋</i>
          </div>
        </section>

        <section className="metric-strip" aria-label="Selected engineering metrics">
          {profileMetrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <div className="document-layout">
          <aside className="document-index">
            <p>Index</p>
            <nav aria-label="Document sections">
              <a href="#work"><span>01</span> Selected work</a>
              <a href="#experience"><span>02</span> Experience</a>
              <a href="#writing"><span>03</span> Writing</a>
              <a href="#skills"><span>04</span> Skills</a>
              <a href="#contact"><span>05</span> Contact</a>
            </nav>
            <p className="document-status">MS ECE · 3.926 CGPA<br />Expected May 2028</p>
          </aside>

          <div className="document-content">
            <section id="work" className="plain-section" aria-labelledby="work-title">
              <header className="plain-section-heading">
                <div>
                  <p className="mono-label">01 / Selected work</p>
                  <h2 id="work-title">Research &amp; engineering</h2>
                </div>
                <span>{projects.length} records</span>
              </header>

              <label className="line-search">
                <span>Search</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Projects, methods, technologies…"
                  aria-label="Search projects"
                />
                {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
              </label>

              <div className="plain-records">
                {filteredProjects.map((project, index) => (
                  <article key={project.title} className="work-record">
                    <span className="record-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="record-copy">
                      <p className="record-meta">{project.category} / {project.date}</p>
                      <h3>{project.title}</h3>
                      <p>{project.premise}</p>
                      <details>
                        <summary>Read method and outcome <span aria-hidden="true">＋</span></summary>
                        <div>
                          <p><b>Method</b>{project.method}</p>
                          <p><b>Outcome</b>{project.outcome}</p>
                          <p><b>Stack</b>{project.stack.join(" · ")}</p>
                        </div>
                      </details>
                    </div>
                    <div className="record-result">
                      <span>Result</span>
                      <strong>{project.metric}</strong>
                    </div>
                  </article>
                ))}
                {filteredProjects.length === 0 && (
                  <p className="no-results">No engineering records match “{query}”.</p>
                )}
              </div>
            </section>

            <section id="experience" className="plain-section" aria-labelledby="experience-title">
              <header className="plain-section-heading">
                <div>
                  <p className="mono-label">02 / Background</p>
                  <h2 id="experience-title">Education &amp; experience</h2>
                </div>
              </header>

              <div className="timeline-list">
                {experiences.map((experience) => (
                  <article key={`${experience.organization}-${experience.role}`}>
                    <time>{experience.period}</time>
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="organization">{experience.organization} / {experience.location}</p>
                      <p>{experience.summary}</p>
                      <p className="outcomes">{experience.outcomes.join(" · ")}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="writing" className="plain-section" aria-labelledby="writing-title">
              <header className="plain-section-heading">
                <div>
                  <p className="mono-label">03 / Notebook</p>
                  <h2 id="writing-title">Engineering notes</h2>
                </div>
                <a href="/blog">Open notebook ↗</a>
              </header>

              <ol className="writing-list">
                {blogPosts.map((post, index) => (
                  <li key={post.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p>{post.category}</p>
                      <h3><a href={`/blog#note-${index + 1}`}>{post.title}</a></h3>
                      <p>{post.summary}</p>
                    </div>
                    <a href={`/blog#note-${index + 1}`} aria-label={`Read ${post.title}`}>↗</a>
                  </li>
                ))}
              </ol>
            </section>

            <section id="skills" className="plain-section" aria-labelledby="skills-title">
              <header className="plain-section-heading">
                <div>
                  <p className="mono-label">04 / Technical index</p>
                  <h2 id="skills-title">Methods &amp; tools</h2>
                </div>
              </header>

              <dl className="plain-skills">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.values.join(" / ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="contact" className="plain-contact" aria-labelledby="contact-title">
              <p className="mono-label">05 / Contact</p>
              <h2 id="contact-title">Let’s discuss a difficult engineering problem.</h2>
              <a href="mailto:elumalaisanthakuma.d@northeastern.edu">
                elumalaisanthakuma.d@northeastern.edu <span aria-hidden="true">↗</span>
              </a>
            </section>
          </div>
        </div>
      </main>

      <footer className="plain-footer">
        <span>© 2026 Dheepak Karan</span>
        <span>Boston, Massachusetts / Updated August 2026</span>
      </footer>
    </div>
  );
}
