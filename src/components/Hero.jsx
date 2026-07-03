import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import useTypewriter from '../hooks/useTypewriter.js'
import { ROLES } from '../data/projects.js'

// ▼▼▼ PASTE YOUR IMAGE LINK HERE ▼▼▼
const PROFILE_IMAGE = 'https://cheappcgames.in.net/img.jpeg'
// ▲▲▲ PASTE YOUR IMAGE LINK HERE ▲▲▲

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Counter({ target, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target])

  return (
    <span ref={ref}>
      <span className="stat-num">{value}</span>
      <span className="stat-plus">{suffix}</span>
    </span>
  )
}

function ProfileCard() {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = PROFILE_IMAGE.startsWith('http') && !imgFailed

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <div className="profile-ring" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="orbit" />
      <div className="orbit orbit-2" />
      <div className="orbit orbit-3" />
      <motion.div className="profile-card" style={{ rotateX, rotateY }}>
        {showImage ? (
          <img src={PROFILE_IMAGE} alt="Rushikesh Pathak" onError={() => setImgFailed(true)} />
        ) : (
          <div className="img-fallback">RP</div>
        )}
      </motion.div>
      {[
        { cls: 'chip-1', label: '⌬ React', delay: 0 },
        { cls: 'chip-2', label: '⬡ MongoDB', delay: 1.2 },
        { cls: 'chip-3', label: '✦ AI-Powered', delay: 2.1 },
        { cls: 'chip-4', label: 'λ Python', delay: 3 },
      ].map((c) => (
        <motion.div
          key={c.cls}
          className={`float-chip ${c.cls} glass-chip`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        >
          {c.label}
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <header className="hero" id="hero">
      <div className="hero-content">
        <motion.div className="hero-text" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="hero-badge glass-chip">
            <span className="pulse-dot" /> Available for freelance work
          </motion.div>
          <motion.h1 variants={item} className="hero-title">
            <span className="line">Hi, I'm</span>
            <span className="line gradient-text">Rushikesh Pathak</span>
          </motion.h1>
          <motion.h2 variants={item} className="hero-sub">
            {typed}<span className="cursor">|</span>
          </motion.h2>
          <motion.p variants={item} className="hero-desc">
            Founder &amp; CEO of <strong>2 successful businesses</strong>. Full stack developer shipping
            real-world products with the MERN stack, Python &amp; C# — and supercharging every workflow
            with <strong>AI integration</strong> and <strong>vibe coding</strong> for the hardest problems.
          </motion.p>
          <motion.div variants={item} className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-glass">Hire Me</a>
          </motion.div>
          <motion.div variants={item} className="hero-stats">
            <div className="stat glass-card"><Counter target={500} suffix="+" /><span className="stat-label">Projects Built</span></div>
            <div className="stat glass-card"><Counter target={250} suffix="+" /><span className="stat-label">Global Clients</span></div>
            <div className="stat glass-card"><Counter target={2} suffix="" /><span className="stat-label">Businesses Founded</span></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <ProfileCard />
        </motion.div>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </header>
  )
}
