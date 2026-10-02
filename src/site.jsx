import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUpRight,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react"
import {
  experience,
  facts,
  featured,
  filters,
  leadership,
  matchesFilter,
  profile,
  projects,
  skillGroups,
  ticker,
} from "./data"

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

const navLinks = [
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["community", "Community"],
  ["contact", "Contact"],
]

function useInView() {
  const [node, setNode] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!node || shown) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true)
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, shown])

  return [setNode, shown]
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const [ref, shown] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = [...document.querySelectorAll("main section[id]")]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="wrap nav-bar">
        <a className="logo" href="#home" onClick={close}>
          Harsh<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "page" : undefined}>
              {label}
            </a>
          ))}
          <a className="btn btn-fill" href={profile.resume} target="_blank" rel="noreferrer">
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="nav-panel" aria-label="Mobile">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close}>
              {label}
            </a>
          ))}
          <a className="btn btn-fill" href={profile.resume} target="_blank" rel="noreferrer" onClick={close}>
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </nav>
      )}
    </header>
  )
}

const roles = ["Team lead", "Laravel architect", "Project manager"]

function TypedRole() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [text, setText] = useState(reduce ? roles.join(" · ") : "")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const word = roles[index]
    const finished = deleting ? text.length === 0 : text === word
    const delay = finished ? (deleting ? 240 : 1300) : deleting ? 36 : 72
    const timer = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text.length === 0) {
        setDeleting(false)
        setIndex((value) => (value + 1) % roles.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, index, reduce])

  return (
    <p className="typed" aria-label="Team lead, Laravel architect, and project manager">
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}

