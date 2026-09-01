import {
  blogPosts,
  coursework,
  experiences,
  externalLinks,
  leadership,
  profileMetrics,
  projects,
  researchInterests,
  skillGroups,
} from "./portfolio-data";
import ProfileHeader from "./profile-header";

const github = externalLinks.find((link) => link.label === "GitHub");
const education = experiences.filter((entry) => entry.kind === "education");
const professionalExperience = experiences.filter((entry) => entry.kind === "experience");
const featuredProjects = projects.slice(0, 3);
const completedCourses = coursework.filter((course) => course.status === "Completed");
const registeredCourses = coursework.filter((course) => course.status === "Registered");
const teachingAndAcademicService = leadership.filter((item) => item.role !== "Departmental Sports Coordinator");
const additionalLeadership = leadership.filter((item) => item.role === "Departmental Sports Coordinator");

export default function Home() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <ProfileHeader active="home" />

      <main id="main">
        <section id="home" className="academic-summary">
          <p>
            I am an MS ECE student at Northeastern University working across machine learning, computer vision,
            algorithms and engineering systems. I am interested in upcoming <strong>research and teaching opportunities</strong> where I can contribute careful experimentation, production software experience and hands-on student support.
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

        <section id="interests">
          <h2>Research &amp; Teaching Interests</h2>
          <dl className="academic-area-list">
            {researchInterests.map((interest) => (
              <div key={interest.title}>
                <dt>{interest.title}</dt>
                <dd>{interest.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="courses">
          <h2>Academic Preparation</h2>
          <p>Graduate concentration: <strong>Machine Learning, Computer Vision &amp; Algorithms</strong>.</p>
          <dl className="academic-area-list course-overview">
            <div>
              <dt>Completed</dt>
              <dd>{completedCourses.map((course) => `${course.code} ${course.title} (${course.grade})`).join(" · ")}</dd>
            </div>
            <div>
              <dt>Fall 2026</dt>
              <dd>{registeredCourses.map((course) => `${course.code} ${course.title}`).join(" · ")}</dd>
            </div>
          </dl>
          <p className="section-link"><a href="/academics">Academics and teaching service →</a></p>
        </section>

        <section id="work">
          <h2>Selected Projects</h2>
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
                <p><strong>Method:</strong> {project.method}</p>
                <p><strong>Result:</strong> {project.outcome}</p>
                <p className="project-links">
                  <span className="result">[{project.metric}]</span>{" · "}
                  <span>{project.stack.join(" · ")}</span>
                  {project.href ? <>{" · "}<a href={project.href} target="_blank" rel="noreferrer">Repository ↗</a></> : index === 0 && github?.href ? <>{" · "}<a href={github.href} target="_blank" rel="noreferrer">Code profile</a></> : null}
                </p>
              </li>
            ))}
          </ol>
          <p className="section-link"><a href="/projects">View all {projects.length} projects →</a></p>
        </section>

        <section id="teaching">
          <h2>Teaching &amp; Academic Service</h2>
          <ol className="experience-list leadership-list">
            {teachingAndAcademicService.map((item) => (
              <li key={`${item.organization}-${item.role}`}>
                <span className="entry-date">{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="entry-organization">{item.organization}</p>
                  <p>{item.summary}</p>
                  <p className="entry-results">{item.highlights.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="experience">
          <h2>Academic &amp; Professional Background</h2>
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
          <h2>Additional Leadership</h2>
          <ol className="experience-list leadership-list">
            {additionalLeadership.map((item) => (
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
        <small>
          © 2026 Dheepak Karan · Last updated August 2026 · Interface inspired by{" "}
          <a href="https://wyshi.github.io/index.html" target="_blank" rel="noreferrer">
            Prof. Weiyan Shi&apos;s portfolio
          </a>
        </small>
      </footer>
    </div>
  );
}
