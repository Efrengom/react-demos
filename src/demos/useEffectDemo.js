export default {
  slug: 'useeffect',
  title: 'useEffect',
  category: 'Hooks',
  description:
    'useEffect runs side effects (timers, subscriptions, syncing with the outside world) after render. ' +
    'The dependency array controls when it re-runs, and the function it returns is a cleanup that runs ' +
    'before the next effect and on unmount. This demo starts an interval and stops it on cleanup.',
  files: {
    '/App.js': `import { useEffect, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  // This effect's job: keep an interval running while "running" is true.
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      // Functional update: reads the latest "s" instead of closing over
      // a possibly-stale "seconds" from when this effect was created.
      setSeconds((s) => s + 1);
    }, 1000);

    // Cleanup: React calls this before the effect runs again, and once
    // more when the component unmounts. Without it, every time "running"
    // changes you'd leak another interval running in the background.
    return () => clearInterval(id);
  }, [running]); // Re-run only when "running" changes — not on every tick.

  // A second, independent effect. Splitting by concern (timer vs. document
  // title) keeps each effect's dependency array small and easy to reason about.
  useEffect(() => {
    document.title = \`\${seconds}s\`;
  }, [seconds]); // Re-run whenever "seconds" changes.

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h2>Stopwatch: {seconds}s</h2>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Resume"}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
      <p style={{ color: "#666" }}>Check the browser tab title too.</p>
    </div>
  );
}
`,
  },
}
