export type Metric = {
  value: string;
  label: string;
};

export type Act = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  year: string;
  image?: string;
  imageAvif?: string;
  imagePosition?: string;
  quote: string;
  body: string[];
  metrics: Metric[];
  stack: string[];
  tone: "saffron" | "magenta" | "cobalt" | "cyan" | "gold";
};

export type Project = {
  title: string;
  date: string;
  premise: string;
  method: string;
  outcome: string;
  stack: string[];
};

export type ExternalLink = {
  label: string;
  href: string;
  note: string;
};

export const acts: Act[] = [
  {
    id: "spark",
    number: "01",
    eyebrow: "NLC India · Industrial automation",
    title: "Safety-critical control for a 210 MW generator.",
    year: "2022",
    image: "/scenes/neyveli-1920.webp",
    imageAvif: "/scenes/neyveli-1920.avif",
    imagePosition: "55% center",
    quote:
      "Before the models, the APIs and the algorithms, there was a generator that could not afford to fail.",
    body: [
      "At NLC India Limited, a 210 MW lignite-fired generator depended on the flow, pressure and conductivity of its cooling water. If any signal stayed outside its limits for more than 60 seconds, the unit could trip off the grid.",
      "Dheepak designed a PLC ladder-logic scheme that read all three parameters, automated duty and standby pump changeover, and raised alarm and trip signals within the safety window. Anna University had taught him circuits. The plant taught him consequence.",
    ],
    metrics: [
      { value: "210 MW", label: "generator capacity" },
      { value: "60 sec", label: "safety window" },
      { value: "3", label: "live plant signals" },
    ],
    stack: [
      "PLC ladder logic",
      "Flow sensors",
      "Pressure sensors",
      "Conductivity meters",
      "Industrial automation",
    ],
    tone: "saffron",
  },
  {
    id: "scale",
    number: "02",
    eyebrow: "Guardian Life · Backend engineering",
    title: "Production systems designed for scale.",
    year: "2022—23",
    image: "/scenes/chennai-1920.webp",
    imageAvif: "/scenes/chennai-1920.avif",
    imagePosition: "center center",
    quote:
      "The system was no longer one machine. It was thousands of requests moving at once.",
    body: [
      "At Guardian Life, Dheepak moved from physical control systems to production backend services. He built policy-processing APIs and asynchronous workflows with Java, Python, PostgreSQL, Kafka and AWS.",
      "He optimized queries, indexing and concurrent request handling, then helped integrate machine-learning models into secure, Dockerized APIs with OAuth 2.0 authentication.",
    ],
    metrics: [
      { value: "+30%", label: "API performance" },
      { value: "−25%", label: "database latency" },
      { value: "−20%", label: "response time" },
      { value: "+85%", label: "recommendation accuracy" },
    ],
    stack: ["Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Kafka", "AWS", "Docker"],
    tone: "magenta",
  },
  {
    id: "crossing",
    number: "03",
    eyebrow: "Northeastern University · Graduate study",
    title: "Deepening the link between systems and intelligence.",
    year: "2026—28",
    image: "/scenes/boston-1920.webp",
    imageAvif: "/scenes/boston-1920.avif",
    imagePosition: "center center",
    quote:
      "Electronics taught constraint. Software taught scale. Graduate study became the bridge between them.",
    body: [
      "At Northeastern University, Dheepak is pursuing an MS in Electrical and Computer Engineering with a concentration in machine learning, computer vision and algorithms.",
      "His path is not a clean genre change. It is one continuous question: how can intelligence move from code into systems that matter in the physical world?",
    ],
    metrics: [
      { value: "3.926", label: "graduate CGPA" },
      { value: "MS ECE", label: "Northeastern University" },
      { value: "May ’28", label: "expected graduation" },
    ],
    stack: ["Machine learning", "Computer vision", "Algorithms", "Computer architecture", "Systems"],
    tone: "cobalt",
  },
  {
    id: "language",
    number: "04",
    eyebrow: "Multilingual AI · LLM fine-tuning",
    title: "An 8B model adapted for how people actually speak.",
    year: "2026",
    image: "/scenes/language-1920.webp",
    imageAvif: "/scenes/language-1920.avif",
    imagePosition: "center center",
    quote:
      "An 8-billion-parameter model. One modest GPU. A language lived between two scripts.",
    body: [
      "Open models often answer Tamil-English code-switched questions poorly—or switch into Tamil script when the user writes Tanglish. Dheepak built an open-source technical Q&A dataset of 4,415 samples to close that gap.",
      "He fine-tuned Llama 3.1 8B Instruct with 4-bit QLoRA on a single NVIDIA T4, reducing GPU memory use by 75% and test perplexity from 57.05 to 12.40.",
    ],
    metrics: [
      { value: "4,415", label: "Q&A samples" },
      { value: "92%", label: "from real comments" },
      { value: "−78%", label: "test perplexity" },
      { value: "<3 sec", label: "demo response" },
    ],
    stack: ["PyTorch", "Hugging Face", "PEFT", "TRL", "QLoRA", "Pandas", "Gradio"],
    tone: "cyan",
  },
  {
    id: "fairness",
    number: "05",
    eyebrow: "FairShare-WiFi · Network research",
    title: "Evaluating fairness under network congestion.",
    year: "2026",
    quote:
      "When bandwidth becomes scarce, a scheduler reveals what it values.",
    body: [
      "FairShare-WiFi models a congested access point as a scheduling system. It generates heterogeneous traffic from stochastic models and infers behavior from measurable traffic patterns—not private content.",
      "FIFO, Priority, Weighted Fair and DKernelUCB are compared across throughput, latency, packet drops and Jain’s Fairness Index to expose the trade-off between fairness and efficiency without pretending one metric tells the whole story.",
    ],
    metrics: [
      { value: "4", label: "scheduler families" },
      { value: "4", label: "evaluation dimensions" },
      { value: "0", label: "content inspected" },
    ],
    stack: ["Python", "NumPy", "Discrete-event simulation", "Kernel UCB", "Matplotlib"],
    tone: "gold",
  },
];

