import type { Metadata } from "next";
import { CursorTrails } from "../CursorTrails";
import { blogPosts, externalLinks } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Engineering Notes — Dheepak Karan",
  description:
    "Technical notes from Dheepak Karan on machine learning, backend performance and intelligent systems.",
};

export default function BlogPage() {
  return (
    <div className="research-site">
      <CursorTrails />
      <a className="skip-link" href="#notes">Skip to engineering notes</a>

      <div className="research-shell blog-shell">
        <header className="research-topbar">
          <a className="wordmark" href="/" aria-label="Dheepak Karan — profile home">
            <span>DK</span>
            <span>
              <strong>Dheepak Karan</strong>
              <small>Engineering Notebook</small>
            </span>
          </a>
          <nav aria-label="Notebook navigation">
            <a href="/">Profile</a>
            <a href="/#research">Work</a>
            <a href="/resume.pdf" download>Résumé</a>
          </nav>
        </header>

        <main className="notebook-main" id="notes">
          <header className="notebook-header">
            <p className="section-kicker">Technical notebook</p>
            <h1>Engineering notes</h1>
            <p>
              Short, practical observations from building and measuring machine-learning,
              backend and networked systems.
            </p>
            <dl>
              <div><dt>Author</dt><dd>Dheepak Karan</dd></div>
              <div><dt>Topics</dt><dd>ML · Backend · Networks</dd></div>
              <div><dt>Entries</dt><dd>{blogPosts.length}</dd></div>
            </dl>
          </header>

          <section className="notebook-index" aria-labelledby="index-title">
            <h2 id="index-title">Contents</h2>
            <ol>
              {blogPosts.map((post, index) => (
                <li key={post.title}>
                  <a href={`#note-${index + 1}`}>{post.title}</a>
                  <span>{post.category}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="article-list" aria-label="Technical articles">
            {blogPosts.map((post, index) => (
              <article id={`note-${index + 1}`} key={post.title}>
                <header>
                  <p className="article-number">Note {String(index + 1).padStart(2, "0")} · {post.category}</p>
                  <h2>{post.title}</h2>
                  <p className="article-abstract"><strong>Abstract.</strong> {post.summary}</p>
                </header>
                <div className="article-body">
                  {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <aside><strong>Working principle</strong>{post.takeaway}</aside>
                </div>
                <a className="back-to-index" href="#index-title">Back to contents ↑</a>
              </article>
            ))}
          </section>

          <section className="notebook-contact" aria-labelledby="notebook-contact-title">
            <h2 id="notebook-contact-title">Discussion and correspondence</h2>
            <p>If you have a related idea, implementation detail or counterexample, I would like to hear it.</p>
            <a href="mailto:elumalaisanthakuma.d@northeastern.edu">
              Email Dheepak <span aria-hidden="true">↗</span>
            </a>
          </section>
        </main>

        <footer className="research-footer">
          <span>© 2026 Dheepak Karan</span>
          <nav aria-label="External links">
            {externalLinks.slice(1).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}
