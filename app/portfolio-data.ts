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
  affiliation?: string;
  href?: string;
  premise: string;
  method: string;
  outcome: string;
  metric: string;
  stack: string[];
};

export type LeadershipItem = {
  period: string;
  role: string;
  organization: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type Course = {
  semester: "Spring 2026" | "Fall 2026";
  code: string;
  title: string;
  professor: string;
  professorHref: string;
  status: "Completed" | "Registered";
  percentage?: string;
  grade?: string;
};

export type UndergraduateCourseGroup = {
  area: string;
  courses: Array<{
    code: string;
    title: string;
    grade: string;
  }>;
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

export type ResearchInterest = {
  title: string;
  description: string;
};

export type Certification = {
  title: string;
  issuer: string;
  badgeId: string;
};

export const profileMetrics: Metric[] = [
  { value: "3.926", label: "Graduate CGPA" },
  { value: "97.14%", label: "Graduate ML" },
  { value: "95.25%", label: "Computer engineering" },
  { value: "4,415", label: "LLM training samples" },
];

export const researchInterests: ResearchInterest[] = [
  {
    title: "Resource-efficient machine learning",
    description:
      "Fine-tuning and evaluating useful language and vision systems under limited compute and memory budgets.",
  },
  {
    title: "Algorithms for networked systems",
    description:
      "Scheduling, fairness and learning-based allocation when shared resources are constrained.",
  },
  {
    title: "Intelligent engineering systems",
    description:
      "Software, sensing and control for dependable infrastructure, automation and electric mobility.",
  },
];

export const certifications: Certification[] = [
  {
    title: "AI Engineering Professional Certificate",
    issuer: "IBM",
    badgeId: "bd3c360a-3770-4ffd-8a59-e831b1cc8245",
  },
  {
    title: "Data Science Professional Certificate",
    issuer: "IBM",
    badgeId: "a2494e8e-f248-4e97-9a4c-b4bcf836f5b8",
  },
  {
    title: "Machine Learning Foundations",
    issuer: "AWS Educate",
    badgeId: "362f2ea3-6477-4a34-b022-84106387ffd7",
  },
  {
    title: "Cybersecurity Foundations",
    issuer: "Cisco",
    badgeId: "05ecc8a0-69ca-47a9-97c3-d261fa2fa190",
  },
];

export const experiences: Experience[] = [
  {
    kind: "education",
    period: "2026 — 2028",
    role: "MS, Electrical & Computer Engineering",
    organization: "Northeastern University",
    location: "Boston, Massachusetts",
    summary:
      "Concentration: Machine Learning, Computer Vision & Algorithms.",
    outcomes: ["3.926 CGPA", "Expected May 2028"],
    stack: ["Machine learning", "Computer vision", "Algorithms", "Computer architecture"],
  },
  {
    kind: "experience",
    period: "Apr 2022 — Jul 2023",
    role: "Software Engineer",
    organization: "Guardian Life (Fortune 250 US insurance company)",
    location: "Chennai, India",
    summary:
      "Built Java and Python backend services for an insurance platform, improved a critical policy lookup path, moved background work to reliable queues and deployed ML models behind FastAPI services.",
    outcomes: ["3 backend services", "20+ REST endpoints", "42% lower p95 latency", "80% line coverage", "120+ automated tests"],
    stack: ["Java", "Spring Boot", "Python", "FastAPI", "Kafka", "AWS SQS", "Amazon S3", "Splunk", "AWS CloudWatch", "OAuth 2.0", "Docker", "JUnit", "pytest"],
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
];

export const coursework: Course[] = [
  {
    semester: "Spring 2026",
    code: "EECE 5644",
    title: "Introduction to Machine Learning and Pattern Recognition",
    professor: "David Brady",
    professorHref: "https://www.linkedin.com/in/david-brady-a7191315",
    status: "Completed",
    percentage: "97.14%",
    grade: "A",
  },
  {
    semester: "Spring 2026",
    code: "EECE 7205",
    title: "Fundamentals of Computer Engineering",
    professor: "Naveen Sapavath",
    professorHref: "https://coe.northeastern.edu/people/sapavath-naveen-naik/",
    status: "Completed",
    percentage: "95.25%",
    grade: "A",
  },
  {
    semester: "Fall 2026",
    code: "EECE 5668",
    title: "Large Language Models",
    professor: "Weiyan Shi",
    professorHref: "https://www.linkedin.com/in/weiyan-s-8b2a3b86",
    status: "Registered",
  },
  {
    semester: "Fall 2026",
    code: "IE 7374",
    title: "Machine Learning Operations",
    professor: "Ramin Mohammadi",
    professorHref: "https://www.linkedin.com/in/ramin-madi",
    status: "Registered",
  },
];

export const undergraduateCourseGroups: UndergraduateCourseGroup[] = [
  {
    area: "Computing & embedded systems",
    courses: [
      { code: "GE8151", title: "Problem Solving and Python Programming", grade: "B+" },
      { code: "CS8392", title: "Object Oriented Programming", grade: "A+" },
      { code: "OCS752", title: "Introduction to C Programming", grade: "O" },
      { code: "EE8551", title: "Microprocessors and Microcontrollers", grade: "A+" },
      { code: "EE8691", title: "Embedded Systems", grade: "O" },
      { code: "OIT552", title: "Cloud Computing", grade: "A+" },
    ],
  },
  {
    area: "Electronics & circuits",
    courses: [
      { code: "EE8251", title: "Circuit Theory", grade: "B" },
      { code: "EC8353", title: "Electron Devices and Circuits", grade: "B" },
      { code: "EE8351", title: "Digital Logic Circuits", grade: "B" },
      { code: "EE8451", title: "Linear Integrated Circuit and Applications", grade: "B+" },
      { code: "EE8461", title: "Linear and Digital Integrated Circuits Laboratory", grade: "O" },
    ],
  },
  {
    area: "Signals, control & computation",
    courses: [
      { code: "EE8591", title: "Digital Signal Processing", grade: "A+" },
      { code: "IC8451", title: "Control Systems", grade: "B+" },
      { code: "EE8403", title: "Measurements and Instrumentation", grade: "B+" },
      { code: "MA8491", title: "Numerical Methods", grade: "B+" },
    ],
  },
  {
    area: "Electrical energy & automation",
    courses: [
      { code: "EE8552", title: "Power Electronics", grade: "A+" },
      { code: "EE8601", title: "Solid State Drives", grade: "A+" },
      { code: "EE8602", title: "Protection and Switchgear", grade: "A+" },
      { code: "EE8702", title: "Power System Operation and Control", grade: "O" },
      { code: "EE8703", title: "Renewable Energy Systems", grade: "A+" },
      { code: "EE8016", title: "Energy Management and Auditing", grade: "A" },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Multi-Camera BEV Perception",
    date: "August 2026",
    category: "Computer vision & model deployment",
    href: "https://github.com/dheepakkaran/multi-camera-bev",
    premise:
      "Can six synchronized cameras produce a useful 3D bird’s-eye-view map for autonomous driving without LiDAR or radar?",
    method:
      "Built a 5.48M-parameter camera-only pipeline with EfficientNet-B0, 64-bin Lift-Splat-Shoot depth estimation, a ResNet-18 FPN BEV encoder and a CenterPoint detection head; exported it through ONNX and benchmarked TensorRT deployment on a Tesla T4.",
    outcome:
      "TensorRT FP32 reached 24.34 ms per six-camera frame (41.1 FPS), a 1.34× speedup over PyTorch FP32 without the detection loss observed under aggressive INT8 quantization; the model is also served through NVIDIA Triton.",
    metric: "41.1 FPS TensorRT FP32",
    stack: ["Python", "PyTorch", "nuScenes", "ONNX Runtime", "TensorRT", "NVIDIA Triton", "Gradio"],
  },
  {
    title: "xG from Words",
    date: "August 2026",
    category: "Applied ML & sports analytics",
    href: "https://github.com/dheepakkaran/xg-from-words",
    premise:
      "Can free football commentary estimate shot quality and travel across leagues when commercial coordinate data is unavailable?",
    method:
      "Built a leakage-audited expected-goals model from 18 commentary-derived fields, aligned 8,825 ESPN and StatsBomb shots for held-out evaluation, and tested one Premier League model across five additional competitions without retraining.",
    outcome:
      "Reached 0.7826 AUC against StatsBomb’s 0.8118, recovering 90.6% of the coordinate model’s discrimination above chance; cross-league evaluation covered 87,980 shots with AUC between 0.7702 and 0.7871.",
    metric: "0.7826 AUC from commentary",
    stack: ["Python", "pandas", "scikit-learn", "Qdrant", "pytest", "GitHub Actions"],
  },
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
    affiliation: "NLC India Limited · Neyveli, India",
    premise:
      "Protect a 210 MW generator when stator-water flow, pressure or conductivity remains outside operating limits for more than 60 seconds.",
    method:
      "Designed PLC ladder logic for continuous instrumentation, alarm and trip interlocks, and automatic duty/standby pump changeover on drive faults.",
    outcome:
      "Verified the scheme against live operating limits during a two-month on-site project at an operating power station.",
    metric: "60-second safety window",
    stack: ["PLC ladder logic", "Motor control", "Flow / pressure / conductivity instrumentation", "Alarm & trip interlocks"],
  },
  {
    title: "Petrol-to-Electric Vehicle Conversion",
    date: "2021",
    category: "EV systems & prototyping",
    affiliation: "Anna University · Chennai, India",
    premise:
      "Convert an Ambassador sedan from petrol to battery-electric while retaining its transmission, steering and braking systems.",
    method:
      "Worked in a three-person team to strip the combustion hardware, model the converted layout in 3D CAD, size and series-wire the traction pack, and feed the 12 V accessory circuit through a DC/DC converter.",
    outcome:
      "Integrated the motor, controller, throttle and power-distribution layout while following high-voltage handling and battery-ventilation rules on a shared workshop floor.",
    metric: "3-person retrofit team",
    stack: ["3D CAD", "Battery pack wiring", "Motor control", "DC/DC conversion", "Mechanical assembly", "Workshop safety"],
  },
];

export const leadership: LeadershipItem[] = [
  {
    period: "Initiative",
    role: "Contributor, AI for India",
    organization: "GUVI Guinness World Record Initiative",
    summary:
      "Collaborated with more than 100,000 aspirants to learn and build a face-recognition model at scale.",
    highlights: ["Applied AI learning", "Large-scale collaboration"],
  },
  {
    period: "2024 — 2025",
    role: "Community School Volunteer",
    organization: "Family-run school",
    summary:
      "Supported programming lab sessions, assisted students and helped maintain basic academic and financial records.",
    highlights: ["Programming support", "Student assistance", "Academic operations"],
  },
  {
    period: "Dec 2018 — Jan 2022",
    role: "Departmental Sports Coordinator",
    organization: "Anna University",
    location: "Chennai, India",
    summary:
      "Coordinated practice and match schedules, managed shared equipment and served as the liaison between students, faculty and the college sports office.",
    highlights: ["Sports operations", "Student-faculty coordination", "Equipment & safety oversight"],
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
    label: "LeetCode",
    href: "https://leetcode.com/u/___ka__ran___/",
    note: "Programming practice",
  },
];

export const skillGroups = [
  { label: "Programming", values: ["Python", "C++", "Java", "SQL"] },
  { label: "Machine learning", values: ["PyTorch", "Scikit-learn", "XGBoost", "Computer vision"] },
  { label: "Backend systems", values: ["Spring Boot", "FastAPI", "REST APIs", "Microservices", "Kafka"] },
  { label: "Data", values: ["Pandas", "NumPy", "Statistics", "Data cleaning", "Web scraping"] },
  { label: "Engineering", values: ["Docker", "CI/CD", "Testing", "Git/GitHub", "Linux"] },
  { label: "Physical systems", values: ["Circuit analysis", "3D CAD", "Battery systems", "Motor control", "PLC programming", "Instrumentation", "Industrial control"] },
];
