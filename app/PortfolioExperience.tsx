"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Act } from "./portfolio-data";
import { acts, externalLinks, projects, skillGroups } from "./portfolio-data";

const navigation = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "/resume.pdf" },
  { label: "Contact", href: "#contact" },
];

const headlineMetrics = [
  { value: "210 MW", label: "industrial control" },
  { value: "8B", label: "parameter LLM" },
  { value: "3.926", label: "graduate CGPA" },
  { value: "+30%", label: "API performance" },
];

function NetworkCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;
    const labels = ["FIFO", "PRIORITY", "WEIGHTED FAIR", "DKERNELUCB"];
    const colors = ["#ff6b4a", "#ffb65c", "#75a9ff", "#61d6c7"];

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);

      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0c1119";
      context.fillRect(0, 0, width, height);

      const left = Math.min(152, width * 0.31);
      const right = width - 22;
      const laneGap = height / 5;

      labels.forEach((label, lane) => {
        const y = laneGap * (lane + 1);
        context.font = "600 10px 'Space Grotesk Variable', sans-serif";
        context.fillStyle = "rgba(239, 243, 247, 0.58)";
        context.fillText(label, 18, y + 4);

        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.strokeStyle = "rgba(255,255,255,0.10)";
        context.lineWidth = 1;
        context.stroke();

        const packetCount = lane === 3 ? 8 : 6;
        for (let packet = 0; packet < packetCount; packet += 1) {
          const speed = [0.55, 0.78, 0.65, 0.7][lane];
          const phase = reducedMotion
            ? (packet + 1) / (packetCount + 1)
            : ((frame * speed + packet * 97 + lane * 41) % 620) / 620;
          const x = left + phase * (right - left);

          context.beginPath();
          context.arc(x, y, lane === 3 ? 4 : 3, 0, Math.PI * 2);
          context.fillStyle = colors[lane];
          context.shadowBlur = 12;
          context.shadowColor = colors[lane];
          context.fill();
          context.shadowBlur = 0;
        }
      });

      frame += 1;
      if (!reducedMotion && visibleRef.current) animationId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visibleRef.current;
      visibleRef.current = entry.isIntersecting;
      if (!wasVisible && entry.isIntersecting && !reducedMotion) draw();
    });
    observer.observe(canvas);
    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  return (
    <div className="network-visual" aria-label="Animated packet scheduling comparison">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="network-legend" aria-hidden="true">
        <span>throughput</span><span>latency</span><span>drops</span><span>fairness</span>
      </div>
    </div>
  );
}

