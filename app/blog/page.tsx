import type { Metadata } from "next";
import { blogPosts } from "../portfolio-data";
import ProfileHeader from "../profile-header";

export const metadata: Metadata = {
  title: "Engineering Notes — Dheepak Karan",
  description:
    "Technical notes from Dheepak Karan on machine learning, backend performance and intelligent systems.",
};

export default function BlogPage() {
  return (
    <div className="academic-page">
      <a className="skip-link" href="#notes">Skip to notes</a>
      <ProfileHeader active="notes" />

      <main id="notes">
        <section>
          <h2>Engineering Notes</h2>
          <p>Short technical essays about practical decisions across machine learning, backend performance and networked systems.</p>
          <ul className="plain-list">
            {blogPosts.map((post, index) => (
              <li key={post.title}><a href={`#note-${index + 1}`}><strong>{post.title}</strong></a></li>
            ))}
          </ul>
        </section>

        {blogPosts.map((post, index) => (
          <article id={`note-${index + 1}`} className="note-article" key={post.title}>
            <h2>{post.title}</h2>
            <p className="note-meta">{post.category}</p>
            <p><strong>Summary:</strong> {post.summary}</p>
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p><strong>Working principle:</strong> {post.takeaway}</p>
            <p><a href="#notes">Back to top</a></p>
          </article>
        ))}
      </main>

      <footer className="academic-footer">
        <small>© 2026 Dheepak Karan · Engineering Notes</small>
      </footer>
    </div>
  );
}
