export default {
  slug: 'useref',
  title: 'useRef',
  category: 'Hooks',
  description:
    'useRef gives you a mutable box (`.current`) that survives re-renders WITHOUT causing one when you ' +
    "change it — unlike state. It has two common uses: holding a reference to a DOM node, and stashing a " +
    "value between renders that shouldn't itself trigger a re-render.",
  files: {
    '/App.js': `import { useEffect, useRef, useState } from "react";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <FocusExample />
      <hr style={{ margin: "20px 0" }} />
      <PreviousValueExample />
    </div>
  );
}

function FocusExample() {
  // inputRef.current starts as null. React fills it in with the real DOM
  // node once this component mounts — that's what lets us call .focus()
  // on it directly, something plain JSX by itself can't do.
  const inputRef = useRef(null);

  return (
    <div>
      <h3>1. Reaching into the DOM</h3>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={() => inputRef.current.focus()} style={{ marginLeft: 8 }}>
        Focus the input
      </button>
    </div>
  );
}

function PreviousValueExample() {
  const [count, setCount] = useState(0);
  const previousCount = useRef();
  // A second ref, just to prove a point: mutating renderCount.current below
  // never schedules a re-render the way calling setCount does — only state
  // updates do that. This number climbing is purely a side effect of React
  // re-running this function, not a cause of it.
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    // Effects run AFTER render, so by the time this executes, "count" is
    // already the new value on screen — this is the last moment to grab
    // the value that's about to become "old".
    previousCount.current = count;
  }, [count]);

  return (
    <div>
      <h3>2. Remembering a value across renders</h3>
      <p>
        Now: {count}, Before: {previousCount.current ?? "(none yet)"}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p style={{ color: "#666" }}>
        Rendered {renderCount.current} time(s) — watch this number only grow
        when a state update actually happens, never on its own.
      </p>
    </div>
  );
}
`,
  },
}
