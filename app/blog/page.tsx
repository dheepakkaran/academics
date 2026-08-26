import type { Metadata } from "next";
import { blogPosts, externalLinks } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Engineering Notes — Dheepak Karan",
  description:
    "Technical notes from Dheepak Karan on machine learning, backend performance and intelligent systems.",
};

export default function BlogPage() {
  return (
    <div className="text-document">
      <a className="skip-link" href="#notes">Skip to notes</a>

      <header className="dossier-header">
        <p className="document-id">DK / ENGINEERING NOTEBOOK / REV. 2026.08</p>
        <h1>Engineering Notes</h1>
        <dl className="document-meta">
          <div><dt>Author</dt><dd>Dheepak Karan</dd></div>
          <div><dt>Fields</dt><dd>Machine learning / Backend systems / Networks</dd></div>
          <div><dt>Entries</dt><dd>{String(blogPosts.length).padStart(2, "0")}</dd></div>
        </dl>
        <nav aria-label="Notebook navigation">
          <a href="/">Profile</a> · <a href="/#work">Selected work</a> · <a href="/resume.pdf" download>Résumé PDF</a>
        </nav>
      </header>

      <main id="notes">
        <section aria-labelledby="contents-title">
          <h2 id="contents-title">00_CONTENTS</h2>
          <ol className="document-list">
            {blogPosts.map((post, index) => (
              <li key={post.title}>
                <span>{`[NOTE ${String(index + 1).padStart(2, "0")}]`}</span>{" "}
                <a href={`#note-${index + 1}`}>{post.title}</a>
              </li>
            ))}
          </ol>
        </section>

        {blogPosts.map((post, index) => (
          <article id={`note-${index + 1}`} key={post.title}>
            <p className="record-id">{`DK-NOTE-${String(index + 1).padStart(2, "0")} / ${post.category}`}</p>
            <h2>{post.title}</h2>
            <dl className="record-fields">
              <div><dt>Abstract</dt><dd>{post.summary}</dd></div>
            </dl>
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <dl className="record-fields">
              <div><dt>Principle</dt><dd><strong>{post.takeaway}</strong></dd></div>
            </dl>
            <p className="reference-line"><a href="#contents-title">Return to contents ↑</a></p>
          </article>
        ))}

        <section aria-labelledby="contact-title">
          <h2 id="contact-title">04_CORRESPONDENCE</h2>
          <p><a href="mailto:elumalaisanthakuma.d@northeastern.edu">Email Dheepak</a></p>
        </section>
      </main>

      <footer>
        <p>
          DOCUMENT END / DK-NOTES-2026 / {externalLinks.slice(1).map((link, index) => (
            <span key={link.label}>
              {index > 0 && " / "}
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </span>
          ))}
        </p>
      </footer>
    </div>
  );
}
