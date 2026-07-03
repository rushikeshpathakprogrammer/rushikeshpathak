import { motion } from 'framer-motion'

const CARDS = [
  {
    icon: '✦',
    title: 'Founder & CEO ×2',
    body: <>I founded and lead <strong>two successful businesses</strong>, turning ideas into revenue-generating products and managing teams, clients and growth end-to-end.</>,
  },
  {
    icon: '◐',
    title: '250+ Clients Worldwide',
    body: <>As a freelancer I've delivered for <strong>250+ domestic &amp; international clients</strong> — from quick landing pages to full production systems.</>,
  },
  {
    icon: '◈',
    title: 'AI-Integrated Workflow',
    body: <>I <strong>integrate AI into my work</strong> for maximum workflow efficiency and use <strong>vibe coding</strong> to crack the most difficult tasks — shipping faster without sacrificing quality.</>,
  },
  {
    icon: '⌗',
    title: '500+ Projects Shipped',
    body: <>Over <strong>500 projects</strong> built across web apps, payment gateways, games and automation tools — full stack, front to back.</>,
  },
]

export default function About() {
  return (
    <section className="section" id="about">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-tag glass-chip">01 · Who I Am</span>
        <h2 className="section-title">Builder. Founder. <span className="gradient-text">Problem Solver.</span></h2>
      </motion.div>
      <div className="about-grid">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            className="about-card glass-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