function ExperienceChapter({ act, index, reducedMotion }: { act: Act; index: number; reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageBase = act.image?.replace("-1920.webp", "");
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.045, 1, 1.035]);
  const copyY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [22, 0, -18]);

  return (
    <motion.article
      ref={sectionRef}
      id={act.id}
      className={`experience-chapter tone-${act.tone}`}
      aria-labelledby={`${act.id}-title`}
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="chapter-media" style={reducedMotion ? undefined : { scale: imageScale }}>
        {act.image ? (
          <picture>
            <source
              srcSet={`${imageBase}-1280.avif 1280w, ${act.imageAvif} 1920w`}
              sizes="(max-width: 900px) 100vw, 48vw"
              type="image/avif"
            />
            <img
              src={act.image}
              srcSet={`${imageBase}-1280.webp 1280w, ${act.image} 1920w`}
              sizes="(max-width: 900px) 100vw, 48vw"
              alt=""
              loading="lazy"
              style={{ objectPosition: act.imagePosition }}
            />
          </picture>
        ) : (
          <div className="network-stage">
            <NetworkCanvas reducedMotion={reducedMotion} />
          </div>
        )}
        <span className="chapter-number" aria-hidden="true">{act.number}</span>
      </motion.div>

      <motion.div className="chapter-copy" style={reducedMotion ? undefined : { y: copyY }}>
        <div className="chapter-meta">
          <span>{act.eyebrow}</span>
          <span>{act.year}</span>
        </div>
        <h3 id={`${act.id}-title`}>{act.title}</h3>
        <p className="chapter-summary">{act.quote}</p>
        <div className="chapter-body">
          {act.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="chapter-metrics" aria-label={`${act.title} key outcomes`}>
          {act.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <ul className="stack-list" aria-label="Tools and technologies">
          {act.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </motion.div>
      <span className="chapter-order" aria-hidden="true">0{index + 1}</span>
    </motion.article>
  );
}

export function PortfolioExperience() {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeSection, setActiveSection] = useState("story");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 30, mass: 0.25 });
  const heroY = useTransform(scrollY, [0, 650], [0, 90]);
  const heroOpacity = useTransform(scrollY, [0, 520], [1, 0.18]);

  useEffect(() => {
    const ids = ["story", "experience", "work", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.55] },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to selected projects</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#story" aria-label="Dheepak Karan — back to top">
          <strong>DK</strong><span>Engineering portfolio</span>
        </a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => {
            const sectionId = item.href.startsWith("#") ? item.href.slice(1) : "";
            return (
              <a
                key={item.label}
                href={item.href}
                className={sectionId === activeSection ? "active" : undefined}
                {...(item.href.endsWith(".pdf") ? { download: true } : {})}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <a className="header-contact" href="mailto:elumalaisanthakuma.d@northeastern.edu">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section id="story" className="hero" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true">
            <picture>
              <source srcSet="/scenes/neyveli-1280.avif 1280w, /scenes/neyveli-1920.avif 1920w" sizes="100vw" type="image/avif" />
              <img src="/scenes/neyveli-1920.webp" srcSet="/scenes/neyveli-1280.webp 1280w, /scenes/neyveli-1920.webp 1920w" sizes="100vw" alt="" fetchPriority="high" />
            </picture>
          </div>
          <div className="hero-scrim" aria-hidden="true" />

          <motion.div className="hero-content shell" style={reducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}>
            <div className="hero-status"><i aria-hidden="true" /> Boston, Massachusetts · MS ECE at Northeastern</div>
            <p className="hero-kicker">Software Engineering · Machine Learning · Intelligent Systems</p>
            <h1 id="hero-title">Dheepak<br /><span>Karan</span></h1>
            <p className="hero-intro">
              I build reliable software and machine-learning systems—from industrial control logic for a 210 MW generator to fine-tuning an 8-billion-parameter language model.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">View selected work</a>
              <a className="button button-secondary" href="/resume.pdf" download>Download résumé</a>
            </div>
            <div className="hero-social" aria-label="Professional profiles">
              {externalLinks.slice(0, 3).map((link) => (
                <a key={link.label} href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {link.label}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </motion.div>

          <div className="hero-side-note" aria-hidden="true">ZERO TO SIGNAL · 2026</div>
        </section>

        <section className="proof-strip" aria-label="Career highlights">
          <div className="shell">
            {headlineMetrics.map((metric) => (
              <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section" aria-labelledby="experience-title">
          <div className="shell experience-intro">
            <div>
              <p className="eyebrow">Experience &amp; trajectory</p>
              <h2 id="experience-title">Engineering across physical, software and intelligent systems.</h2>
            </div>
            <div className="experience-note">
              <p>One technical foundation, applied across industrial automation, production backend systems and machine learning.</p>
              <span>Verified professional highlights · 2022—2028</span>
            </div>
          </div>

          <nav className="chapter-nav shell" aria-label="Experience chapters">
            {acts.map((act) => <a key={act.id} href={`#${act.id}`}><span>{act.number}</span>{act.id}</a>)}
          </nav>

          <div className="shell experience-list">
            {acts.map((act, index) => (
              <ExperienceChapter key={act.id} act={act} index={index} reducedMotion={reducedMotion} />
            ))}
          </div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">Selected projects</p><h2 id="work-title">Work defined by measurable outcomes.</h2></div>
              <p>Each case study connects an engineering constraint to a clear implementation and an evidence-backed result.</p>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <details className="project" key={project.title}>
                  <summary>
                    <span className="project-index">0{index + 1}</span>
                    <span className="project-title"><strong>{project.title}</strong><small>{project.date}</small></span>
                    <span className="project-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="project-body">
                    <div><span>Challenge</span><p>{project.premise}</p></div>
                    <div><span>Approach</span><p>{project.method}</p></div>
                    <div><span>Result</span><p>{project.outcome}</p></div>
                    <ul>{project.stack.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                    <a href="https://github.com/dheepakkaran" target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section" aria-labelledby="skills-title">
          <div className="shell skills-layout">
            <div className="skills-intro">
              <p className="eyebrow">Technical foundation</p>
              <h2 id="skills-title">A systems mindset, from sensors to models.</h2>
              <p>Hands-on depth across production software, machine learning workflows and physical control systems.</p>
              <div className="education-card">
                <span>Education</span>
                <strong>MS Electrical &amp; Computer Engineering</strong>
                <p>Northeastern University · Boston</p>
                <div><b>3.926 CGPA</b><b>Expected May 2028</b></div>
              </div>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <article key={group.label}>
                  <span>0{index + 1}</span><h3>{group.label}</h3><p>{group.values.join(" · ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="shell contact-layout">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2 id="contact-title">Let&apos;s build systems that matter.</h2>
            </div>
            <div className="contact-copy">
              <p>Dheepak is focused on software and machine-learning work where reliability, scale and real-world impact meet.</p>
              <a className="contact-email" href="mailto:elumalaisanthakuma.d@northeastern.edu">elumalaisanthakuma.d@northeastern.edu <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="shell contact-links">
            {externalLinks.map((link) => (
              <a key={link.label} href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                <span>{link.note}</span><strong>{link.label}</strong><i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <a href="#story">Dheepak Karan</a>
          <span>Software · Machine Learning · Electrical Engineering</span>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
