import { externalLinks } from "./portfolio-data";

type ProfileHeaderProps = {
  active: "home" | "work" | "notes";
};

const email = externalLinks.find((link) => link.label === "Email");
const linkedIn = externalLinks.find((link) => link.label === "LinkedIn");
const github = externalLinks.find((link) => link.label === "GitHub");
const credly = externalLinks.find((link) => link.label === "Credly");

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
          <h1>Dheepak Karan</h1>
          <p className="academic-role"><strong>M.S. ECE Student · Software Engineer</strong></p>
          <p className="affiliation-line">
            <img
              className="northeastern-mark"
              src="/northeastern-monogram.png"
              alt=""
              width="2560"
              height="1725"
              aria-hidden="true"
            />
            <span><a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a> · Boston, Massachusetts</span>
          </p>
          <p className="academic-focus">Machine Learning · Computer Vision · Algorithms</p>
          <p className="academic-meta">3.926 CGPA · Expected May 2028</p>
          <p className="academic-contact"><a href={email?.href}>elumalaisanthakuma.d@northeastern.edu</a></p>
          <p className="academic-links">
            <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a>{" · "}
            <a href={linkedIn?.href} target="_blank" rel="noreferrer">LinkedIn</a>{" · "}
            <a href={credly?.href} target="_blank" rel="noreferrer">Credly</a>{" "}
            <a href="/resume.pdf" download>[Résumé]</a>
          </p>
        </div>
      </header>

      <nav className="academic-menu" aria-label="Primary navigation">
        <a className={active === "home" ? "active" : undefined} href="/">Home</a>
        <a className={active === "work" ? "active" : undefined} href="/work">Work</a>
        <a href="/#experience">Experience</a>
        <a className={active === "notes" ? "active" : undefined} href="/blog">Notes</a>
        <a href="/resume.pdf" download>CV</a>
      </nav>
    </>
  );
}