function Constellation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const ctx = canvas.getContext("2d")
    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
    }))
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      dots.forEach((dot) => {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < 0 || dot.x > 1) dot.vx *= -1
        if (dot.y < 0 || dot.y > 1) dot.vy *= -1
      })
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = (dots[i].x - dots[j].x) * width
          const dy = (dots[i].y - dots[j].y) * height
          const dist = Math.hypot(dx, dy)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 200, 87, ${(1 - dist / 150) * 0.38})`
            ctx.beginPath()
            ctx.moveTo(dots[i].x * width, dots[i].y * height)
            ctx.lineTo(dots[j].x * width, dots[j].y * height)
            ctx.stroke()
          }
        }
      }
      dots.forEach((dot) => {
        ctx.fillStyle = "rgba(255, 200, 87, 0.9)"
        ctx.beginPath()
        ctx.arc(dot.x * width, dot.y * height, 1.7, 0, Math.PI * 2)
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />
}

const skillTiles = [
  ["Laravel", "Lv"],
  ["PHP", "Ph"],
  ["MySQL", "My"],
  ["PostgreSQL", "Pg"],
  ["Vue.js", "Vu"],
  ["React", "Re"],
  ["AWS", "Aw"],
  ["Docker", "Dk"],
  ["CI/CD", "Ci"],
  ["OWASP", "Ow"],
]

function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? value : 0,
  )

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const started = performance.now()
    let frame = 0
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / 1200)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export function Hero() {
  const reduceMotion = useRef(false)
  const [shift, setShift] = useState({ x: 0, y: 0 })

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const onMove = (event) => {
    if (reduceMotion.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setShift({ x: x * 18, y: y * 12 })
  }

  return (
    <section
      className="hero"
      id="home"
      onMouseMove={onMove}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
    >
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Open to team lead, architect, and PM roles
          </p>
          <h1>
            Harsh <em>Lad</em>
          </h1>
          <TypedRole />
          <p className="promise">Laravel systems, led and shipped.</p>
          <p className="hero-lead">
            I lead Laravel teams in Surat. Architecture, delivery, and the people writing the code.
            Eleven years on the web, nine of them inside Laravel.
          </p>
          <div className="hero-actions">
            <a className="btn btn-fill" href="#contact">
              Hire me <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn-line" href={profile.resume} target="_blank" rel="noreferrer">
              <Download size={18} aria-hidden="true" />
              Download resume
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>
                <CountUp value={11} suffix="+" />
              </strong>
              <span>Years experience</span>
            </li>
            <li>
              <strong>
                <CountUp value={9} suffix="+" />
              </strong>
              <span>Years Laravel</span>
            </li>
            <li>
              <strong>
                <CountUp value={44} />
              </strong>
              <span>Products delivered</span>
            </li>
          </ul>
        </div>
        <div
          className="photo-parallax"
          style={{ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }}
        >
          <div className="photo-float">
            <div className="photo-stage">
              <div className="orbit-wrap">
                <svg className="orbit" viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path id="orbit-path" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
                  </defs>
                  <text>
                  <textPath href="#orbit-path" startOffset="0%" textLength="548" lengthAdjust="spacing">
                    LARAVEL · TEAM LEAD · SURAT · WE MUST SHIP ·
                  </textPath>
                  </text>
                </svg>
              </div>
              <figure className="hero-photo">
              <img
                src="/images/harsh-portrait.jpg"
                width="2252"
                height="4000"
                alt="Harsh Lad at Laracon India, in a yellow volunteer shirt"
                fetchPriority="high"
              />
            </figure>
            <span className="photo-chip">Laracon India</span>
            <span className="ship-stamp">We must ship</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  const row = reduceMotion ? ticker : [...ticker, ...ticker]
  return (
    <div className="marquee">
      <p className="sr-only">Technologies: {ticker.join(", ")}.</p>
      <div className="marquee-track" aria-hidden="true">
        {row.map((item, index) => (
          <span className="mq-item" key={`${item}-${index}`}>
            {item}
            <span className="mq-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">About</p>
            <h2>I lead the build, then I stay for the release.</h2>
          </div>
          <p>
            Senior Laravel developer and project manager. The work runs from the first requirement
            through architecture, the build, and production support.
          </p>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <p className="pull">Clear APIs, a team that can review each other, and a pipeline that actually ships.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="about-copy">
              <p>
                For 11+ years I have taken web products from concept to deployment. For 9+ of those
                years the core has been Laravel, from early 5.x through 12.x, with PHP, MySQL,
                PostgreSQL, Vue.js, React.js, and Node when the product needs them.
              </p>
              <p>
                I mentor developers, sit with clients, and keep security in the conversation:
                OWASP, access control, and a deployment path on AWS or DigitalOcean that the team
                can run again next week. I also volunteer with Laravel Surat and at Laracon.
              </p>
            </div>
            <ul className="facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="lead-grid">
          {leadership.map((item, index) => (
            <Reveal as="article" className="lead-card" delay={index * 70} key={item}>
              <em>0{index + 1}</em>
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Experience</p>
            <h2>From freelance PHP to leading the team.</h2>
          </div>
          <p>Based in Surat. The through-line is Laravel delivery, client communication, and people.</p>
        </Reveal>
        <div>
          {experience.map((job, index) => (
            <Reveal as="article" className="job" delay={Math.min(index * 40, 160)} key={`${job.company}-${job.dates}`}>
              <div>
                <time>{job.dates}</time>
                {job.current && <span className="now">Now</span>}
              </div>
              <div>
                <h3>{job.role}</h3>
                <p className="company">
                  {job.company} · {job.place}
                </p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section skills" id="skills">
      <Constellation />
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Skills</p>
            <h2>What I use to ship.</h2>
          </div>
          <p>Laravel is home. Around it: the data, the frontend, the servers, and the tools the team already lives in.</p>
        </Reveal>
        <div className="tile-grid">
          {skillTiles.map(([name, mark], index) => (
            <Reveal as="article" className="skill-tile" delay={index * 45} key={name}>
              <span>{mark}</span>
              <strong>{name}</strong>
            </Reveal>
          ))}
        </div>
        <div className="skill-split">
          <Reveal className="split-card from-left">
            <p className="kicker">How I lead</p>
            <h3>The team, the plan, the release.</h3>
            <ul>
              <li>Delivery from the first requirement through production</li>
              <li>Mentoring, code review, and client communication</li>
              <li>CI/CD so the next release is repeatable</li>
              <li>OWASP kept in the design, not added at the end</li>
            </ul>
          </Reveal>
          <Reveal className="split-card from-right" delay={90}>
            <p className="kicker">How I build</p>
            <h3>Laravel systems that stay up.</h3>
            <ul>
              {skillGroups[0].items.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <Reveal
              as="article"
              className={`skill-card ${group.lead ? "lead" : ""}`}
              delay={index * 60}
              key={group.title}
            >
              <h3>{group.title}</h3>
              <div className="pills">
                {group.items.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return projects.filter((item) => {
      const matchesName = !needle || item.name.toLowerCase().includes(needle) || item.note.toLowerCase().includes(needle)
      return matchesName && matchesFilter(item, filter)
    })
  }, [filter, query])

  const browsingAll = filter === "All" && query.trim() === ""
  const visible = browsingAll && !expanded ? filtered.slice(0, 8) : filtered

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Projects</p>
            <h2>The work, by name.</h2>
          </div>
          <p>
            {projects.length} named products across client work and in-house platforms. A few are called out,
            then the full archive.
          </p>
        </Reveal>
        <div className="feature-grid">
          {featured.map((item, index) => (
            <Reveal as="article" className="feature-card" delay={index * 50} key={item.name}>
              <div>
                <span className="feature-index">{String(index + 1).padStart(2, "0")}</span>
                <p className="stack">{item.tags.join(" · ")}</p>
                <h3>{item.name}</h3>
              </div>
              <p>{item.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="archive">
          <div className="archive-bar">
            <div className="filters" role="toolbar" aria-label="Filter projects">
              {filters.map((item) => {
                const count =
                  item.id === "All" ? projects.length : projects.filter((project) => matchesFilter(project, item.id)).length
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`chip ${filter === item.id ? "is-on" : ""}`}
                    aria-pressed={filter === item.id}
                    onClick={() => {
                      setFilter(item.id)
                      setExpanded(false)
                    }}
                  >
                    {item.label} {count}
                  </button>
                )
              })}
            </div>
            <label className="sr-only" htmlFor="project-search">
              Search projects
            </label>
            <input
              id="project-search"
              className="search"
              type="search"
              placeholder="Search the archive"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="archive-list" key={`${filter}-${query}`}>
            {visible.map((item) => (
              <article className="archive-row" key={item.id}>
                <b>{String(item.id).padStart(2, "0")}</b>
                <div>
                  <strong>{item.name}</strong>
                  {item.note && <small> · {item.note}</small>}
                </div>
                <span className="row-tags">{item.tags.join(" · ")}</span>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <p className="empty">Nothing in the archive matches that.</p>}
          {browsingAll && (
            <button className="btn btn-dark more" type="button" onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show fewer" : `Show all ${projects.length} products`}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

const communityStops = [
  {
    year: "2025",
    place: "Gandhinagar",
    title: "Laracon India",
    note: "On the floor as a volunteer: support, coordination, and the people in the room.",
  },
  {
    year: "2026",
    place: "Ahmedabad",
    title: "Laracon India",
    note: "Back for the next edition. Same job: show up and help the day run.",
  },
  {
    year: "Surat",
    place: "All year",
    title: "Laravel Surat",
    note: "The local meetup between conferences: networking, knowledge sharing, and event support.",
  },
]

export function Community() {
  const [active, setActive] = useState(0)
  const stop = communityStops[active]

  return (
    <section className="section community" id="community">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Community</p>
            <h2>Showing up for Laravel.</h2>
          </div>
          <p>Laracon on the ground, and Laravel Surat the rest of the year. Pick a stop on the route.</p>
        </Reveal>
        <div className="community-stage">
          <Reveal as="figure" className="community-photo">
            <img
              src="/images/harsh-event.jpg"
              width="2252"
              height="4000"
              alt="Harsh Lad volunteering at Laracon India, wearing a black Laracon India shirt"
              loading="lazy"
            />
            <figcaption aria-live="polite">
              <span>{stop.year}</span>
              <strong>{stop.title}</strong>
              <small>{stop.place}</small>
            </figcaption>
          </Reveal>
          <Reveal className="route-wrap">
            <span className="route-line" aria-hidden="true" />
            <div className="route" role="group" aria-label="Community stops">
              {communityStops.map((item, index) => (
                <button
                  key={item.title + item.year}
                  type="button"
                  className={`stop ${active === index ? "is-on" : ""}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  <b>{item.year}</b>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.place}</em>
                    <p>{item.note}</p>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="credential-row">
          <Reveal as="article" className="info-card">
            <p className="kicker">Publication</p>
            <h3>
              <FileText size={18} aria-hidden="true" /> Multi Model Biometrics Data Retrieval Through: Big-Data
            </h3>
            <p>Research paper. Happy to share the PDF with hiring teams.</p>
            <a href={`mailto:${profile.email}?subject=Research%20paper%20request`}>Request the PDF</a>
          </Reveal>
          <Reveal as="article" className="info-card" delay={80}>
            <p className="kicker">Education</p>
            <h3>
              <GraduationCap size={18} aria-hidden="true" /> Integrated MSc IT
            </h3>
            <p>Uka Tarsadia University, Bardoli, Surat. June 2014 — May 2019.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`)}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name}\n${form.email}${form.company ? `\n${form.company}` : ""}`,
  )}`

  const onSubmit = async (event) => {
    event.preventDefault()
    if (form["bot-field"]) {
      setStatus("sent")
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Add your name, email, and a short note.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("That email does not look quite right.")
      return
    }
    setError("")
    setStatus("sending")
    const body = new URLSearchParams({
      "form-name": "contact",
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.message,
    }).toString()

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      const text = await response.text()
      if (!response.ok || text.includes('id="root"')) {
        setStatus("local")
        return
      }
      setStatus("sent")
      const { default: confetti } = await import("canvas-confetti")
      confetti({
        particleCount: 90,
        spread: 68,
        origin: { y: 0.72 },
        colors: ["#ef9f1a", "#ffc857", "#1a1612", "#fffaf3"],
      })
    } catch {
      setStatus("local")
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <p className="kicker">Contact</p>
          <h2>Tell me what you need shipped.</h2>
          <p className="hero-lead" style={{ color: "var(--ink-soft)", marginTop: "1rem" }}>
            Available for team lead, Laravel architect, and project manager roles.
          </p>
          <ul className="contact-links">
            <li>
              <a href={profile.phoneHref}>
                <Phone size={18} aria-hidden="true" /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon /> GitHub
              </a>
            </li>
            <li>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontWeight: 600 }}>
                <MapPin size={18} aria-hidden="true" /> {profile.location}
              </span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={80}>
          {status === "sent" ? (
            <div className="form success">
              <h3>Message received.</h3>
              <p>I will reply at {form.email}.</p>
            </div>
          ) : (
            <form className="form" name="contact" method="POST" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hp">
                <label>
                  Don’t fill this out <input name="bot-field" tabIndex={-1} autoComplete="off" onChange={onChange} />
                </label>
              </p>
              <label className="field">
                <span>Name</span>
                <input name="name" autoComplete="name" value={form.name} onChange={onChange} required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
              </label>
              <label className="field">
                <span>Company</span>
                <input name="company" autoComplete="organization" value={form.company} onChange={onChange} />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" value={form.message} onChange={onChange} required maxLength={2000} />
              </label>
              {error && <p className="form-error">{error}</p>}
              {status === "local" && (
                <p className="form-note">
                  Netlify will collect this form after the site is deployed. Until then,{" "}
                  <a href={mailto}>email it directly</a>.
                </p>
              )}
              <button className="btn btn-dark" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-bar">
        <p>© 2026 Harsh Lad · Surat</p>
        <nav aria-label="Footer">
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
