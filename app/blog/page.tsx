import type { Metadata } from "next";
import { blogPosts, externalLinks } from "../portfolio-data";

export const metadata: Metadata = {
  title: "Engineering Notes — Dheepak Karan",
  description:
    "Technical notes from Dheepak Karan on machine learning, backend performance and intelligent systems.",
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <div className="blog-glow" aria-hidden="true" />
      <header className="blog-header">
        <a className="brand" href="/" aria-label="Back to Dheepak Karan portfolio">
          <span>DK</span><strong>Dheepak Karan</strong>
        </a>
        <a className="back-link" href="/">Portfolio <span aria-hidden="true">↗</span></a>
      </header>

      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="prompt-label"><span>Journal</span><i aria-hidden="true">→</i>Engineering notes</div>
        <h1 id="blog-title">Notes from building, measuring and learning.</h1>
        <p>
          Short essays about practical engineering decisions across machine learning, backend systems and networks.
        </p>
      </section>

      <section className="blog-feed" aria-label="Technical articles">
        {blogPosts.map((post, index) => (
          <article id={`note-${index + 1}`} key={post.title}>
            <div className="blog-article-meta">
              <span>0{index + 1}</span>
              <p>{post.category}</p>
            </div>
            <div className="blog-article-content">
              <h2>{post.title}</h2>
              <p className="blog-deck">{post.summary}</p>
              <blockquote>{post.takeaway}</blockquote>
              <div className="blog-copy">
                {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="blog-contact">
        <p>Have a perspective to add?</p>
        <a href="mailto:elumalaisanthakuma.d@northeastern.edu">Continue the conversation <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="blog-footer">
        <span>© 2026 Dheepak Karan</span>
        <nav aria-label="Social links">
          {externalLinks.slice(1).map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
