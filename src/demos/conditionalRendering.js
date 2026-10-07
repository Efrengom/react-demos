export default {
  slug: 'conditional-rendering',
  title: 'Conditional Rendering',
  category: 'Fundamentals',
  description:
    "React has no special template syntax for conditionals — it's just JavaScript. This demo shows the " +
    'three common patterns: a ternary for either/or output, `&&` for show-or-nothing, and an early return.',
  files: {
    '/App.js': `import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <button onClick={() => setLoggedIn((v) => !v)}>
          {loggedIn ? "Log out" : "Log in"}
        </button>
        {/* Ternary: always renders ONE of the two branches. */}
        <h2 style={{ margin: "12px 0 0" }}>{loggedIn ? "Welcome back!" : "Please log in"}</h2>
      </div>

      <div style={{ background: "#f6f5fb", borderRadius: 10, padding: 14 }}>
        {/* && short-circuit: renders the right side only if everything to its
            left is truthy, otherwise renders nothing at all.
            Note the "notifications > 0" check rather than just "notifications" —
            with plain {notifications && ...}, a count of 0 would evaluate to
            0, and React would render the literal text "0" onto the page. */}
        {loggedIn && notifications > 0 && (
          <p style={{ margin: "0 0 10px" }}>You have {notifications} new notifications.</p>
        )}
        <button onClick={() => setNotifications((n) => n + 1)}>
          Add notification
        </button>
      </div>

      <StatusPanel loggedIn={loggedIn} />
    </div>
  );
}

// An early return skips rendering the rest of the component entirely —
// handy when one condition means there's nothing else worth showing.
function StatusPanel({ loggedIn }) {
  if (!loggedIn) {
    return (
      <div style={{ border: "1px dashed #d8d5e6", borderRadius: 10, padding: 14, color: "#999" }}>
        Nothing to show while logged out.
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #e6e3f0", borderRadius: 10, padding: 14 }}>
      <h3 style={{ margin: "0 0 6px" }}>Account status</h3>
      <p style={{ margin: 0 }}>Everything looks good.</p>
    </div>
  );
}
`,
  },
}
