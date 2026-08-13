import { NavLink } from 'react-router-dom'
import { categories, categoryColors, categorySoftColors, demos } from '../demos/registry.js'

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <p className="sidebar-title">React Playground</p>
      <p className="sidebar-subtitle">Interactive demos</p>

      <NavLink
        to="/"
        end
        className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
      >
        Home
      </NavLink>

      {categories.map((category) => {
        const color = categoryColors[category]
        const softColor = categorySoftColors[category]

        return (
          <div className="sidebar-group" key={category}>
            <p className="sidebar-group-label">
              <span className="sidebar-group-dot" style={{ background: color }} />
              {category}
            </p>
            {demos
              .filter((demo) => demo.category === category)
              .map((demo) => (
                <NavLink
                  key={demo.slug}
                  to={`/demo/${demo.slug}`}
                  className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
                  style={({ isActive }) =>
                    isActive
                      ? { background: softColor, color, borderLeftColor: color }
                      : undefined
                  }
                >
                  {demo.title}
                </NavLink>
              ))}
          </div>
        )
      })}
    </nav>
  )
}
