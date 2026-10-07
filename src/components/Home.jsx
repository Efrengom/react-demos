import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, categoryMarks, demos } from '../demos/registry.js'
import Prose from './Prose.jsx'

// Split on ". " (period + space), not just ".", so names like "React.memo"
// or "React.lazy" don't get cut off mid-word. A one-sentence description
// already ends in its own period, so only add one when the split removed it.
function firstSentence(text) {
  const sentence = text.split('. ')[0]
  return sentence.endsWith('.') ? sentence : `${sentence}.`
}

// The headline below is genuinely rendered by this component — the code
// printed above it on the page is this function, minus the className.
function Lesson({ topic }) {
  return <h1 className="hero-title">Learn {topic} by changing it.</h1>
}

export default function Home() {
  const [topic, setTopic] = useState('React')
  // Counts edits so each one can remount the render flash (via `key`) and
  // replay its animation, like React DevTools' "highlight updates" outline.
  const [renders, setRenders] = useState(0)

  const first = demos[0]
  const last = demos[demos.length - 1]

  function handleTopicChange(event) {
    setTopic(event.target.value)
    setRenders((n) => n + 1)
  }

  return (
    <div className="home">
      <section className="hero">
        <pre className="hero-code">
          <code>
            <span className="code-line">
              <span className="tok-keyword">function</span> <span className="tok-def">Lesson</span>
              <span className="tok-punct">({'{ '}</span>topic<span className="tok-punct">{' }) {'}</span>
            </span>
            <span className="code-line">
              {'  '}<span className="tok-keyword">return</span> <span className="tok-tag">&lt;h1&gt;</span>Learn{' '}
              <span className="tok-punct">{'{'}</span>topic<span className="tok-punct">{'}'}</span> by changing it.
              <span className="tok-tag">&lt;/h1&gt;</span>
            </span>
            <span className="code-line">
              <span className="tok-punct">{'}'}</span>
            </span>
            <span className="code-line" aria-hidden="true">{' '}</span>
            <span className="code-line">
              <span className="tok-comment">{'// Edit the topic and watch <Lesson> re-render.'}</span>
            </span>
            <span className="code-line">
              root.<span className="tok-def">render</span>(<span className="tok-tag">&lt;Lesson</span>{' '}
              <span className="tok-prop">topic</span>=<span className="tok-string">"</span>
              <input
                className="hero-prop-input"
                value={topic}
                onChange={handleTopicChange}
                maxLength={28}
                spellCheck={false}
                autoComplete="off"
                aria-label="Value of the topic prop"
                style={{ width: `${Math.max(topic.length, 1) + 0.25}ch` }}
              />
              <span className="tok-string">"</span> <span className="tok-tag">/&gt;</span>);
            </span>
          </code>
        </pre>

        <div className="hero-output">
          <Lesson topic={topic} />
          {renders > 0 && (
            <span key={renders} className="render-flash" aria-hidden="true">
              <span className="render-flash-tag">&lt;Lesson /&gt; rendered</span>
            </span>
          )}
        </div>

        <p className="hero-intro">
          {demos.length} lessons, from {first.title} to {last.title}. Each one puts code you can
          edit next to a running preview, so you can change a line and see what React does with it.
        </p>
        <Link to={`/demo/${first.slug}`} className="start-link">
          Start lesson 1: {first.title}
        </Link>
      </section>

      <section className="syllabus" aria-label="All lessons">
        {categories.map((category) => (
          <div
            className="syllabus-group"
            key={category}
            style={{ '--mark': categoryMarks[category] }}
          >
            <h2 className="syllabus-group-name">
              <span className="marker">{category}</span>
            </h2>
            <ol className="syllabus-list">
              {demos
                .filter((demo) => demo.category === category)
                .map((demo) => (
                  <li key={demo.slug}>
                    <Link to={`/demo/${demo.slug}`} className="syllabus-link">
                      <span className="lesson-num">{demos.indexOf(demo) + 1}</span>
                      <span className="syllabus-text">
                        <span className="lesson-name">{demo.title}</span>
                        <span className="syllabus-desc">
                          <Prose text={firstSentence(demo.description)} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  )
}
