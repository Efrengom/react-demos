export default {
  slug: 'forms',
  title: 'Forms & Controlled Inputs',
  category: 'Fundamentals',
  description:
    'A "controlled" input is one whose value is driven entirely by React state — you read ' +
    'event.target.value into state, then feed that state back as the value prop. That keeps a single ' +
    "source of truth instead of letting the DOM and React's state drift apart.",
  files: {
    '/App.js': `import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    role: "developer",
    subscribe: true,
  });

  // One handler for every field: it reads the field's own "name" attribute,
  // so adding more fields later doesn't mean writing more handlers.
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 64, flexShrink: 0 }}>Name:</span>
          {/* "value" makes this controlled — React, not the browser, owns
              what's on screen. Without the onChange, this input would be
              read-only (React would block every keystroke). */}
          <input name="name" value={form.name} onChange={handleChange} style={{ flex: 1 }} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 64, flexShrink: 0 }}>Role:</span>
          <select name="role" value={form.role} onChange={handleChange} style={{ flex: 1 }}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Checkboxes use "checked" instead of "value". */}
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
          />
          Subscribe to updates
        </label>
      </form>

      <h3 style={{ margin: "20px 0 8px" }}>Live state</h3>
      <pre style={{ background: "#f6f7f9", padding: 12, borderRadius: 8, margin: 0 }}>
        {JSON.stringify(form, null, 2)}
      </pre>
    </div>
  );
}
`,
  },
}
