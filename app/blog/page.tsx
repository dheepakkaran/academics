import type { Metadata } from "next";
import { SkillFlowField } from "../SkillFlowField";
import { blogPosts, externalLinks } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Engineering Notes — Dheepak Karan",
  description:
    "Technical notes from Dheepak Karan on machine learning, backend performance and intelligent systems.",
};

export default function BlogPage() {
  return (
    <div className="bw-site notebook-site">
      <SkillFlowField />
      <a className="skip-link" href="#notes">Skip to engineering notes</a>

      <header className="plain-header">
        <a className="plain-wordmark" href="/">
          <strong>Dheepak Karan</strong>
          <span>Engineering notebook</span>
        </a>
        <nav aria-label="Notebook navigation">
          <a href="/">Profile</a>
          <a href="/#work">Work</a>
          <a href="/resume.pdf" download>Résumé</a>
        </nav>
      </header>

      <main id="notes" className="notebook-main">
        <header className="notebook-title">
          <p className="mono-label">Technical notebook / 2026</p>
          <h1>Engineering notes</h1>
          <p>
            Working observations from building and measuring machine-learning,
            backend and networked systems.
          </p>
          <dl>
            <div><dt>Author</dt><dd>Dheepak Karan</dd></div>
            <div><dt>Fields</dt><dd>ML / Backend / Networks</dd></div>
            <div><dt>Entries</dt><dd>{String(blogPosts.length).padStart(2, "0")}</dd></div>
          </dl>
        </header>

        <nav className="notebook-contents" aria-labelledby="contents-title">
          <p id="contents-title">Contents</p>
          <ol>
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <a href={`#note-${index + 1}`}>{post.title}</a>
                <small>{post.category}</small>
              </li>
            ))}
          </ol>
        </nav>

        <section className="notebook-articles" aria-label="Technical articles">
          {blogPosts.map((post, index) => (
            <article id={`note-${index + 1}`} key={post.title}>
              <header>
                <p className="mono-label">Note {String(index + 1).padStart(2, "0")} / {post.category}</p>
                <h2>{post.title}</h2>
                <p className="abstract"><b>Abstract</b>{post.summary}</p>
              </header>
              <div className="notebook-copy">
                {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="principle"><b>Working principle</b>{post.takeaway}</p>
              <a className="return-link" href="#contents-title">Return to contents ↑</a>
            </article>
          ))}
        </section>

        <section className="notebook-correspondence" aria-labelledby="correspondence-title">
          <p className="mono-label">Correspondence</p>
          <h2 id="correspondence-title">Have a related idea or counterexample?</h2>
          <a href="mailto:elumalaisanthakuma.d@northeastern.edu">Email Dheepak ↗</a>
        </section>
      </main>

      <footer className="plain-footer">
        <span>© 2026 Dheepak Karan</span>
        <nav aria-label="External links">
          {externalLinks.slice(1).map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
