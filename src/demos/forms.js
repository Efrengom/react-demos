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
      <form>
        <label>
          Name:{" "}
          {/* "value" makes this controlled — React, not the browser, owns
              what's on screen. Without the onChange, this input would be
              read-only (React would block every keystroke). */}
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <br />
        <label style={{ display: "block", marginTop: 8 }}>
          Role:{" "}
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <label style={{ display: "block", marginTop: 8 }}>
          {/* Checkboxes use "checked" instead of "value". */}
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
          />{" "}
          Subscribe to updates
        </label>
      </form>

      <h3>Live state</h3>
      <pre style={{ background: "#f6f7f9", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(form, null, 2)}
      </pre>
    </div>
  );
}
`,
  },
}
