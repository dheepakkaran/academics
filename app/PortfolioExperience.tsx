"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Act } from "./portfolio-data";
import { acts, externalLinks, projects, skillGroups } from "./portfolio-data";

type AudioRig = {
  context: AudioContext;
  master: GainNode;
  nodes: AudioScheduledSourceNode[];
};

const navigation = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "/resume.pdf" },
  { label: "Contact", href: "#contact" },
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
    const colors = ["#ff4b27", "#ff3aa7", "#f3bd45", "#3dd9e8"];

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
      context.fillStyle = "rgba(7, 7, 16, 0.72)";
      context.fillRect(0, 0, width, height);

      const left = Math.min(150, width * 0.28);
      const right = width - 24;
      const laneGap = height / 5;

      labels.forEach((label, lane) => {
        const y = laneGap * (lane + 1);
        context.font = "600 11px 'Space Grotesk Variable', sans-serif";
        context.letterSpacing = "1.4px";
        context.fillStyle = "rgba(255, 247, 226, 0.7)";
        context.fillText(label, 18, y + 4);

        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.strokeStyle = "rgba(255,255,255,0.12)";
        context.lineWidth = 1;
        context.stroke();

        const packetCount = lane === 3 ? 8 : 6;
        for (let packet = 0; packet < packetCount; packet += 1) {
          const speed = [0.55, 0.78, 0.65, 0.7][lane];
          const phase = reducedMotion
            ? (packet + 1) / (packetCount + 1)
            : ((frame * speed + packet * 97 + lane * 41) % 620) / 620;
          const x = left + phase * (right - left);
          const radius = lane === 3 ? 4 : packet % 3 === 0 ? 5 : 3;

          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fillStyle = colors[lane];
          context.shadowBlur = 16;
          context.shadowColor = colors[lane];
          context.fill();
          context.shadowBlur = 0;
        }
      });

      frame += 1;
      if (!reducedMotion && visibleRef.current) {
        animationId = requestAnimationFrame(draw);
      }
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
    <div className="network-visual" aria-label="Animated comparison of four packet scheduling approaches">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="network-legend" aria-hidden="true">
        <span>throughput</span>
        <span>latency</span>
        <span>drops</span>
        <span>fairness</span>
      </div>
    </div>
  );
}

