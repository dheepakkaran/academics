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

      <header>
        <h1>Engineering Notes</h1>
        <p><strong>Dheepak Karan</strong></p>
        <p>Machine learning · Backend systems · Networks</p>
        <nav aria-label="Notebook navigation">
          <a href="/">Profile</a> · <a href="/#work">Work</a> · <a href="/resume.pdf" download>Résumé</a>
        </nav>
      </header>

      <main id="notes">
        <section aria-labelledby="contents-title">
          <h2 id="contents-title">Contents</h2>
          <ol>
            {blogPosts.map((post, index) => (
              <li key={post.title}><a href={`#note-${index + 1}`}>{post.title}</a></li>
            ))}
          </ol>
        </section>

        {blogPosts.map((post, index) => (
          <article id={`note-${index + 1}`} key={post.title}>
            <h2>{post.title}</h2>
            <p><strong>{post.category}</strong></p>
            <p><strong>Summary:</strong> {post.summary}</p>
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p><strong>Working principle:</strong> {post.takeaway}</p>
            <p><a href="#contents-title">Back to contents</a></p>
          </article>
        ))}

        <section aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p><a href="mailto:elumalaisanthakuma.d@northeastern.edu">Email Dheepak</a></p>
        </section>
      </main>

      <footer>
        <p>
          © 2026 Dheepak Karan · {externalLinks.slice(1).map((link, index) => (
            <span key={link.label}>
              {index > 0 && " · "}
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </span>
          ))}
        </p>
      </footer>
    </div>
  );
}
