"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  blogPosts,
  experiences,
  externalLinks,
  profileMetrics,
  projects,
  skillGroups,
} from "./portfolio-data";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Notes", href: "#notes" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "/resume.pdf" },
];

const trackedSections = ["home", "about", "work", "notes", "skills", "contact"];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PromptHeading({
  number,
  eyebrow,
  children,
  description,
}: {
  number: string;
  eyebrow: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="prompt-heading">
      <div className="prompt-label"><span>{number}</span><i aria-hidden="true">→</i>{eyebrow}</div>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PortfolioExperience() {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, mass: 0.25 });
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const glow = useMotionTemplate`radial-gradient(540px circle at ${pointerX}px ${pointerY}px, rgba(130, 92, 255, 0.14), transparent 68%)`;

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pointerX, pointerY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -58%", threshold: [0, 0.2, 0.55] },
    );

    trackedSections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <div className="ambient-background" aria-hidden="true">
        <span className="ambient-orb orb-one" />
        <span className="ambient-orb orb-two" />
        <span className="ambient-orb orb-three" />
        {!reducedMotion && <motion.span className="pointer-glow" style={{ background: glow }} />}
      </div>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Dheepak Karan — home">
          <span>DK</span>
          <strong>Dheepak Karan</strong>
        </a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => {
            const id = item.href.startsWith("#") ? item.href.slice(1) : "";
            return (
              <a
                key={item.label}
                href={item.href}
                className={id === activeSection ? "active" : undefined}
                {...(item.href.endsWith(".pdf") ? { download: true } : {})}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <a className="header-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </header>

      <nav className="section-rail" aria-label="Page sections">
        {trackedSections.map((id, index) => (
          <a key={id} href={`#${id}`} className={activeSection === id ? "active" : undefined}>
            <span>0{index + 1}</span><i />
            <b>{id}</b>
          </a>
        ))}
      </nav>

      <main>
        <section id="home" className="hero shell" aria-labelledby="hero-title">
          <Reveal className="hero-content">
            <div className="status-pill"><i aria-hidden="true" /> Boston · MS ECE at Northeastern</div>
            <p className="hero-kicker">Software engineer · Machine learning · Intelligent systems</p>
            <h1 id="hero-title">I build software for systems that <em>have to work.</em></h1>
            <p className="hero-intro">
              I&apos;m Dheepak Karan—an engineer working across backend systems, applied machine learning and industrial automation.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#work">See my work <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="/resume.pdf" download>Download résumé <span aria-hidden="true">↗</span></a>
            </div>
          </Reveal>

          <Reveal className="hero-answer-card">
            <div className="answer-card-top"><span>Current focus</span><b>01</b></div>
            <p>Reliable software and ML systems that connect research with practical constraints.</p>
            <div className="answer-card-meta">
              <span><small>Based in</small>Boston, MA</span>
              <span><small>Graduating</small>May 2028</span>
            </div>
          </Reveal>

          <a className="scroll-hint" href="#about"><kbd>↓</kbd> Scroll to continue</a>
        </section>

        <section id="about" className="prompt-section about-section" aria-labelledby="about-title">
          <div className="section-shell">
            <Reveal>
              <PromptHeading
                number="01"
                eyebrow="About"
                description="One engineering foundation applied across physical infrastructure, production software and intelligent systems."
              >
                <span id="about-title">What do I bring to the table?</span>
              </PromptHeading>
            </Reveal>

            <Reveal className="metric-grid">
              {profileMetrics.map((metric, index) => (
                <article key={metric.label}>
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.label}</p>
                </article>
              ))}
            </Reveal>

            <div className="experience-list" aria-label="Education and experience">
              {experiences.map((experience, index) => (
                <Reveal key={`${experience.organization}-${experience.role}`}>
                  <article className="experience-row">
                    <div className="experience-key"><kbd>{String.fromCharCode(65 + index)}</kbd><span>{experience.period}</span></div>
                    <div className="experience-role">
                      <h3>{experience.role}</h3>
                      <p>{experience.organization} · {experience.location}</p>
                    </div>
                    <div className="experience-detail">
                      <p>{experience.summary}</p>
                      <ul>{experience.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="prompt-section work-section" aria-labelledby="work-title">
          <div className="section-shell">
            <Reveal>
              <PromptHeading
                number="02"
                eyebrow="Selected work"
                description="Three projects shaped by different constraints: compute, shared resources and physical safety."
              >
                <span id="work-title">What have I built?</span>
              </PromptHeading>
            </Reveal>

            <div className="project-grid">
              {projects.map((project, index) => (
                <Reveal key={project.title} className={index === 0 ? "project-featured" : ""}>
                  <details className="project-card">
                    <summary>
                      <div className="card-topline"><span>{project.category}</span><small>{project.date}</small></div>
                      <h3>{project.title}</h3>
                      <p>{project.premise}</p>
                      <div className="project-metric"><span>Key signal</span><strong>{project.metric}</strong></div>
                      <div className="open-project"><kbd>{String.fromCharCode(65 + index)}</kbd><span>View case study</span><i aria-hidden="true">↗</i></div>
                    </summary>
                    <div className="project-details">
                      <div><span>Approach</span><p>{project.method}</p></div>
                      <div><span>Outcome</span><p>{project.outcome}</p></div>
                      <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                      <a href="https://github.com/dheepakkaran" target="_blank" rel="noreferrer">Explore GitHub <span aria-hidden="true">↗</span></a>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="prompt-section notes-section" aria-labelledby="notes-title">
          <div className="section-shell">
            <Reveal>
              <PromptHeading
                number="03"
                eyebrow="Engineering notes"
                description="Short-form writing about the decisions behind the work—not just the finished result."
              >
                <span id="notes-title">What am I thinking about?</span>
              </PromptHeading>
            </Reveal>

            <div className="notes-list">
              {blogPosts.map((post, index) => (
                <Reveal key={post.title}>
                  <details className="note-card">
                    <summary>
                      <div className="note-index">0{index + 1}</div>
                      <div className="note-title"><span>{post.category}</span><h3>{post.title}</h3><p>{post.summary}</p></div>
                      <div className="note-action"><span>Read note</span><i aria-hidden="true">+</i></div>
                    </summary>
                    <div className="note-body">
                      <blockquote>{post.takeaway}</blockquote>
                      <div>{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="prompt-section skills-section" aria-labelledby="skills-title">
          <div className="section-shell">
            <Reveal>
              <PromptHeading
                number="04"
                eyebrow="Toolkit"
                description="A focused stack for building, measuring and improving software and machine-learning systems."
              >
                <span id="skills-title">What do I work with?</span>
              </PromptHeading>
            </Reveal>

            <Reveal className="skills-grid">
              {skillGroups.map((group, index) => (
                <article key={group.label}>
                  <div><kbd>{String.fromCharCode(65 + index)}</kbd><h3>{group.label}</h3></div>
                  <ul>{group.values.map((value) => <li key={value}>{value}</li>)}</ul>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="section-shell">
            <Reveal>
              <div className="prompt-label light"><span>05</span><i aria-hidden="true">→</i>Contact</div>
              <h2 id="contact-title">Want to build something useful together?</h2>
              <p>Tell me what you&apos;re working on, what&apos;s difficult about it, and where engineering can create leverage.</p>
              <a className="contact-button" href="mailto:elumalaisanthakuma.d@northeastern.edu">Start a conversation <span aria-hidden="true">↗</span></a>
            </Reveal>

            <Reveal className="contact-links">
              {externalLinks.map((link) => (
                <a key={link.label} href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  <span>{link.note}</span><strong>{link.label}</strong><i aria-hidden="true">↗</i>
                </a>
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell">
          <a href="#home">Dheepak Karan</a>
          <span>Software · Machine learning · Systems</span>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
