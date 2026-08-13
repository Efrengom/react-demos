export default {
  slug: 'custom-hook',
  title: 'Custom Hooks',
  category: 'Hooks',
  description:
    'A custom hook is just a function whose name starts with "use" that calls other hooks inside it. ' +
    'It lets you extract and reuse stateful logic between components. Here, `useLocalStorage` wraps ' +
    'useState + useEffect so the value persists across page reloads.',
  files: {
    '/useLocalStorage.js': `import { useEffect, useState } from "react";

// The "use" prefix isn't just convention — it's how React knows this
// function is allowed to call other hooks inside it, and how linters
// enforce the rules of hooks on it just like a component.
export function useLocalStorage(key, initialValue) {
  // Passing a FUNCTION to useState (instead of a value) makes it lazy:
  // this reads localStorage only once, on the first render, not on every
  // re-render like useState(window.localStorage.getItem(key)) would.
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  // Whenever "value" changes, mirror it into localStorage. This is the
  // side effect that a plain useState alone couldn't give you.
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Returning [value, setValue] mimics useState's own API, so any
  // component can swap useState(...) for useLocalStorage(...) directly.
  return [value, setValue];
}
`,
    '/App.js': `import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  // From App's point of view this reads exactly like useState — the
  // persistence logic is completely hidden inside the hook.
  const [name, setName] = useLocalStorage("demo-name", "");

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <label>
        Your name:{" "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p>Reload the preview — the value survives because it's in localStorage.</p>
      {name && <h3>Hi, {name}!</h3>}
    </div>
  );
}
`,
  },
}
