export type Metric = {
  value: string;
  label: string;
};

export type Experience = {
  kind: "education" | "experience";
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  outcomes: string[];
  stack: string[];
};

export type Project = {
  title: string;
  date: string;
  category: string;
  premise: string;
  method: string;
  outcome: string;
  metric: string;
  stack: string[];
};

export type BlogPost = {
  category: string;
  title: string;
  summary: string;
  takeaway: string;
  body: string[];
};

export type ExternalLink = {
  label: string;
  href: string;
  note: string;
};

export const profileMetrics: Metric[] = [
  { value: "3.926", label: "Graduate CGPA" },
  { value: "+30%", label: "API performance" },
  { value: "−78%", label: "LLM perplexity" },
  { value: "210 MW", label: "Industrial system" },
];

export const experiences: Experience[] = [
  {
    kind: "education",
    period: "2026 — 2028",
    role: "MS, Electrical & Computer Engineering",
    organization: "Northeastern University",
    location: "Boston, Massachusetts",
    summary:
      "Graduate work connecting machine learning, computer vision, algorithms and computer systems.",
    outcomes: ["3.926 CGPA", "Expected May 2028"],
    stack: ["Machine learning", "Computer vision", "Algorithms", "Computer architecture"],
  },
  {
    kind: "experience",
    period: "2022 — 2023",
    role: "Backend Engineer",
    organization: "Guardian Life",
    location: "Chennai, India",
    summary:
      "Built production APIs, asynchronous workflows and secure machine-learning services for policy-processing systems.",
    outcomes: ["30% API performance gain", "25% lower database latency", "20% faster response time"],
    stack: ["Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Kafka", "AWS", "Docker"],
  },
  {
    kind: "education",
    period: "Jul 2022",
    role: "BE, Electrical & Electronics Engineering",
    organization: "Anna University",
    location: "Tamil Nadu, India",
    summary:
      "Undergraduate study across electrical systems, electronics, control and embedded computing.",
    outcomes: ["Bachelor of Engineering", "Completed July 2022"],
    stack: [
      "Circuit theory",
      "Control systems",
      "Electronic devices",
      "Electromagnetic fields",
      "Power electronics",
      "Microprocessors & microcontrollers",
    ],
  },
  {
    kind: "experience",
    period: "2022",
    role: "Industrial Automation Project",
    organization: "NLC India Limited",
    location: "Neyveli, India",
    summary:
      "Designed PLC ladder logic for the stator-water cooling system of a 210 MW generator.",
    outcomes: ["3 live plant signals", "60-second safety window", "Automated pump changeover"],
    stack: ["PLC ladder logic", "Sensors", "Relay logic", "Industrial control"],
  },
];

export const projects: Project[] = [
  {
    title: "Multilingual LLM Fine-Tuning",
    date: "May 2026",
    category: "Machine learning",
    premise:
      "Build a technical assistant that understands Tamil-English code switching and answers naturally in Tanglish.",
    method:
      "Created a 4,415-sample dataset and fine-tuned Llama 3.1 8B Instruct with 4-bit QLoRA on one NVIDIA T4.",
    outcome:
      "Reduced test perplexity from 57.05 to 12.40 while producing a compact 26 MB adapter and sub-three-second demo responses.",
    metric: "75% lower GPU memory use",
    stack: ["Python", "PyTorch", "Transformers", "PEFT", "TRL", "Gradio"],
  },
  {
    title: "FairShare-WiFi",
    date: "April 2026",
    category: "Networks & ML",
    premise:
      "Study how shared wireless networks can allocate scarce bandwidth more fairly under congestion.",
    method:
      "Modeled heterogeneous traffic and compared FIFO, Priority, Weighted Fair and DKernelUCB schedulers.",
    outcome:
      "Built a measurement-driven comparison across throughput, latency, packet drops and Jain’s Fairness Index without inspecting content.",
    metric: "4 scheduler families",
    stack: ["Python", "NumPy", "Simulation", "Contextual bandits", "Matplotlib"],
  },
  {
    title: "PLC Stator Water Cooling",
    date: "March 2022",
    category: "Industrial automation",
    premise:
      "Replace relay-and-timer blind spots with continuous monitoring for a generator cooling system.",
    method:
      "Read flow, pressure and conductivity, automate duty/standby pump changeover and raise alarm and trip signals.",
    outcome:
      "Created a ladder-logic scheme verified against live operating limits observed during the on-site project.",
    metric: "210 MW generator",
    stack: ["PLC", "Ladder logic", "Sensors", "Relay logic", "Industrial control"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    category: "Machine learning note",
    title: "Fine-tuning an 8B model when compute is the constraint",
    summary:
      "What a single-T4 QLoRA workflow taught me about data quality, memory budgets and practical evaluation.",
    takeaway: "Good constraints make the experiment easier to reason about.",
    body: [
      "The central challenge was not simply fitting a large model on a modest GPU. It was deciding where limited compute would create the most value. Four-bit quantization and low-rank adapters made the run feasible; careful dataset construction made it useful.",
      "Perplexity gave a repeatable evaluation signal, but the final check was behavioral: could the model understand technical questions written in Tanglish and respond in the same natural register?",
    ],
  },
  {
    category: "Backend systems note",
    title: "Performance work starts with the path a request actually takes",
    summary:
      "A practical way to think about query latency, concurrency and asynchronous workflows as one system.",
    takeaway: "Measure the complete request path before optimizing one layer.",
    body: [
      "API performance is rarely the result of a single clever change. Database indexes, query design, network boundaries and concurrent processing all shape the response a user experiences.",
      "The most reliable improvements came from tracing the full path, isolating the bottleneck and validating each change against the original workload rather than optimizing in isolation.",
    ],
  },
  {
    category: "Systems note",
    title: "Fairness is a system property, not a single metric",
    summary:
      "Why throughput alone cannot explain whether a congested network is behaving well.",
    takeaway: "A scheduler reveals its priorities when resources become scarce.",
    body: [
      "A network can report strong aggregate throughput while individual traffic classes experience poor latency or persistent packet loss. That is why scheduler evaluation needs several measurements viewed together.",
      "Comparing classical policies with an adaptive approach made the trade-offs visible without relying on private packet content—only measurable traffic behavior.",
    ],
  },
];

export const externalLinks: ExternalLink[] = [
  {
    label: "Email",
    href: "mailto:elumalaisanthakuma.d@northeastern.edu",
    note: "Get in touch",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dheepakkaran/",
    note: "Professional profile",
  },
  {
    label: "GitHub",
    href: "https://github.com/dheepakkaran",
    note: "Code and projects",
  },
  {
    label: "Credly",
    href: "https://www.credly.com/users/dheepakkaran",
    note: "Verified credentials",
  },
];

export const skillGroups = [
  { label: "Programming", values: ["Python", "C++", "Java", "SQL"] },
  { label: "Machine learning", values: ["PyTorch", "Scikit-learn", "XGBoost", "Computer vision"] },
  { label: "Backend systems", values: ["Spring Boot", "FastAPI", "REST APIs", "Microservices", "Kafka"] },
  { label: "Data", values: ["Pandas", "NumPy", "Statistics", "Data cleaning", "Web scraping"] },
  { label: "Engineering", values: ["Docker", "CI/CD", "Testing", "Git/GitHub", "Linux"] },
  { label: "Physical systems", values: ["Circuit analysis", "PLC programming", "Sensors", "Industrial control"] },
];
