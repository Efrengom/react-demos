import { useSyncExternalStore } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react'
import { categoryColors, categoryMarks, demos, demosBySlug } from '../demos/registry.js'
import Prose from './Prose.jsx'

// The site's CSS switches themes on its own via prefers-color-scheme, but
// Sandpack takes its theme as a JS object, so the editor has to be told.
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

function subscribeToColorScheme(onChange) {
  darkQuery.addEventListener('change', onChange)
  return () => darkQuery.removeEventListener('change', onChange)
}

function usePrefersDark() {
  return useSyncExternalStore(subscribeToColorScheme, () => darkQuery.matches)
}

// Same values as the color tokens in index.css, for each theme.
const EDITOR_COLORS = {
  light: {
    surface1: '#ffffff',
    surface2: '#d8dce4',
    surface3: '#f0f2f5',
    clickable: '#596175',
    base: '#1a2238',
    disabled: '#a3a9b7',
    hover: '#1a2238',
    error: '#b42318',
    errorSurface: '#fdecea',
  },
  dark: {
    surface1: '#151b2b',
    surface2: '#2c3550',
    surface3: '#1b2335',
    clickable: '#9ba3b6',
    base: '#e4e8f1',
    disabled: '#5b6479',
    hover: '#ffffff',
    error: '#ff8a80',
    errorSurface: '#3a1d24',
  },
}

const EDITOR_SYNTAX = {
  light: {
    plain: '#1a2238',
    comment: { color: '#6b7389', fontStyle: 'italic' },
    keyword: '#9b2c6f',
    definition: '#4a3aa8',
    punctuation: '#596175',
    property: '#8a5a00',
    tag: '#1d5faf',
    static: '#a33b2b',
    string: '#1f6e4c',
  },
  dark: {
    plain: '#e4e8f1',
    comment: { color: '#8b93a8', fontStyle: 'italic' },
    keyword: '#f28cc4',
    definition: '#b3a6ff',
    punctuation: '#9ba3b6',
    property: '#f0c46a',
    tag: '#7fb8ff',
    static: '#ff9b85',
    string: '#7fd9a8',
  },
}

// Matches the editor to the rest of the site: same ink and paper, and the
// lesson's category color as the accent (the deep shade on light, the
// highlighter itself on dark). Comments get Victor Mono's cursive italic —
// the demos teach through their comments, so they should read like notes in
// the margin rather than fade into grey.
function editorTheme(scheme, accentColor) {
  return {
    colors: { ...EDITOR_COLORS[scheme], accent: accentColor },
    syntax: EDITOR_SYNTAX[scheme],
    font: {
      body: '"Atkinson Hyperlegible Next", system-ui, sans-serif',
      mono: '"Victor Mono", "Cascadia Code", Consolas, monospace',
      size: '14px',
      lineHeight: '22px',
    },
  }
}

// Frames the preview pane so demo content reads as a centered card instead
// of floating in a blank corner, and gives plain <button>/<input>/<select>
// elements a real look — demo source stays minimal (just semantic HTML),
// this stylesheet is what makes it look designed. Applied under each demo's
// own files, so a demo can still override it with its own /styles.css.
// Focus rings use the lesson's highlighter color, and checkboxes its ink.
function previewStyles(accentColor, ringColor) {
  return `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  /* Without this, flex's default "stretch" forces #root to fill the whole
     iframe height, no matter how little content a demo has — the cause of
     the big empty void under shorter demos. */
  align-items: flex-start;
  padding: 32px 24px;
  background: #f0f2f5;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  color: #1a2238;
  box-sizing: border-box;
}
#root {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border: 1px solid #d8dce4;
  border-radius: 10px;
  padding: 24px;
  box-sizing: border-box;
}

h1, h2, h3 { margin-top: 0; line-height: 1.25; }
p { line-height: 1.6; }
label { font-size: 14px; }

button {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #c4c9d4;
  background: #ffffff;
  color: #1a2238;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}
button:hover { border-color: ${accentColor}; background: #f7f8fa; }
button:active { background: #f0f2f5; }
button:focus-visible { outline: 2px solid #1a2238; outline-offset: 2px; box-shadow: 0 0 0 6px ${ringColor}; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

input, select, textarea {
  font: inherit;
  font-size: 14px;
  padding: 7px 10px;
  border-radius: 6px;
  border: 1px solid #c4c9d4;
  background: #ffffff;
  color: #1a2238;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #1a2238;
  box-shadow: 0 0 0 3px ${ringColor};
}
input[type="checkbox"], input[type="radio"] {
  width: 15px;
  height: 15px;
  accent-color: ${accentColor};
}

ul, ol { padding-left: 22px; line-height: 1.7; }
li { margin: 4px 0; }
hr { border: none; border-top: 1px solid #d8dce4; }

fieldset {
  border: 1px solid #d8dce4;
  border-radius: 8px;
  padding: 14px;
}
legend {
  padding: 0 6px;
  font-size: 14px;
  font-weight: 700;
  color: #596175;
}

pre, code { font-family: "Cascadia Code", Consolas, monospace; font-size: 13px; }
pre { background: #f0f2f5; padding: 12px; border-radius: 6px; overflow-x: auto; }

/* On a phone the preview is only ~350px wide, and this frame's padding
   stacks with each demo's own, so give the content most of the room back. */
@media (max-width: 480px) {
  body { padding: 16px 12px; }
  #root { padding: 16px; }
}
`
}

export default function DemoPage() {
  const { slug } = useParams()
  const prefersDark = usePrefersDark()
  const demo = demosBySlug[slug]

  if (!demo) {
    return <Navigate to="/" replace />
  }

  const accentColor = categoryColors[demo.category]
  const markColor = categoryMarks[demo.category]
  const index = demos.indexOf(demo)
  const previous = demos[index - 1]
  const next = demos[index + 1]

  return (
    <article className="lesson" style={{ '--mark': markColor }}>
      <header className="lesson-head">
        <p className="lesson-meta">
          <span className="marker">{demo.category}</span>
          <span>
            Lesson {index + 1} of {demos.length}
          </span>
        </p>
        <h1 className="lesson-title">{demo.title}</h1>
        <p className="lesson-desc">
          <Prose text={demo.description} />
        </p>
      </header>

      <div className="sandpack-frame">
        <Sandpack
          key={demo.slug}
          template="react"
          theme={prefersDark ? editorTheme('dark', markColor) : editorTheme('light', accentColor)}
          files={{ '/styles.css': previewStyles(accentColor, markColor), ...demo.files }}
          options={{
            showLineNumbers: true,
            showInlineErrors: true,
            editorHeight: 560,
            editorWidthPercentage: 50,
            activeFile: Object.keys(demo.files)[0],
            visibleFiles: Object.keys(demo.files),
          }}
        />
      </div>

      {/* Each link highlights in its *destination's* category color, which
          differs from this page's at a category boundary (lesson 6 to 7). */}
      <nav className="lesson-pager" aria-label="Other lessons">
        {previous && (
          <Link
            to={`/demo/${previous.slug}`}
            className="pager-link pager-previous"
            style={{ '--mark': categoryMarks[previous.category] }}
          >
            <span className="pager-dir">Previous lesson</span>
            <span className="pager-title">{previous.title}</span>
          </Link>
        )}
        {next && (
          <Link
            to={`/demo/${next.slug}`}
            className="pager-link pager-next"
            style={{ '--mark': categoryMarks[next.category] }}
          >
            <span className="pager-dir">Next lesson</span>
            <span className="pager-title">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
