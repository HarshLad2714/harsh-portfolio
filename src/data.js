export const profile = {
  name: "Harsh Lad",
  role: "Laravel Team Lead & Project Manager",
  email: "hardieslad@gmail.com",
  phone: "+91 97260 71397",
  phoneHref: "tel:+919726071397",
  location: "Surat, India",
  github: "https://github.com/HarshLad2714",
  resume: "/documents/Harsh_Lad_Resume.pdf",
}

export const facts = [
  { label: "Based in", value: "Surat, India" },
  { label: "Languages", value: "Hindi, English, Gujarati" },
  { label: "Education", value: "Integrated MSc IT, Uka Tarsadia University, Bardoli · 2014–2019" },
  { label: "Off the clock", value: "Cricket, table tennis, volleyball" },
]

export const leadership = [
  "Led development teams and owned delivery from plan to production.",
  "Designed backend systems, REST APIs, and third-party integrations.",
  "Mentored juniors through code reviews and hands-on guidance.",
  "Set up CI/CD and auto-deployment so releases stay repeatable.",
]

export const experience = [
  {
    role: "Laravel Team Lead & Project Manager",
    company: "Whyphy Technologies",
    place: "Surat",
    dates: "August 2025 — Present",
    current: true,
    points: [
      "Lead planning, execution, and delivery across multiple Laravel applications.",
      "Manage the development team against timelines and code quality.",
      "Mentor juniors and stay close to their growth.",
      "Handle server deployment and releases with CI/CD and auto-deployment.",
      "Apply OWASP practices: SQL injection, broken access control, CSRF, authentication, data exposure, and security misconfiguration.",
    ],
  },
  {
    role: "Laravel Team Lead & Project Manager",
    company: "Triveni Globalsoft Solution",
    place: "Surat",
    dates: "October 2023 — August 2025",
    points: [
      "Led planning and delivery across several Laravel applications.",
      "Managed the team so timelines and code quality held.",
      "Was the main client contact for requirements, updates, and feedback.",
      "Owned third-party API integrations and architecture decisions.",
      "Mentored junior developers.",
    ],
  },
  {
    role: "Senior Software Engineer & Team Leader",
    company: "Codesdot Solution",
    place: "Surat",
    dates: "June 2022 — October 2023",
    points: [
      "Ran project lifecycles from planning to deployment on Laravel and PHP.",
      "Worked with clients on requirements and progress.",
      "Supervised developers, ran code reviews, and kept the team on good practice.",
      "Delivered complex integrations with external services and APIs.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "WeEnggs Technology",
    place: "Surat",
    dates: "August 2020 — June 2022",
    points: [
      "Built and maintained Laravel applications with RESTful APIs.",
      "Joined schema design and query optimization.",
      "Worked with frontend teams so backend and UI met cleanly.",
      "Cleared performance bottlenecks and supported deployment.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Alita Infotech",
    place: "Surat",
    dates: "July 2018 — August 2020",
    points: [
      "Built web applications with PHP and CodeIgniter.",
      "Shipped CRUD, authentication, and reporting.",
      "Joined code reviews and debugging, and integrated third-party services.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Freelancing",
    place: "Surat",
    dates: "June 2016 — July 2018",
    points: [
      "Built web applications with PHP and CodeIgniter.",
      "Shipped CRUD, authentication, and reporting.",
      "Integrated third-party services and kept the code maintainable.",
    ],
  },
]

export const skillGroups = [
  {
    title: "Engineering",
    lead: true,
    items: [
      "PHP",
      "Laravel 5–12",
      "CodeIgniter",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Database design",
      "JavaScript",
      "jQuery",
      "HTML & CSS",
    ],
  },
  {
    title: "Frontend & full stack",
    items: ["Vue.js", "React.js", "Node.js", "MERN", "Python"],
  },
  {
    title: "Delivery",
    items: ["GitHub", "GitLab", "Bitbucket", "Gitpod", "Jira", "Asana", "ClickUp", "Trello", "Docker"],
  },
  {
    title: "Cloud & security",
    items: ["AWS", "DigitalOcean", "VPS", "Shared hosting", "SSL", "Firewall", "CI/CD", "OWASP"],
  },
  {
    title: "AI in the workflow",
    items: ["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Grok", "Google Antigravity"],
  },
]

const project = (name, tags, note = "") => ({ name, tags, note })

export const projects = [
  project("The Birla White Experts Clubs", ["Laravel"]),
  project("Swoopos", ["Laravel"]),
  project("Polygogo (Client)", ["Laravel"]),
  project("Coach Culture", ["Laravel"]),
  project("ApkaMD", ["Laravel"]),
  project("Tennis Franke", ["Laravel"]),
  project("School Management System", ["Laravel"]),
  project("Mansoor Traveling", ["Laravel"]),
  project("Smartshifts", ["Laravel"]),
  project("ILH Quiz", ["Laravel"]),
  project("Zappads", ["Laravel"]),
  project("Clinicaimprove", ["Laravel"]),
  project("Viabox", ["Laravel"]),
  project("Ding", ["Laravel"]),
  project("Shishkabas — Touchpaysa", ["Laravel", "Vue.js"], "Laravel with Vue.js"),
  project("KHMS", ["Laravel"], "Kribhco Hospital Management System"),
  project("KRES", ["Laravel"], "Kribhco E-Seva"),
  project("LeoCoats", ["Laravel"]),
  project("WasteShield", ["Laravel"]),
  project("Bekon", ["Laravel"]),
  project("EComPort", ["Laravel"], "In-house commerce product, in the spirit of Shopify"),
  project("SAMP — TYT", ["Laravel"]),
  project("IIMS", ["Laravel"], "Integrated Institute Management System"),
  project("MCTC", ["Laravel"], "Habit tracker"),
  project("Tastyhasty", ["Laravel", "Vue.js"], "Laravel with a Vue.js frontend"),
  project("Food Foundry", ["Laravel", "Vue.js"], "Laravel with a Vue.js frontend"),
  project("FASIL HRMS", ["CodeIgniter"]),
  project("MARG Loan", ["CodeIgniter"]),
  project("Samaj", ["CodeIgniter"], "Community platform"),
  project("Whoz Nxt", ["CodeIgniter"]),
  project("Prathiya Loan", ["CodeIgniter"]),
  project("Archna Academy", ["CodeIgniter"]),
  project("Sleep Times", ["CodeIgniter"]),
  project("Gdigadiga", ["CodeIgniter"]),
  project("AussieMobileskips", ["CodeIgniter"]),
  project("PMS", ["CodeIgniter"]),
  project("Polygogo (Admin)", ["Core PHP"]),
  project("The Maintenance Team", ["Core PHP"]),
  project("Contractor Foreman", ["Core PHP"]),
  project("Open EMR", ["Core PHP"]),
  project("Jobstar Australia", ["Core PHP"]),
  project("Ron Maenchhe", ["Core PHP"]),
  project("AMS", ["Vue.js"]),
  project("Radianmeet", ["Symfony", "React.js"], "Symfony backend with React.js"),
].map((item, index) => ({ ...item, id: index + 1 }))

export const featured = [
  projects.find((item) => item.name === "KHMS"),
  projects.find((item) => item.name === "EComPort"),
  projects.find((item) => item.name === "IIMS"),
  projects.find((item) => item.name === "Tastyhasty"),
  projects.find((item) => item.name === "Radianmeet"),
  projects.find((item) => item.name === "KRES"),
]

export const filters = [
  { id: "All", label: "All" },
  { id: "Laravel", label: "Laravel" },
  { id: "CodeIgniter", label: "CodeIgniter" },
  { id: "Core PHP", label: "Core PHP" },
  { id: "Frontend", label: "Vue & React" },
]

export function matchesFilter(item, filter) {
  if (filter === "All") return true
  if (filter === "Frontend") {
    return item.tags.some((tag) => ["Vue.js", "React.js", "Symfony"].includes(tag))
  }
  return item.tags.includes(filter)
}

export const ticker = [
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Vue.js",
  "React.js",
  "Docker",
  "AWS",
  "CI/CD",
  "OWASP",
  "CodeIgniter",
  "Node.js",
]
