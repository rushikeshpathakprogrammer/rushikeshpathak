const ITEMS = [
  'MongoDB', 'React', 'Express', 'Node.js', 'Python', 'Flask', 'C#', 'JavaScript',
  'AI Integration', 'Vibe Coding', 'Full Stack', 'Founder × 2',
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((t, i) => <span key={i}>{t} ✦</span>)}
      </div>
    </div>
  )
}
