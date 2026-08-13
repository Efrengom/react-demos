export default {
  slug: 'data-fetching',
  title: 'Fetching Data',
  category: 'Hooks',
  description:
    'The classic useEffect pattern for data fetching: track loading/error/data state, and use a cleanup ' +
    'flag to ignore responses that arrive after the component no longer cares about them — like when the ' +
    'user picks a different item before the first request finishes.',
  files: {
    '/App.js': `import { useEffect, useState } from "react";

// Stands in for a real fetch() call — resolves after a delay so the
// loading state is actually visible, just like a real network request.
function fetchUser(id) {
  const users = {
    1: { name: "Ada Lovelace", job: "Mathematician" },
    2: { name: "Grace Hopper", job: "Computer Scientist" },
    3: { name: "Alan Turing", job: "Cryptographer" },
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(users[id]), 800);
  });
}

export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false; // flips true if this effect gets cleaned up early

    setLoading(true);
    setUser(null);

    fetchUser(userId).then((data) => {
      // If the user switched selections before this resolved, "ignore" is
      // already true and we skip applying the stale response — otherwise a
      // slow, outdated request could overwrite a newer one that finished first.
      if (!ignore) {
        setUser(data);
        setLoading(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <label>
        Choose a user:{" "}
        <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>

      <div style={{ marginTop: 12 }}>
        {loading && <p>Loading…</p>}
        {!loading && user && (
          <div>
            <h3>{user.name}</h3>
            <p>{user.job}</p>
          </div>
        )}
      </div>

      <p style={{ color: "#666", marginTop: 12 }}>
        Try switching quickly between users while one is still loading — the
        UI never gets stuck showing the wrong person.
      </p>
    </div>
  );
}
`,
  },
}
