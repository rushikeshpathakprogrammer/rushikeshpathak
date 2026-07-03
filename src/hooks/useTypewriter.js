import { useEffect, useState } from 'react'

export default function useTypewriter(words, { typeMs = 68, deleteMs = 34, holdMs = 1800, gapMs = 350 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let delay = deleting ? deleteMs : typeMs

    if (!deleting && text === word) delay = holdMs
    else if (deleting && text === '') delay = gapMs

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs, gapMs])

  return text
}
