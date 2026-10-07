export default {
  slug: 'lists-keys',
  title: 'Lists & Keys',
  category: 'Fundamentals',
  description:
    'Keys tell React which array item is which across re-renders, so it can match state to the right ' +
    'element instead of the right position. Type into a few boxes below, then hit Shuffle — the "index key" ' +
    'list scrambles your text, the "stable id" list doesn\'t.',
  files: {
    '/App.js': `import { useState } from "react";
import List from "./List";

const initialItems = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* Side by side so the "same data, different key" comparison is direct
          — but below 420px the columns get too narrow for a usable input,
          so this media query drops back to one column per row instead. */}
      <style>{\`
        .lists-keys-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; margin-top: 18px; }
        @media (max-width: 420px) {
          .lists-keys-grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
        }
      \`}</style>

      <p style={{ marginTop: 0 }}>Type something into a few boxes below, then shuffle.</p>
      <button onClick={() => setItems(shuffle(items))}>Shuffle order</button>

      <div className="lists-keys-grid">
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: "0 0 10px", color: "#b91c1c", fontSize: 14 }}>❌ key = index</h3>
          <List items={items} useIndexAsKey />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: "0 0 10px", color: "#059669", fontSize: 14 }}>✅ key = item.id</h3>
          <List items={items} />
        </div>
      </div>
    </div>
  );
}
`,
    '/List.js': `export default function List({ items, useIndexAsKey }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, index) => (
        // The bug: an index key describes a POSITION ("the 1st item"), not
        // an identity. When the array reorders, React sees "position 0 is
        // still position 0" and reuses that DOM node as-is — including
        // whatever you'd typed into its input — even though a different
        // fruit now lives there.
        <li key={useIndexAsKey ? index : item.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 52, flexShrink: 0, fontSize: 13, color: "#555" }}>{item.name}</span>
          <input defaultValue="" placeholder="type here" style={{ flex: 1, minWidth: 0 }} />
        </li>
      ))}
    </ul>
  );
}
`,
  },
}
