import { Navigate, useParams } from 'react-router-dom'
import { Sandpack } from '@codesandbox/sandpack-react'
import { categoryColors, categorySoftColors, demosBySlug } from '../demos/registry.js'

// Frames the preview pane so demo content reads as a centered card instead
// of floating in a blank corner, and gives plain <button>/<input>/<select>
// elements a real look — demo source stays minimal (just semantic HTML),
// this stylesheet is what makes it look designed. Applied under each demo's
// own files, so a demo can still override it with its own /styles.css.
// The accent color is per-category, so each topic feels visually distinct.
function previewStyles(accentColor, ringColor) {
  return `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 32px 24px;
  background: #f5f3fb;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  color: #1a1d23;
  box-sizing: border-box;
}
#root {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border: 1px solid #e6e3f0;
  border-top: 4px solid ${accentColor};
  border-radius: 12px;
  padding: 24px;
  box-sizing: border-box;
}

h1, h2, h3 { margin-top: 0; line-height: 1.3; }
p { line-height: 1.6; }
label { font-size: 14px; }

button {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd9ea;
  background: #fbfaff;
  color: #1a1d23;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(20, 10, 50, 0.05);
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease;
}
button:hover { border-color: ${accentColor}; background: #ffffff; }
button:active { transform: translateY(1px); box-shadow: none; }
button:focus-visible { outline: none; box-shadow: 0 0 0 3px ${ringColor}; }
button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

input, select, textarea {
  font: inherit;
  font-size: 14px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #ddd9ea;
  background: #ffffff;
  color: #1a1d23;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: ${accentColor};
  box-shadow: 0 0 0 3px ${ringColor};
}
input[type="checkbox"], input[type="radio"] {
  width: 15px;
  height: 15px;
  accent-color: ${accentColor};
}

ul, ol { padding-left: 22px; line-height: 1.7; }
li { margin: 4px 0; }
hr { border: none; border-top: 1px solid #e6e3f0; }

fieldset {
  border: 1px solid #e6e3f0;
  border-radius: 10px;
  padding: 14px;
}
legend {
  padding: 0 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

pre, code { font-family: "Cascadia Code", Consolas, monospace; font-size: 13px; }
pre { background: #f5f3fb; padding: 12px; border-radius: 8px; overflow-x: auto; }
`
}

export default function DemoPage() {
  const { slug } = useParams()
  const demo = demosBySlug[slug]

  if (!demo) {
    return <Navigate to="/" replace />
  }

  const accentColor = categoryColors[demo.category]
  const softColor = categorySoftColors[demo.category]

  return (
    <div>
      <span className="category-badge" style={{ background: softColor, color: accentColor }}>
        {demo.category}
      </span>
      <h1 className="page-title">{demo.title}</h1>
      <p className="page-description">{demo.description}</p>

      <div className="demo-sandpack-wrapper">
        <Sandpack
          key={demo.slug}
          template="react"
          theme={{
            colors: { accent: accentColor },
          }}
          files={{ '/styles.css': previewStyles(accentColor, softColor), ...demo.files }}
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
    </div>
  )
}
