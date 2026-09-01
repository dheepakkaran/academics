import { externalLinks } from "./portfolio-data";

type ProfileHeaderProps = {
  active: "home" | "projects" | "academics" | "notes";
};

const email = externalLinks.find((link) => link.label === "Email");
const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");

function ResumePreviewLink() {
  return (
    <span className="resume-preview">
      <a href="/resume.pdf" download aria-describedby="resume-document-preview">Resume</a>
      <span className="resume-preview-card" id="resume-document-preview" role="tooltip">
        <span className="resume-preview-message">
          Thanks for considering my work. Click to download.
        </span>
      </span>
    </span>
  );
}

export default function ProfileHeader({ active }: ProfileHeaderProps) {
  return (
    <>
      <header className="academic-intro">
        <img
          className="academic-avatar-static"
          src="/dheepak-karan.jpg"
          alt="Dheepak Karan"
          width="512"
          height="512"
          fetchPriority="high"
        />
        <div className="academic-bio">
          <h1>
            <span
              className="name-thought-trigger"
              tabIndex={0}
              aria-describedby="full-name-thought"
            >
              Dheepak Karan
              <span className="name-thought-bubble" id="full-name-thought" role="tooltip">
                <small>My full name is</small>
                <strong>Dheepak Karan<br />Elumalai Santhakumari</strong>
              </span>
            </span>
          </h1>
          <p><strong>Machine Learning · Computer Vision · Algorithms</strong></p>
          <p className="affiliation-line">
            <img
              className="northeastern-mark"
              src="/northeastern-monogram.png"
              alt=""
              width="2560"
              height="1725"
              aria-hidden="true"
            />
            <span>MS ECE, <a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a> · 3.926 CGPA</span>
          </p>
          <p>Boston, Massachusetts · Expected May 2028</p>
          <p>
            <a href={email?.href}>elumalaisanthakuma.d@northeastern.edu</a>
          </p>
          <p>
            <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a>{" · "}
            <a href={linkedIn?.href} target="_blank" rel="noreferrer">LinkedIn</a>{" · "}
            <ResumePreviewLink />
          </p>
        </div>
      </header>

      <nav className="academic-menu" aria-label="Primary navigation">
        <a className={active === "home" ? "active" : undefined} href="/">Home</a>
        <a className={active === "projects" ? "active" : undefined} href="/projects">Projects</a>
        <a className={active === "academics" ? "active" : undefined} href="/academics">Academics</a>
        <a href="/#experience">Experience</a>
        <a className={active === "notes" ? "active" : undefined} href="/blog">Notes</a>
      </nav>
    </>
  );
}
