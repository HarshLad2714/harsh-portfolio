import { useEffect, useState } from "react"
import { About, Community, Contact, Experience, Footer, Hero, Marquee, Nav, Projects, Skills } from "./site"

export default function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
