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
            <iframe
              className="credly-badge-frame"
              title={`${certification.title} · ${certification.issuer} verified credential`}
              src={`https://www.credly.com/embedded_badge/${certification.badgeId}`}
              width="150"
              height="270"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
