"use client";

import { useMemo, useState } from "react";
import { CursorTrails } from "./CursorTrails";
import {
  blogPosts,
  experiences,
  externalLinks,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

const navigation = [
  { label: "Work", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "/resume.pdf" },
];

const researchAreas = [
  "Backend systems",
  "Machine learning",
  "Intelligent networks",
  "Industrial automation",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

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

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return blogPosts;
    return blogPosts.filter((post) =>
      [post.category, post.title, post.summary, post.takeaway, ...post.body]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const resultCount = filteredProjects.length + filteredPosts.length;

  return (
    <div className="research-site">
      <CursorTrails />
      <a className="skip-link" href="#research">Skip to research and engineering</a>

      <div className="research-shell">
        <header className="research-topbar">
          <a className="wordmark" href="#profile" aria-label="Dheepak Karan — profile home">
            <span>DK</span>
            <span>
              <strong>Dheepak Karan</strong>
              <small>Research &amp; Engineering</small>
            </span>
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

        <div className="profile-layout" id="profile">
          <aside className="profile-column" aria-labelledby="profile-name">
            <div className="profile-avatar" aria-hidden="true">DK</div>
            <h1 id="profile-name">Dheepak Karan</h1>
            <p className="profile-role">Software Engineer &amp; MS ECE Candidate</p>
            <p className="profile-affiliation">
              Northeastern University<br />Boston, Massachusetts
            </p>

            <div className="profile-links" aria-label="Profile links">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(!link.href.startsWith("mailto:")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label} <Arrow />
                </a>
              ))}
              <a href="/resume.pdf" download>Download résumé <span aria-hidden="true">↓</span></a>
            </div>

            <section className="profile-aside-section" aria-labelledby="interests-title">
              <h2 id="interests-title">Areas of interest</h2>
              <ul>
                {researchAreas.map((area) => <li key={area}>{area}</li>)}
              </ul>
            </section>

            <section className="profile-aside-section availability" aria-labelledby="status-title">
              <h2 id="status-title">Current status</h2>
              <p><i aria-hidden="true" /> Graduate student · expected May 2028</p>
            </section>
          </aside>

          <main className="research-main">
            <section className="profile-overview" aria-labelledby="overview-title">
              <div className="overview-copy">
                <p className="section-kicker">Profile overview</p>
                <h2 id="overview-title">Engineering reliable systems across software, learning and physical infrastructure.</h2>
                <p>
                  My work spans production backend services, resource-efficient machine learning,
                  network scheduling and industrial control. I am currently pursuing an MS in
                  Electrical and Computer Engineering at Northeastern University.
                </p>
              </div>

              <table className="metric-table">
                <caption>Selected metrics</caption>
                <tbody>
                  {profileMetrics.map((metric) => (
                    <tr key={metric.label}>
                      <th scope="row">{metric.label}</th>
                      <td>{metric.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="research" className="record-section" aria-labelledby="research-title">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Selected work</p>
                  <h2 id="research-title">Research &amp; engineering</h2>
                </div>
                <span>{projects.length} records</span>
              </div>

              <label className="research-search">
                <span aria-hidden="true">⌕</span>
                <span className="sr-only">Search projects and notes</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects and notes"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>
                )}
              </label>

              <p className="result-summary" aria-live="polite">
                {normalizedQuery
                  ? `${resultCount} matching ${resultCount === 1 ? "record" : "records"}`
                  : "Showing all research, engineering and writing records"}
              </p>

              <div className="publication-list">
                {filteredProjects.map((project, index) => (
                  <article className="publication-row" key={project.title}>
                    <div className="record-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                    <div className="publication-copy">
                      <h3>{project.title}</h3>
                      <p className="publication-meta">{project.category} · {project.date}</p>
                      <p>{project.premise}</p>
                      <details>
                        <summary>Method and outcome</summary>
                        <div className="record-details">
                          <p><strong>Method.</strong> {project.method}</p>
                          <p><strong>Outcome.</strong> {project.outcome}</p>
                          <ul aria-label={`${project.title} technologies`}>
                            {project.stack.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </details>
                    </div>
                    <div className="publication-signal">
                      <span>Key result</span>
                      <strong>{project.metric}</strong>
                    </div>
                  </article>
                ))}
                {filteredProjects.length === 0 && (
                  <p className="empty-state">No project records match this search.</p>
                )}
              </div>
            </section>

            <section id="experience" className="record-section" aria-labelledby="experience-title">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Background</p>
                  <h2 id="experience-title">Education &amp; experience</h2>
                </div>
              </div>

              <div className="experience-records">
                {experiences.map((experience) => (
                  <article key={`${experience.organization}-${experience.role}`}>
                    <time>{experience.period}</time>
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="record-organization">{experience.organization} · {experience.location}</p>
                      <p>{experience.summary}</p>
                      <ul>
                        {experience.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="writing" className="record-section" aria-labelledby="writing-title">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Engineering notebook</p>
                  <h2 id="writing-title">Notes &amp; observations</h2>
                </div>
                <a href="/blog">Read all notes <Arrow /></a>
              </div>

              <div className="note-records">
                {filteredPosts.map((post, index) => (
                  <article key={post.title}>
                    <span className="note-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="publication-meta">{post.category}</p>
                      <h3><a href={`/blog#note-${index + 1}`}>{post.title}</a></h3>
                      <p>{post.summary}</p>
                    </div>
                  </article>
                ))}
                {filteredPosts.length === 0 && (
                  <p className="empty-state">No writing records match this search.</p>
                )}
              </div>
            </section>

            <section id="skills" className="record-section" aria-labelledby="skills-title">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Methods &amp; tools</p>
                  <h2 id="skills-title">Technical index</h2>
                </div>
              </div>

              <dl className="skills-index">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.values.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="contact-record" aria-labelledby="contact-title">
              <p className="section-kicker">Contact</p>
              <h2 id="contact-title">Open to thoughtful engineering conversations.</h2>
              <a href="mailto:elumalaisanthakuma.d@northeastern.edu">
                elumalaisanthakuma.d@northeastern.edu <Arrow />
              </a>
            </section>
          </main>
        </div>

        <footer className="research-footer">
          <span>© 2026 Dheepak Karan</span>
          <span>Last updated August 2026 · Boston, MA</span>
        </footer>
      </div>
    </div>
  );
}
