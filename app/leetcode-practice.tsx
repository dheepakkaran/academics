import { externalLinks } from "./portfolio-data";

type Difficulty = "Easy" | "Medium" | "Hard" | "Accepted";

type Problem = {
  title: string;
  titleSlug: string;
  timestamp: string;
  difficulty: Difficulty;
  topics: string[];
};

type PracticeData = {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  activeDays: number;
  streak: number;
  languages: Array<{ name: string; count: number }>;
  topics: Array<{ name: string; count: number }>;
  recent: Problem[];
  isLive: boolean;
};

const username = "___ka__ran___";
const endpoint = "https://leetcode.com/graphql";
const profileHref = externalLinks.find((link) => link.label === "LeetCode")?.href
  ?? `https://leetcode.com/u/${username}/`;

const snapshot: PracticeData = {
  solved: 67,
  easy: 37,
  medium: 30,
  hard: 0,
  activeDays: 4,
  streak: 4,
  languages: [
    { name: "Python 3", count: 56 },
    { name: "MySQL", count: 8 },
    { name: "Python", count: 2 },
    { name: "Java", count: 1 },
  ],
  topics: [
    { name: "Array", count: 36 },
    { name: "Two Pointers", count: 25 },
    { name: "Hash Table", count: 14 },
    { name: "String", count: 13 },
    { name: "Sorting", count: 12 },
  ],
  recent: [
    {
      title: "Max Consecutive Ones III",
      titleSlug: "max-consecutive-ones-iii",
      timestamp: "1781923206",
      difficulty: "Medium",
      topics: ["Array", "Binary Search", "Sliding Window"],
    },
    {
      title: "Max Consecutive Ones",
      titleSlug: "max-consecutive-ones",
      timestamp: "1781839696",
      difficulty: "Easy",
      topics: ["Array"],
    },
    {
      title: "Shuffle the Array",
      titleSlug: "shuffle-the-array",
      timestamp: "1781839238",
      difficulty: "Easy",
      topics: ["Array"],
    },
    {
      title: "Concatenation of Array",
      titleSlug: "concatenation-of-array",
      timestamp: "1781839175",
      difficulty: "Easy",
      topics: ["Array", "Simulation"],
    },
    {
      title: "Maximum Number of Vowels in a Substring of Given Length",
      titleSlug: "maximum-number-of-vowels-in-a-substring-of-given-length",
      timestamp: "1781838666",
      difficulty: "Medium",
      topics: ["String", "Sliding Window"],
    },
  ],
  isLive: false,
};

const profileQuery = `
  query portfolioPractice($username: String!, $year: Int) {
    matchedUser(username: $username) {
      submitStats { acSubmissionNum { difficulty count } }
      languageProblemCount { languageName problemsSolved }
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
      }
      userCalendar(year: $year) { streak totalActiveDays }
    }
    recentAcSubmissionList(username: $username, limit: 5) {
      title
      titleSlug
      timestamp
    }
  }
`;

async function requestLeetCode(query: string, variables: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "dheepakkaran-portfolio",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 21_600 },
    signal: AbortSignal.timeout(2_500),
  });

  if (!response.ok) throw new Error("LeetCode request failed");
  const payload = await response.json() as { data?: Record<string, unknown>; errors?: unknown[] };
  if (!payload.data || payload.errors?.length) throw new Error("LeetCode returned invalid data");
  return payload.data;
}

