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
      <p>Type something into a few boxes below, then shuffle.</p>
      <button onClick={() => setItems(shuffle(items))}>Shuffle order</button>

      <h3>❌ key = index</h3>
      <List items={items} useIndexAsKey />

      <h3>✅ key = item.id</h3>
      <List items={items} />
    </div>
  );
}
`,
    '/List.js': `export default function List({ items, useIndexAsKey }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        // The bug: an index key describes a POSITION ("the 1st item"), not
        // an identity. When the array reorders, React sees "position 0 is
        // still position 0" and reuses that DOM node as-is — including
        // whatever you'd typed into its input — even though a different
        // fruit now lives there.
        <li key={useIndexAsKey ? index : item.id} style={{ margin: "6px 0" }}>
          {item.name}: <input defaultValue="" placeholder="type here" />
        </li>
      ))}
    </ul>
  );
}
`,
  },
}
