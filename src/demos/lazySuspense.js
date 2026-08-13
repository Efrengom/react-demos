export default {
  slug: 'lazy-suspense',
  title: 'React.lazy + Suspense',
  category: 'Patterns',
  description:
    "React.lazy lets you load a component's code only when it's actually needed, instead of bundling " +
    'everything up front. Suspense shows fallback UI while that code loads. We add an artificial delay here ' +
    'so the loading state is visible — in a real app that delay is just normal network latency.',
  files: {
    '/Panel.js': `export default function Panel() {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
      <h3>Loaded!</h3>
      <p>This component's code was fetched separately, on demand.</p>
    </div>
  );
}
`,
    '/App.js': `import { lazy, Suspense, useState } from "react";

// The import() only runs once Panel is actually rendered — its code is
// split out of the main bundle instead of loading up front. Wrapping it in
// a setTimeout just adds an artificial delay so the loading fallback is
// actually visible here (a real network fetch would cause the same pause).
const Panel = lazy(
  () => new Promise((resolve) => setTimeout(() => resolve(import("./Panel")), 1500))
);

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide panel" : "Show panel"}
      </button>

      <div style={{ marginTop: 12 }}>
        {show && (
          // Suspense catches the "still loading" state of any lazy
          // component beneath it and shows fallback until it resolves.
          <Suspense fallback={<p>Loading panel…</p>}>
            <Panel />
          </Suspense>
        )}
      </div>
    </div>
  );
}
`,
  },
}
