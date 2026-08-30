import { coursework } from "./portfolio-data";

export default function CourseworkTable() {
  return (
    <div className="coursework-groups">
      {(["Spring 2026", "Fall 2026"] as const).map((semester) => (
        <div className="coursework-term" key={semester}>
          <h3>{semester}</h3>
          <ul className="coursework-list">
            {coursework.filter((course) => course.semester === semester).map((course) => (
              <li key={course.code}>
                <span className="coursework-code">{course.code}</span>
                <div className="coursework-entry">
                  <strong>{course.title}</strong>
                  <a href={course.professorHref} target="_blank" rel="noreferrer">
                    {course.professor} ↗
                  </a>
                </div>
                <span className={`coursework-result${course.status === "Registered" ? " registered" : ""}`}>
                  {course.percentage && course.grade ? `${course.percentage} · ${course.grade}` : course.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
