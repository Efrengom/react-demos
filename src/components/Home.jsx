import { Link } from 'react-router-dom'
import { categories, categoryColors, demos } from '../demos/registry.js'

export default function Home() {
  return (
    <div>
      <div className="home-hero">
        <h1 className="home-hero-title">Learn React by doing</h1>
        <p className="home-intro">
          Pick a topic on the left. Every demo shows editable code on one side and a live,
          running preview on the other — change the code and the output updates immediately.
        </p>
      </div>

      {categories.map((category) => {
        const color = categoryColors[category]

        return (
          <div key={category}>
            <p className="home-category">
              <span className="home-category-dot" style={{ background: color }} />
              {category}
            </p>
            <div className="home-grid">
              {demos
                .filter((demo) => demo.category === category)
                .map((demo) => (
                  <Link
                    key={demo.slug}
                    to={`/demo/${demo.slug}`}
                    className="home-card"
                    style={{ '--cat-color': color }}
                  >
                    <p className="home-card-title">{demo.title}</p>
                    {/* Split on ". " (period + space), not just ".", so names like
                        "React.memo" or "React.lazy" don't get cut off mid-word. */}
                    <p className="home-card-desc">{demo.description.split('. ')[0]}.</p>
                  </Link>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