async function getPracticeData(): Promise<PracticeData> {
  try {
    const profileData = await requestLeetCode(profileQuery, { username, year: 2026 });
    const matchedUser = profileData.matchedUser as {
      submitStats: { acSubmissionNum: Array<{ difficulty: string; count: number }> };
      languageProblemCount: Array<{ languageName: string; problemsSolved: number }>;
      tagProblemCounts: Record<string, Array<{ tagName: string; problemsSolved: number }>>;
      userCalendar: { streak: number; totalActiveDays: number };
    };
    const submissions = profileData.recentAcSubmissionList as Array<{
      title: string;
      titleSlug: string;
      timestamp: string;
    }>;

    if (!matchedUser || !submissions?.length) return snapshot;

    const safeSubmissions = submissions.filter((item) => /^[a-z0-9-]+$/.test(item.titleSlug));
    const detailQuery = `query recentProblems { ${safeSubmissions.map((item, index) =>
      `p${index}: question(titleSlug: \"${item.titleSlug}\") { difficulty topicTags { name } }`
    ).join(" ")} }`;
    const detailData = await requestLeetCode(detailQuery, {});

    const counts = new Map(matchedUser.submitStats.acSubmissionNum.map((item) => [item.difficulty, item.count]));
    const topics = Object.values(matchedUser.tagProblemCounts)
      .flat()
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 5)
      .map((item) => ({ name: item.tagName, count: item.problemsSolved }));
    const languages = [...matchedUser.languageProblemCount]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .map((item) => ({ name: item.languageName === "Python3" ? "Python 3" : item.languageName, count: item.problemsSolved }));
    const recent = safeSubmissions.map((item, index) => {
      const details = detailData[`p${index}`] as { difficulty?: Difficulty; topicTags?: Array<{ name: string }> } | undefined;
      return {
        ...item,
        difficulty: details?.difficulty ?? "Accepted",
        topics: details?.topicTags?.slice(0, 3).map((topic) => topic.name) ?? [],
      };
    });

    return {
      solved: counts.get("All") ?? 0,
      easy: counts.get("Easy") ?? 0,
      medium: counts.get("Medium") ?? 0,
      hard: counts.get("Hard") ?? 0,
      activeDays: matchedUser.userCalendar.totalActiveDays,
      streak: matchedUser.userCalendar.streak,
      languages,
      topics,
      recent,
      isLive: true,
    };
  } catch {
    return snapshot;
  }
}

function formatDate(timestamp: string) {
  return new Date(Number(timestamp) * 1_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function LeetCodePractice() {
  const data = await getPracticeData();
  const metrics = [
    { label: "Solved", value: data.solved },
    { label: "Easy", value: data.easy },
    { label: "Medium", value: data.medium },
    { label: "Hard", value: data.hard },
  ];

  return (
    <section id="practice">
      <div className="practice-heading">
        <div>
          <h2>Programming Practice</h2>
          <p>A verified learning log focused on techniques and recent accepted problems.</p>
        </div>
        <a href={profileHref} target="_blank" rel="noreferrer">@{username} ↗</a>
      </div>

      <dl className="practice-metrics" aria-label="LeetCode solved problem statistics">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.value}</dt>
            <dd>{metric.label}</dd>
          </div>
        ))}
      </dl>

      <div className="practice-context">
        <p><strong>Languages:</strong> {data.languages.slice(0, 3).map((item) => `${item.name} (${item.count})`).join(" · ")}</p>
        <p><strong>Frequent topics:</strong> {data.topics.map((item) => `${item.name} (${item.count})`).join(" · ")}</p>
      </div>

      <h3 className="subsection-title">Recent accepted problems</h3>
      <ol className="practice-list">
        {data.recent.map((problem) => (
          <li key={`${problem.titleSlug}-${problem.timestamp}`}>
            <time dateTime={new Date(Number(problem.timestamp) * 1_000).toISOString()}>{formatDate(problem.timestamp)}</time>
            <div>
              <a href={`https://leetcode.com/problems/${problem.titleSlug}/`} target="_blank" rel="noreferrer">
                <strong>{problem.title} ↗</strong>
              </a>
              <p>{problem.difficulty}{problem.topics.length ? ` · ${problem.topics.join(" · ")}` : ""}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="practice-source">
        {data.isLive ? "Live public LeetCode data" : "Verified LeetCode snapshot · Aug 30, 2026"}
        {` · ${data.activeDays} active days · ${data.streak}-day maximum streak`}
      </p>
    </section>
  );
}
