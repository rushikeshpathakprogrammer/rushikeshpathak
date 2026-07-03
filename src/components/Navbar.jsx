import { useEffect, useState } from 'react'
import { GITHUB_URL } from '../data/projects.js'

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  return (
    <nav className={`glass-nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="logo">R<span>P</span><em>.</em></a>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={active === l.id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub ↗</a>
      <button
        className={`hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
