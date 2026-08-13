export default {
  slug: 'portals',
  title: 'Portals',
  category: 'Patterns',
  description:
    "createPortal renders a component's output into a different DOM node than its parent — useful for " +
    "modals or tooltips that need to escape a parent's overflow or z-index stacking, while still behaving " +
    'like a normal React child (events still bubble through the React tree, not the DOM tree).',
  files: {
    '/Modal.js': `import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, children }) {
  // Create a fresh DOM node to portal into, and clean it up on unmount —
  // this keeps the portal's target out of index.html entirely.
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    document.body.appendChild(elRef.current);
    return () => document.body.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 240 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div style={{ marginTop: 16 }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    elRef.current
  );
}
`,
    '/App.js': `import { useState } from "react";
import Modal from "./Modal";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <button onClick={() => setOpen(true)}>Open modal</button>

      {/* Even though the modal's DOM lives outside this <div> — appended
          straight onto <body> — clicking inside it still works like any
          other React child. Events bubble through the COMPONENT tree,
          not the DOM tree it was portaled into. */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3>Hello from a portal</h3>
          <p>This is rendered into a node appended directly to &lt;body&gt;.</p>
        </Modal>
      )}
    </div>
  );
}
`,
  },
}
