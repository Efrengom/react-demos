export default {
  slug: 'error-boundary',
  title: 'Error Boundaries',
  category: 'Patterns',
  description:
    'An error boundary catches JavaScript errors thrown while rendering part of the tree and shows ' +
    "fallback UI instead of crashing the whole app. They still have to be class components — there's no " +
    'hook equivalent (yet) — so most apps write one once and reuse it everywhere.',
  files: {
    '/ErrorBoundary.js': `import { Component } from "react";

// Error boundaries MUST be class components — getDerivedStateFromError and
// componentDidCatch have no hook equivalents in React yet.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Runs during rendering, right after a descendant throws — updates
    // state so the NEXT render shows the fallback instead of crashing.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // A good place to log the error to a reporting service.
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ border: "1px solid #dc2626", borderRadius: 8, padding: 16 }}>
          <p>Something went wrong in this part of the page.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    // this.props.children is whatever ErrorBoundary was wrapped around —
    // rendered as-is when nothing has gone wrong.
    return this.props.children;
  }
}
`,
    '/BuggyCounter.js': `import { useState } from "react";

// Throws once count reaches 5 — simulating a bug that only shows up under
// specific state, which is exactly the case error boundaries exist for.
export default function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error("I crashed at 5!");
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p style={{ color: "#666" }}>This throws on purpose at 5.</p>
    </div>
  );
}
`,
    '/App.js': `import ErrorBoundary from "./ErrorBoundary";
import BuggyCounter from "./BuggyCounter";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h2>Click to 5 and watch it crash</h2>
      {/* Only what's INSIDE the boundary is protected — an error boundary
          never catches errors thrown by itself or by its own siblings. */}
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}
`,
  },
}
