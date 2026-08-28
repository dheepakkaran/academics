import Link from "next/link";
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
        <div className="academic-bio">
          <h1>Dheepak Karan</h1>
          <p className="academic-focus">Machine Learning · Computer Vision · Algorithms</p>

          <div className="academic-details">
            <p className="affiliation-line">
              <img
                className="northeastern-mark"
                src="/northeastern-monogram.png"
                alt=""
                width="2560"
                height="1725"
                aria-hidden="true"
              />
              <span><a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a> · Boston, MA</span>
            </p>
            <p className="academic-meta">M.S. ECE · 3.926 CGPA · Expected May 2028</p>
            <p className="academic-contact"><a href={email?.href}>elumalaisanthakuma.d@northeastern.edu</a></p>
            <p className="academic-links">
              <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a>{" · "}
              <a href={linkedIn?.href} target="_blank" rel="noreferrer">LinkedIn</a>{" · "}
              <a href={credly?.href} target="_blank" rel="noreferrer">Credly</a>{" · "}
              <a href="/resume.pdf" download>Résumé</a>
            </p>
          </div>
        </div>

        <img
          className="academic-avatar"
          src="/dheepak-karan.jpg"
          alt="Portrait of Dheepak Karan"
          width="512"
          height="512"
          fetchPriority="high"
        />
      </header>

      <nav className="academic-menu" aria-label="Primary navigation">
        <Link className={active === "home" ? "active" : undefined} href="/">Home</Link>
        <Link className={active === "work" ? "active" : undefined} href="/work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link className={active === "notes" ? "active" : undefined} href="/blog">Notes</Link>
        <a href="/resume.pdf" download>CV</a>
      </nav>
    </>
  );
}
