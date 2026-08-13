export default {
  slug: 'composition',
  title: 'Composition (children)',
  category: 'Fundamentals',
  description:
    'Components can accept other JSX as `children`, the same way HTML elements nest inside each other. ' +
    'This is composition — building UI by combining components — as opposed to configuring one giant ' +
    'component through a pile of props.',
  files: {
    '/Card.js': `// "children" is just a special prop — whatever JSX you put between the
// opening and closing <Card> tags shows up here automatically.
export default function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}
`,
    '/App.js': `import Card from "./Card";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* Same Card component, completely different content each time —
          Card doesn't need to know or care what's inside it. */}
      <Card title="Plain text">
        <p>Card just renders whatever children it's given.</p>
      </Card>

      <Card title="A list">
        <ul>
          <li>Composition</li>
          <li>over</li>
          <li>configuration</li>
        </ul>
      </Card>

      <Card title="Nested components">
        <p>You can even nest another interactive component in here:</p>
        <button onClick={() => alert("Clicked!")}>Click me</button>
      </Card>
    </div>
  );
}
`,
  },
}
