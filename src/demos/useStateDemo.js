export default {
  slug: 'usestate',
  title: 'useState',
  category: 'Hooks',
  description:
    'useState gives a component memory that survives between renders. Calling the setter ' +
    'schedules a re-render with the new value. Try switching the increment button to use the ' +
    'functional update form `setCount(c => c + 1)`.',
  files: {
    '/App.js': `import { useState } from "react";

export default function App() {
  // useState(0) returns a pair: the current value, and a setter for it.
  // "count" starts at 0 and React remembers it across re-renders — a plain
  // variable would reset to 0 every time this component function re-runs.
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* Reading "count" here means this text re-renders whenever it changes. */}
      <h2>Count: {count}</h2>

      {/* Calling setCount schedules a re-render with the new value — it
          does NOT mutate count in place, and the update isn't instant. */}
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
        +1
      </button>

      {/* Setting to a fixed value works the same way as any other update. */}
      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}
`,
  },
}
