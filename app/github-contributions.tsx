type ContributionDay = {
  date: string;
  count: number;
  level: number;
  week: number;
  weekday: number;
};

type ContributionData = {
  total: number;
  days: ContributionDay[];
  isLive: boolean;
};

const username = "dheepakkaran";
const githubProfile = `https://github.com/${username}`;
const contributionEndpoint = `https://github.com/users/${username}/contributions`;

const snapshotActiveDays: Record<string, [count: number, level: number]> = {
  "2026-02-12": [5, 3],
  "2026-03-17": [6, 3],
  "2026-05-14": [2, 1],
  "2026-05-25": [4, 2],
  "2026-06-16": [9, 4],
  "2026-06-17": [2, 1],
  "2026-06-18": [3, 2],
  "2026-06-19": [1, 1],
  "2026-06-28": [2, 1],
  "2026-07-08": [5, 3],
  "2026-07-09": [3, 2],
  "2026-07-10": [6, 3],
  "2026-07-11": [2, 1],
  "2026-07-14": [14, 4],
  "2026-07-16": [6, 3],
  "2026-07-17": [1, 1],
  "2026-07-18": [10, 4],
  "2026-07-19": [4, 2],
  "2026-07-24": [6, 3],
  "2026-07-25": [9, 4],
  "2026-07-27": [2, 1],
  "2026-08-17": [38, 4],
  "2026-08-18": [4, 2],
  "2026-08-25": [1, 1],
};

function dateFromIso(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function buildSnapshot(): ContributionData {
  const firstDate = dateFromIso("2025-08-24");
  const lastDate = dateFromIso("2026-08-29");
  const days: ContributionDay[] = [];

  for (let date = new Date(firstDate); date <= lastDate; date.setUTCDate(date.getUTCDate() + 1)) {
    const iso = date.toISOString().slice(0, 10);
    const [count = 0, level = 0] = snapshotActiveDays[iso] ?? [];
    const elapsedDays = Math.round((date.getTime() - firstDate.getTime()) / 86_400_000);
    days.push({
      date: iso,
      count,
      level,
      week: Math.floor(elapsedDays / 7),
      weekday: date.getUTCDay(),
    });
  }

  return { total: 145, days, isLive: false };
}

function parseGitHubCalendar(html: string): ContributionData | null {
  const totalMatch = html.match(/<h2[^>]*>[\s\n]*([\d,]+)[\s\n]*contributions/);
  const total = Number(totalMatch?.[1]?.replaceAll(",", "") ?? 0);
  const cellPattern = /<td(?=[^>]*data-ix="(\d+)")(?=[^>]*data-date="([^"]+)")(?=[^>]*data-level="([0-4])")[^>]*><\/td>\s*<tool-tip[^>]*>(.*?)<\/tool-tip>/gs;
  const days: ContributionDay[] = [];

  for (const match of html.matchAll(cellPattern)) {
    const countMatch = match[4].match(/([\d,]+) contributions?/);
    const count = Number(countMatch?.[1]?.replaceAll(",", "") ?? 0);
    days.push({
      date: match[2],
      count,
      level: Number(match[3]),
      week: Number(match[1]),
      weekday: dateFromIso(match[2]).getUTCDay(),
    });
  }

  if (days.length < 350 || !total) return null;
  return { total, days, isLive: true };
}

async function getContributions(): Promise<ContributionData> {
  try {
    const response = await fetch(contributionEndpoint, {
      headers: { "User-Agent": "dheepakkaran-portfolio" },
      next: { revalidate: 21_600 },
      signal: AbortSignal.timeout(2_500),
    });
    if (!response.ok) return buildSnapshot();
    return parseGitHubCalendar(await response.text()) ?? buildSnapshot();
  } catch {
    return buildSnapshot();
  }
}

function getMonthMarkers(days: ContributionDay[]) {
  const byMonth = new Map<string, { label: string; week: number }>();
  const orderedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));

  for (const day of orderedDays) {
    const key = day.date.slice(0, 7);
    if (!byMonth.has(key)) {
      byMonth.set(key, {
        label: dateFromIso(day.date).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
        week: day.week,
      });
    }
  }

  const markers = [...byMonth.values()];
  return markers.filter((marker, index) => {
    const next = markers[index + 1];
    return !next || next.week - marker.week >= 3;
  });
}

function contributionLabel(day: ContributionDay) {
  const formattedDate = dateFromIso(day.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return day.count === 0
    ? `No contributions on ${formattedDate}`
    : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDate}`;
}

function getLatestActivity(days: ContributionDay[]) {
  let latest: ContributionDay | null = null;

  for (const day of days) {
    if (day.count > 0 && (!latest || day.date > latest.date)) latest = day;
  }

  return latest;
}

function formatActivityDate(date: string) {
  return dateFromIso(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function GitHubContributions() {
  const data = await getContributions();
  const latestActivity = getLatestActivity(data.days);
  const months = getMonthMarkers(data.days);
  const weekCount = Math.max(...data.days.map((day) => day.week)) + 1;
  const gridColumns = `repeat(${weekCount}, minmax(0, 1fr))`;

  return (
    <section className="github-activity" aria-labelledby="github-activity-title">
      <div className="github-activity-heading">
        <div>
          <h2 id="github-activity-title">GitHub Activity</h2>
          <p><strong>{data.total} contributions</strong> in the last year</p>
        </div>
        <a href={githubProfile} target="_blank" rel="noreferrer">@{username} ↗</a>
      </div>

      <div className="github-heatmap-frame">
        <div className="github-heatmap-layout" role="img" aria-label={`${data.total} GitHub contributions by ${username} in the last year`}>
          <div className="github-months" aria-hidden="true" style={{ gridTemplateColumns: gridColumns }}>
            {months.map((month, index) => (
              <span key={`${month.label}-${index}`} style={{ gridColumnStart: month.week + 1 }}>{month.label}</span>
            ))}
          </div>
          <div className="github-heatmap" aria-hidden="true" style={{ gridTemplateColumns: gridColumns }}>
            {data.days.map((day) => (
              <span
                key={day.date}
                className={`github-day level-${day.level}`}
                style={{ gridColumnStart: day.week + 1, gridRowStart: day.weekday + 1 }}
                title={contributionLabel(day)}
              />
            ))}
          </div>
        </div>

        <div className="github-activity-meta">
          <span>
            {latestActivity ? (
              <>Latest activity · <time dateTime={latestActivity.date}>{formatActivityDate(latestActivity.date)}</time> · </>
            ) : null}
            {data.isLive ? "Live GitHub data" : "Snapshot · Aug 28, 2026"}
          </span>
          <span className="github-legend" aria-label="Contribution intensity from less to more">
            Less
            {[0, 1, 2, 3, 4].map((level) => <i key={level} className={`github-day level-${level}`} />)}
            More
          </span>
        </div>
      </div>
    </section>
  );
}
