// Lesson descriptions are plain strings, but they're full of code: `backtick`
// spans, component names like <Greeting>, hook/API names like useState, and
// property paths like event.target.value. This picks those out and sets them
// as <code> so a learner can tell at a glance which words are things you'd
// type and which are just English.
const CODE_PATTERN =
  /(`[^`]+`|<[A-Z][A-Za-z]*>|\b(?:use[A-Z]\w*|React\.\w+|createPortal|Suspense|[a-z]+(?:\.[a-z]+){2,})\b)/g

export default function Prose({ text }) {
  return text.split(CODE_PATTERN).map((part, i) => {
    // split() with a capture group puts the matches at the odd indexes.
    if (i % 2 === 0) return part
    const code = part.startsWith('`') ? part.slice(1, -1) : part
    return <code key={i}>{code}</code>
  })
}