function ActChapter({ act, reducedMotion }: { act: Act; reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageBase = act.image?.replace("-1920.webp", "");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const copyY = useTransform(scrollYProgress, [0.18, 0.5, 0.84], [70, 0, -50]);
  const copyOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.76, 0.92], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={act.id}
      className={`act act-${act.tone} ${act.image ? "act-image" : "act-graphic"}`}
      aria-labelledby={`${act.id}-title`}
      data-act={act.number}
    >
      <div className="act-sticky">
        {act.image ? (
          <motion.div
            className="act-backdrop"
            style={
              reducedMotion
                ? { scale: 1, y: 0 }
                : { scale: imageScale, y: imageY }
            }
          >
            <picture>
              <source
                srcSet={`${imageBase}-1280.avif 1280w, ${act.imageAvif} 1920w`}
                sizes="100vw"
                type="image/avif"
              />
              <img
                src={act.image}
                srcSet={`${imageBase}-1280.webp 1280w, ${act.image} 1920w`}
                sizes="100vw"
                alt=""
                loading="lazy"
                style={{ objectPosition: act.imagePosition }}
              />
            </picture>
          </motion.div>
        ) : (
          <div className="act-backdrop graphic-backdrop" aria-hidden="true">
            <span className="signal-orbit orbit-one" />
            <span className="signal-orbit orbit-two" />
            <span className="signal-orbit orbit-three" />
          </div>
        )}
        <div className="act-vignette" aria-hidden="true" />

        <motion.div
          className="act-copy shell"
          style={
            reducedMotion
              ? { y: 0, opacity: 1 }
              : { y: copyY, opacity: copyOpacity }
          }
        >
          <div className="act-meta" aria-hidden="true">
            <span>ACT {act.number}</span>
            <span>{act.year}</span>
          </div>
          <p className="eyebrow">{act.eyebrow}</p>
          <h2 id={`${act.id}-title`}>{act.title}</h2>
          <blockquote>{act.quote}</blockquote>
          <div className="act-body">
            {act.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="metric-row" aria-label={`${act.title} key metrics`}>
            {act.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          {act.id === "fairness" && <NetworkCanvas reducedMotion={reducedMotion} />}
          <ul className="stack-list" aria-label="Tools and technologies">
            {act.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function OpeningCredits({
  onEnter,
  onSkip,
}: {
  onEnter: (withSound: boolean) => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      className="opening-credits"
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="opening-light" aria-hidden="true" />
      <div className="opening-copy">
        <span className="film-label">An original engineering story</span>
        <h2 id="opening-title">
          <span>Zero</span>
          <i>to</i>
          <span>Signal</span>
        </h2>
        <p>A dramatized cinematic retelling based on a true engineering journey.</p>
        <div className="opening-actions">
          <button type="button" className="button button-primary" onClick={() => onEnter(false)}>
            Enter silently
          </button>
          <button type="button" className="button button-ghost" onClick={() => onEnter(true)}>
            Enter with sound
          </button>
        </div>
        <button type="button" className="text-button" onClick={onSkip}>
          Skip to the work <span aria-hidden="true">↓</span>
        </button>
      </div>
      <div className="opening-footer" aria-hidden="true">
        <span>Boston · Tamil Nadu · Chennai</span>
        <span>Est. 2022</span>
      </div>
    </motion.div>
  );
}

export function PortfolioExperience() {
  const reducedMotionPreference = useReducedMotion();
  const reducedMotion = Boolean(reducedMotionPreference);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [activeAct, setActiveAct] = useState("story");
  const audioRef = useRef<AudioRig | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.28 });
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.08]);
  const heroY = useTransform(scrollY, [0, 900], [0, 170]);
  const heroOpacity = useTransform(scrollY, [0, 650], [1, 0]);

  const startSound = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.context.resume();
      audioRef.current.master.gain.setTargetAtTime(0.035, audioRef.current.context.currentTime, 0.8);
      setSoundOn(true);
      return;
    }

    const AudioConstructor = window.AudioContext;
    const context = new AudioConstructor();
    const master = context.createGain();
    const lowpass = context.createBiquadFilter();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    const frequencies = [55, 82.41, 110];
    const nodes: AudioScheduledSourceNode[] = [];

    master.gain.setValueAtTime(0, context.currentTime);
    master.gain.linearRampToValueAtTime(0.035, context.currentTime + 2.4);
    lowpass.type = "lowpass";
    lowpass.frequency.value = 420;
    lowpass.Q.value = 0.7;
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();
    nodes.push(lfo);

    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 4 - 3;
      voiceGain.gain.value = [0.34, 0.18, 0.08][index];
      oscillator.connect(voiceGain);
      voiceGain.connect(lowpass);
      oscillator.start();
      nodes.push(oscillator);
    });

    lowpass.connect(master);
    master.connect(context.destination);
    audioRef.current = { context, master, nodes };
    setSoundOn(true);
  }, []);

  const stopSound = useCallback(async () => {
    const rig = audioRef.current;
    if (!rig) return;
    rig.master.gain.setTargetAtTime(0, rig.context.currentTime, 0.12);
    window.setTimeout(() => void rig.context.suspend(), 350);
    setSoundOn(false);
  }, []);

  const handleEnter = useCallback(
    (withSound: boolean) => {
      setEntered(true);
      if (withSound) void startSound();
    },
    [startSound],
  );

  const handleSkip = useCallback(() => {
    setEntered(true);
    window.setTimeout(() => document.querySelector("#work")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 40);
  }, [reducedMotion]);

  const toggleSound = useCallback(() => {
    if (soundOn) void stopSound();
    else void startSound();
  }, [soundOn, startSound, stopSound]);

  useEffect(() => {
    document.body.classList.toggle("story-locked", !entered);
    return () => document.body.classList.remove("story-locked");
  }, [entered]);

  useEffect(() => {
    const sections = ["story", ...acts.map((act) => act.id), "work", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveAct(visible.target.id);
      },
      { rootMargin: "-35% 0px -50%", threshold: [0, 0.25, 0.55] },
    );
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const rig = audioRef.current;
      if (!rig) return;
      if (document.hidden) void rig.context.suspend();
      else if (soundOn) void rig.context.resume();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [soundOn]);

  useEffect(
    () => () => {
      const rig = audioRef.current;
      if (!rig) return;
      rig.nodes.forEach((node) => {
        try {
          node.stop();
        } catch {
          // The source was already stopped.
        }
      });
      void rig.context.close();
    },
    [],
  );

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <AnimatePresence>{!entered && <OpeningCredits onEnter={handleEnter} onSkip={handleSkip} />}</AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="site-header">
        <a className="monogram" href="#story" aria-label="Zero to Signal — back to opening">
          Z<span>/</span>S
        </a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={activeAct === item.label.toLowerCase() ? "active" : undefined}
              {...(item.href.endsWith(".pdf") ? { download: true } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="sound-toggle"
          aria-pressed={soundOn}
          onClick={toggleSound}
        >
          <span className={`sound-bars ${soundOn ? "playing" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          Sound {soundOn ? "on" : "off"}
        </button>
      </header>

      <main>
        <section id="story" className="hero" aria-labelledby="hero-title">
          <motion.div
            className="hero-image"
            style={reducedMotion ? undefined : { scale: heroScale }}
            aria-hidden="true"
          >
            <picture>
              <source
                srcSet="/scenes/neyveli-1280.avif 1280w, /scenes/neyveli-1920.avif 1920w"
                sizes="100vw"
                type="image/avif"
              />
              <img
                src="/scenes/neyveli-1920.webp"
                srcSet="/scenes/neyveli-1280.webp 1280w, /scenes/neyveli-1920.webp 1920w"
                sizes="100vw"
                alt=""
                fetchPriority="high"
              />
            </picture>
          </motion.div>
          <div className="hero-scrim" aria-hidden="true" />
          <motion.div
            className="hero-content shell"
            style={reducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          >
            <div className="hero-credit">
              <span>A Dheepak Karan story</span>
              <span>Electrical · Software · Intelligence</span>
            </div>
            <p className="hero-hook">From 210 MW to 8B parameters</p>
            <h1 id="hero-title">
              <span>Zero</span>
              <em>to</em>
              <span>Signal</span>
            </h1>
            <div className="hero-footer">
              <p>
                A cinematic retelling of an engineer moving from industrial control rooms in Tamil Nadu to software systems, machine learning and graduate study in Boston.
              </p>
              <a href="#spark" className="scroll-cue">
                Begin the journey <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.div>
          <div className="reel-counter" aria-hidden="true">
            00&nbsp;&nbsp;:&nbsp;&nbsp;00&nbsp;&nbsp;:&nbsp;&nbsp;01
          </div>
        </section>

        <div className="chapter-strip" aria-hidden="true">
          <span>One current</span>
          <i />
          <span>Five acts</span>
          <i />
          <span>Two continents</span>
        </div>

        {acts.map((act) => (
          <ActChapter key={act.id} act={act} reducedMotion={reducedMotion} />
        ))}

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">Selected work · The director’s cut</p>
              <h2 id="work-title">Three systems.<br />Three stakes.</h2>
              <p>
                Open each case file for the problem, the method and the outcome. Every professional claim below is resume-backed.
              </p>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <details className="project" key={project.title}>
                  <summary>
                    <span className="project-index">0{index + 1}</span>
                    <span className="project-title">
                      <strong>{project.title}</strong>
                      <small>{project.date}</small>
                    </span>
                    <span className="project-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="project-body">
                    <div>
                      <span>Premise</span>
                      <p>{project.premise}</p>
                    </div>
                    <div>
                      <span>Method</span>
                      <p>{project.method}</p>
                    </div>
                    <div>
                      <span>Outcome</span>
                      <p>{project.outcome}</p>
                    </div>
                    <ul>
                      {project.stack.map((tool) => <li key={tool}>{tool}</li>)}
                    </ul>
                    <a href="https://github.com/dheepakkaran" target="_blank" rel="noreferrer">
                      Explore GitHub profile <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section" aria-labelledby="skills-title">
          <div className="skills-marquee" aria-hidden="true">
            <span>CIRCUITS / CODE / CONTEXT / CONSEQUENCE / </span>
            <span>CIRCUITS / CODE / CONTEXT / CONSEQUENCE / </span>
          </div>
          <div className="shell skills-layout">
            <div className="section-heading">
              <p className="eyebrow">Technical credits</p>
              <h2 id="skills-title">Built across both sides of the screen.</h2>
              <p>
                Electronics shaped the instincts. Software expanded the scale. Machine learning connected the two.
              </p>
              <div className="education-card">
                <span>Now playing</span>
                <strong>MS Electrical &amp; Computer Engineering</strong>
                <p>Northeastern University · Boston</p>
                <div><b>3.926 CGPA</b><b>Expected May 2028</b></div>
              </div>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <article key={group.label}>
                  <span>0{index + 1}</span>
                  <h3>{group.label}</h3>
                  <p>{group.values.join(" · ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-light" aria-hidden="true" />
          <div className="shell">
            <p className="eyebrow">The next frame</p>
            <h2 id="contact-title">What should<br />we build next?</h2>
            <p className="contact-intro">
              Dheepak is interested in the systems where software, machine learning and the physical world meet.
            </p>
            <div className="contact-links">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span>{link.note}</span>
                  <strong>{link.label}</strong>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
            <a className="resume-cta" href="/resume.pdf" download>
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <p>ZERO TO SIGNAL</p>
          <span>Designed as a dramatized cinematic retelling. Professional facts and metrics are résumé-backed.</span>
          <span>© 2026 Dheepak Karan</span>
        </div>
      </footer>
    </>
  );
}
