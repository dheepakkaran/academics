import { certifications } from "./portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications">
      <h2>Certifications</h2>
      <p>
        <strong>Professional certificates:</strong> IBM AI Engineering · IBM Data Science
      </p>
      <div className="certification-badges" aria-label="Verified certification badges">
        {certifications.map((certification) => (
          <div className="certification-badge" key={certification.badgeId}>
            <span className="visually-hidden">{certification.title} · {certification.issuer}</span>
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id={certification.badgeId}
              data-share-badge-host="https://www.credly.com"
            />
          </div>
        ))}
      </div>
      <script type="text/javascript" async src="https://cdn.credly.com/assets/utilities/embed.js" />
    </section>
  );
}
