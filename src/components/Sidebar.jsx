import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { categories, categoryMarks, demos } from '../demos/registry.js'

export default function Sidebar() {
  const { pathname } = useLocation()
  // On small screens the lesson list folds behind a toggle. Remembering
  // *which page* it was opened on (rather than a plain boolean) means it
  // closes itself as soon as you pick a lesson — no effect needed.
  const [openOn, setOpenOn] = useState(null)
  const isOpen = openOn === pathname

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <Link to="/" className="brand">
          React Playground
        </Link>
        <button
          type="button"
          className="sidebar-toggle"
          aria-expanded={isOpen}
          aria-controls="lesson-nav"
          onClick={() => setOpenOn(isOpen ? null : pathname)}
        >
          {isOpen ? 'Hide lessons' : 'Lessons'}
        </button>
      </div>

      <nav id="lesson-nav" className={'lesson-nav' + (isOpen ? ' is-open' : '')} aria-label="Lessons">
        {categories.map((category) => (
          <section
            className="lesson-group"
            key={category}
            style={{ '--mark': categoryMarks[category] }}
          >
            <h2 className="lesson-group-name">
              <span className="marker">{category}</span>
            </h2>
            <ol className="lesson-list">
              {demos
                .filter((demo) => demo.category === category)
                .map((demo) => (
                  <li key={demo.slug}>
                    <NavLink to={`/demo/${demo.slug}`} className="lesson-link">
                      {/* Numbered across the whole course, not per group —
                          the registry is in reading order, start to finish. */}
                      <span className="lesson-num">{demos.indexOf(demo) + 1}</span>
                      <span className="lesson-name">{demo.title}</span>
                    </NavLink>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </nav>
    </aside>
  )
}
