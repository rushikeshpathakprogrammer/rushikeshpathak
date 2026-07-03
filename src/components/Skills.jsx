import { motion } from 'framer-motion'
import { SKILLS } from '../data/projects.js'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-tag glass-chip">02 · My Arsenal</span>
        <h2 className="section-title">Tech <span className="gradient-text">Stack</span></h2>
        <p className="section-sub">MERN specialist with strong Python &amp; C# firepower — plus AI in the loop, always.</p>
      </motion.div>

      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-card glass-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="skill-icon">{s.icon}</span>
            <h4>{s.name}</h4>
            <div className="skill-bar">
              <motion.span
                className="skill-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="ai-banner glass-card"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ai-banner-glow" />
        <h3>✦ AI × Human Workflow</h3>
        <p>
          For the most difficult tasks I switch into <strong>vibe coding</strong> mode — pairing with AI to
          explore, prototype and ship at 10× speed. AI is integrated across my entire workflow: code
          generation, review, testing and automation — so clients get results in days, not weeks.
        </p>
      </motion.div>
    </section>
  )
}