export const projects: Project[] = [
  {
    title: "Multilingual LLM Fine-Tuning",
    date: "May 2026",
    premise:
      "Build a technical assistant that understands Tamil-English code switching and answers naturally in Tanglish.",
    method:
      "Scrape and clean real public comments, add structured synthetic examples, then fine-tune Llama 3.1 8B Instruct with 4-bit QLoRA on a single T4 GPU.",
    outcome:
      "Released a 26 MB adapter, dataset and Gradio demo; test perplexity fell 78%, from 57.05 to 12.40.",
    stack: ["Python", "PyTorch", "Transformers", "PEFT", "TRL", "Gradio"],
  },
  {
    title: "FairShare-WiFi",
    date: "April 2026",
    premise:
      "Study how shared wireless networks can allocate scarce bandwidth more fairly under congestion.",
    method:
      "Model heterogeneous traffic with discrete-event simulation and compare classic schedulers against a kernel contextual bandit.",
    outcome:
      "A measurement-driven comparison of throughput, latency, packet drops and Jain’s Fairness Index—without inspecting content.",
    stack: ["Python", "NumPy", "Simulation", "Contextual bandits", "Matplotlib"],
  },
  {
    title: "PLC Stator Water Cooling",
    date: "March 2022",
    premise:
      "Replace relay-and-timer blind spots with continuous monitoring for a 210 MW generator’s cooling system.",
    method:
      "Read flow, pressure and conductivity, automate pump changeover, and raise alarm and trip signals within the safety window.",
    outcome:
      "A ladder-logic scheme verified against live plant operating limits observed during the two-month on-site project.",
    stack: ["PLC", "Ladder logic", "Sensors", "Relay logic", "Industrial control"],
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
    label: "Credentials",
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
