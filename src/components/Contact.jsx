import { motion } from 'framer-motion'
import { EMAIL, GITHUB_URL } from '../data/projects.js'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <motion.div
        className="contact-card glass-card"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-glow" />
        <span className="section-tag glass-chip">04 · Let's Talk</span>
        <h2 className="section-title">Have a project? <span className="gradient-text">Let's build it.</span></h2>
        <p className="section-sub">Open for freelance work, collaborations and consulting — domestic &amp; international.</p>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email Me →</a>
          <a className="btn btn-glass" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </motion.div>
    </section>
  )
}
