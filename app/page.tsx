import {
  blogPosts,
  coursework,
  experiences,
  externalLinks,
  leadership,
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
          <h2>About</h2>
          <p>
            I am an M.S. student in Electrical and Computer Engineering at Northeastern University. I build reliable software and machine-learning systems under real compute, latency and safety constraints.
          </p>
          <p className="interest-line"><strong>Areas of interest:</strong> resource-efficient machine learning, multilingual language models, computer vision, algorithms, network scheduling and reliable backend systems.</p>
        </section>

        <section id="courses">
          <h2>Graduate Coursework</h2>
          <div className="coursework-groups">
            {(["Spring 2026", "Fall 2026"] as const).map((semester) => (
              <div className="coursework-term" key={semester}>
                <h3>{semester}</h3>
                <ul className="coursework-list">
                  {coursework.filter((course) => course.semester === semester).map((course) => (
                    <li key={course.code}>
                      <span className="coursework-code">{course.code}</span>
                      <div className="coursework-entry">
                        <strong>{course.title}</strong>
                        <a href={course.professorHref} target="_blank" rel="noreferrer">
                          {course.professor} ↗
                        </a>
                      </div>
                      <span className={`coursework-result${course.status === "Registered" ? " registered" : ""}`}>
                        {course.percentage && course.grade ? `${course.percentage} · ${course.grade}` : course.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="work">
          <h2>Selected Engineering Work</h2>
          <ol className="project-list compact-projects">
            {featuredProjects.map((project, index) => (
              <li key={project.title}>
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <span>{project.date}</span>
                </div>
                <p className="project-field">
                  {project.category}{project.affiliation ? ` · ${project.affiliation}` : ""}
                </p>
                <p>{project.method} {project.outcome}</p>
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
          <h2>Education &amp; Experience</h2>
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
          <h3 className="subsection-title">Industry Experience</h3>
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
          <h2>Service &amp; Leadership</h2>
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
          <h2>Technical Notes</h2>
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
          <h2>Methods &amp; Tools</h2>
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
