import {
  blogPosts,
  coursework,
  experiences,
  externalLinks,
  leadership,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";
import ProfileHeader from "./profile-header";

const email = externalLinks.find((link) => link.label === "Email");
const github = externalLinks.find((link) => link.label === "GitHub");
const education = experiences.filter((entry) => entry.kind === "education");
const professionalExperience = experiences.filter((entry) => entry.kind === "experience");
const featuredProjects = projects.slice(0, 3);

export default function Home() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <ProfileHeader active="home" />

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

        <section id="courses">
          <h2>Graduate Courses</h2>
          <div className="course-semesters">
            {(["Spring 2026", "Fall 2026"] as const).map((semester) => (
              <div className="course-semester" key={semester}>
                <h3>{semester}</h3>
                <ul className="course-list">
                  {coursework.filter((course) => course.semester === semester).map((course) => (
                    <li key={course.code}>
                      <span className="course-code">{course.code}</span>
                      <div className="course-body">
                        <strong className="course-title">{course.title}</strong>
                        <div className="course-meta">
                          <a className="course-professor" href={course.professorHref} target="_blank" rel="noreferrer">
                            Prof. {course.professor} ↗
                          </a>
                          <p className="course-facts">
                            {course.status === "Registered" ? <span className="course-status">Registered</span> : null}
                            {course.percentage ? <span>{course.percentage}</span> : null}
                            {course.grade ? <span>Grade {course.grade}</span> : null}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
                  <p className="entry-organization">
                    {experience.organization}
                    {experience.organizationNote ? <span className="entry-organization-note"> ({experience.organizationNote})</span> : null}
                    {" · "}{experience.location}
                  </p>
                  <p>{experience.summary}</p>
                  {experience.details ? (
                    <ul className="experience-details">
                      {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  ) : null}
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
                  <p className="entry-organization">
                    {experience.organization}
                    {experience.organizationNote ? <span className="entry-organization-note"> ({experience.organizationNote})</span> : null}
                    {" · "}{experience.location}
                  </p>
                  <p>{experience.summary}</p>
                  {experience.details ? (
                    <ul className="experience-details">
                      {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  ) : null}
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
