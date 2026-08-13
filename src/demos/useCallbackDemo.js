export default {
  slug: 'usecallback',
  title: 'useCallback + React.memo',
  category: 'Hooks',
  description:
    "React.memo skips re-rendering a component if its props haven't changed. But a plain function is a " +
    "NEW value every render, so memo can't tell it apart from a real change — useCallback keeps that " +
    "function's identity stable so memo actually works.",
  files: {
    '/Child.js': `import { memo, useRef } from "react";

// React.memo skips re-rendering Child if none of its props changed
// (compared with a shallow === check) since the last render.
const Child = memo(function Child({ count, onIncrement }) {
  const renders = useRef(0);
  renders.current++;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
      }}
    >
      <p>Count (from parent): {count}</p>
      <p style={{ color: "#666" }}>Child has rendered {renders.current} time(s).</p>
      <button onClick={onIncrement}>Increment from child</button>
    </div>
  );
});

export default Child;
`,
    '/App.js': `import { useCallback, useRef, useState } from "react";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const parentRenders = useRef(0);
  parentRenders.current++;

  // useCallback keeps this exact function reference stable across renders,
  // as long as its dependency array ([]) doesn't change. Without it, App
  // would hand Child a brand-new function every render, and React.memo's
  // prop comparison would always see "something changed."
  const handleIncrement = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <p style={{ color: "#666" }}>Parent has rendered {parentRenders.current} time(s).</p>

      <label>
        Type here (re-renders Parent, but has nothing to do with count):{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      <p style={{ marginTop: 8 }}>
        Watch the two render counts: typing above climbs Parent's, but not
        Child's — thanks to useCallback + React.memo, Child skips
        re-rendering for changes it doesn't care about. Clicking "Increment"
        still re-renders both, because count is a prop Child actually uses.
      </p>

      <Child count={count} onIncrement={handleIncrement} />
    </div>
  );
}
`,
  },
}
