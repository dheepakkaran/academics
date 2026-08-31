import { externalLinks } from "./portfolio-data";

type ProfileHeaderProps = {
  active: "home" | "projects" | "academics" | "notes";
};

const email = externalLinks.find((link) => link.label === "Email");
const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");

type ProfilePreviewLinkProps = {
  id: string;
  label: string;
  href?: string;
  handle: string;
  detail: string;
  address: string;
};

function ProfilePreviewLink({ id, label, href, handle, detail, address }: ProfilePreviewLinkProps) {
  return (
    <span className="profile-preview">
      <a href={href} target="_blank" rel="noreferrer" aria-describedby={id}>{label}</a>
      <span className="profile-preview-card" id={id} role="tooltip">
        <img src="/dheepak-karan.jpg" alt="" width="52" height="52" aria-hidden="true" />
        <span>
          <span className="profile-preview-platform">{`${label} profile`}</span>
          <strong>Dheepak Karan</strong>
          <span>{handle}</span>
          <small>{detail}</small>
          <small>{address}</small>
        </span>
      </span>
    </span>
  );
}

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

function EmailPreviewLink() {
  return (
    <span className="email-preview">
      <a href={email?.href} aria-describedby="email-context-preview">
        elumalaisanthakuma.d@northeastern.edu
      </a>
      <span className="email-context-card" id="email-context-preview" role="tooltip">
        <small>Let&apos;s talk about</small>
        <strong>Research · Teaching · Engineering</strong>
        <span>RA/TA opportunities and academic collaboration.</span>
      </span>
    </span>
  );
}

export default function ProfileHeader({ active }: ProfileHeaderProps) {
  return (
    <>
      <header className="academic-intro">
        <img
          className="academic-avatar"
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
          <p><EmailPreviewLink /></p>
          <p>
            <ProfilePreviewLink
              id="github-profile-preview"
              label="GitHub"
              href={github?.href}
              handle="@dheepakkaran"
              detail="Repositories and contribution activity"
              address="github.com/dheepakkaran"
            />{" · "}
            <ProfilePreviewLink
              id="linkedin-profile-preview"
              label="LinkedIn"
              href={linkedIn?.href}
              handle="MS ECE · Northeastern University"
              detail="Machine learning, computer vision and algorithms"
              address="linkedin.com/in/dheepakkaran"
            />{" · "}
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
