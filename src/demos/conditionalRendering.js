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
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <button onClick={() => setLoggedIn((v) => !v)}>
        {loggedIn ? "Log out" : "Log in"}
      </button>

      {/* Ternary: always renders ONE of the two branches. */}
      <h2>{loggedIn ? "Welcome back!" : "Please log in"}</h2>

      {/* && short-circuit: renders the right side only if everything to its
          left is truthy, otherwise renders nothing at all.
          Note the "notifications > 0" check rather than just "notifications" —
          with plain {notifications && ...}, a count of 0 would evaluate to
          0, and React would render the literal text "0" onto the page. */}
      {loggedIn && notifications > 0 && (
        <p>You have {notifications} new notifications.</p>
      )}

      <button onClick={() => setNotifications((n) => n + 1)} style={{ marginTop: 8 }}>
        Add notification
      </button>

      <hr style={{ margin: "16px 0" }} />

      <StatusPanel loggedIn={loggedIn} />
    </div>
  );
}

// An early return skips rendering the rest of the component entirely —
// handy when one condition means there's nothing else worth showing.
function StatusPanel({ loggedIn }) {
  if (!loggedIn) {
    return <p style={{ color: "#999" }}>Nothing to show while logged out.</p>;
  }

  return (
    <div>
      <h3>Account status</h3>
      <p>Everything looks good.</p>
    </div>
  );
}
`,
  },
}
