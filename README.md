# Dheepak Karan — Academic Portfolio

An academic portfolio built with React, TypeScript and vinext for research and
teaching opportunities.

**Live site:** [dheepakkaran.github.io/academics](https://dheepakkaran.github.io/academics/)

## Pages

- `/` — profile, coursework, selected work, experience and skills
- `/projects` — complete engineering project archive and GitHub activity
- `/academics` — graduate and undergraduate coursework, teaching service and certifications
- `/blog` — engineering notes
- `/resume.pdf` — downloadable résumé

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run build
npm test
```

The portfolio does not use authentication, a database, analytics or a
contact-form backend. GitHub Actions creates a static export and publishes it to
GitHub Pages after changes reach `main`. A daily refresh keeps the GitHub
activity snapshot current.
