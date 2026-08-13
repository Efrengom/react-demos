export default {
  slug: 'context',
  title: 'useContext',
  category: 'Hooks',
  description:
    'Context lets a value skip through the component tree without being passed as a prop at every level ' +
    '("prop drilling"). A Provider makes a value available, and any descendant can read it with useContext. ' +
    'Notice <Toolbar> never touches the theme prop directly — only <ThemedButton> does.',
  files: {
    '/ThemeContext.js': `import { createContext } from "react";

// createContext returns an object components can Provide a value into, or
// read from, without it being passed down as a prop at every level.
// The default value ("light") is only used if a component reads this
// context without a matching Provider anywhere above it in the tree.
export const ThemeContext = createContext("light");
`,
    '/App.js': `import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Toolbar from "./Toolbar";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    // Everything inside <ThemeContext.Provider> can read "theme" via
    // useContext — no matter how deeply it's nested. Changing "value" here
    // re-renders every descendant that reads this context.
    <ThemeContext.Provider value={theme}>
      <div style={{ fontFamily: "sans-serif", padding: 16 }}>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          Toggle theme (currently {theme})
        </button>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}
`,
    '/Toolbar.js': `import ThemedButton from "./ThemedButton";

// Toolbar has no idea a theme exists — it just renders its children.
// Without context, "theme" would have to be passed down as a prop here too,
// even though Toolbar itself never uses it. That's "prop drilling".
export default function Toolbar() {
  return (
    <div style={{ marginTop: 16 }}>
      <ThemedButton label="Save" />
      <ThemedButton label="Cancel" />
    </div>
  );
}
`,
    '/ThemedButton.js': `import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemedButton({ label }) {
  // useContext reaches up the tree to the nearest ThemeContext.Provider
  // and returns its current "value" — this is the payoff for skipping
  // Toolbar entirely instead of threading a theme prop through it.
  const theme = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      style={{
        marginRight: 8,
        padding: "6px 14px",
        background: isDark ? "#1a1d23" : "#f6f7f9",
        color: isDark ? "#fff" : "#1a1d23",
        border: "1px solid #ccc",
        borderRadius: 6,
      }}
    >
      {label}
    </button>
  );
}
`,
  },
}
