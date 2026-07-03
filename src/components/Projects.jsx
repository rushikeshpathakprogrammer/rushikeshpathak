import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS, GITHUB_URL } from '../data/projects.js'

const N = PROJECTS.length
const ANGLE = 360 / N
const CARD_W = 340
const RADIUS = Math.round(CARD_W / 2 / Math.tan(Math.PI / N)) + 60

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const dragStart = useRef(null)
  const autoplayRef = useRef(null)

  const active = ((current % N) + N) % N

  const restartAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => setCurrent((c) => c + 1), 4200)
  }, [])

  useEffect(() => {
    restartAutoplay()
    return () => clearInterval(autoplayRef.current)
  }, [restartAutoplay])

  const next = () => { setCurrent((c) => c + 1); restartAutoplay() }
  const prev = () => { setCurrent((c) => c - 1); restartAutoplay() }

  const goTo = (i) => {
    setCurrent((c) => {
      const cur = ((c % N) + N) % N
      let delta = i - cur
      if (delta > N / 2) delta -= N
      if (delta < -N / 2) delta += N
      return c + delta
    })
    restartAutoplay()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerDown = (e) => { dragStart.current = e.clientX }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (dx < -40) next()
    else if (dx > 40) prev()
  }

  return (
    <section className="section" id="projects">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-tag glass-chip">03 · Featured Work</span>
        <h2 className="section-title">Projects from <span className="gradient-text">GitHub</span></h2>
        <p className="section-sub">A hand-picked slice of my 500+ builds — drag, swipe or use the arrows.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="carousel-scene">
          <div
            className="carousel"
            style={{ transform: `translateZ(${-RADIUS}px) rotateY(${-current * ANGLE}deg)` }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {PROJECTS.map((p, i) => (
              <article
                key={p.name}
                className="carousel-card"
                style={{ transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)` }}
              >
                <div className="card-top">
                  <span className="card-glyph">{p.glyph}</span>
                  <span className="card-lang">{p.lang}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="card-tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <a className="card-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  View on GitHub →
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button className="ctrl-btn glass-chip" onClick={prev} aria-label="Previous project">‹</button>
          <div className="carousel-dots">
            {PROJECTS.map((p, i) => (
              <button
                key={p.name}
                className={i === active ? 'active' : ''}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
          <button className="ctrl-btn glass-chip" onClick={next} aria-label="Next project">›</button>
        </div>
      </motion.div>

      <div className="projects-footer">
        <a className="btn btn-glass" href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          Explore all repositories on GitHub ↗
        </a>
      </div>
    </section>
  )
}
