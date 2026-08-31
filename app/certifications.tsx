import { certifications } from "./portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications">
      <h2>Certifications</h2>
      <ul className="certification-list" aria-label="Verified certifications">
        {certifications.map((certification) => (
          <li className="certification-item" key={certification.badgeId}>
            <a
              href={`https://www.credly.com/badges/${certification.badgeId}/public_url`}
              target="_blank"
              rel="noreferrer"
              aria-describedby={`certification-preview-${certification.badgeId}`}
            >
              {`${certification.issuer} ${certification.title}`}
            </a>
            <span
              className="certification-hover-preview"
              id={`certification-preview-${certification.badgeId}`}
              role="tooltip"
            >
              <span className="certification-badge-image">
                <iframe
                  className="credly-badge-frame"
                  title={`${certification.title} · ${certification.issuer} badge image`}
                  src={`https://www.credly.com/embedded_badge/${certification.badgeId}`}
                  width="150"
                  height="270"
                  frameBorder="0"
                  scrolling="no"
                  tabIndex={-1}
                />
              </span>
              <small className="credly-provider">Provided by Credly</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
