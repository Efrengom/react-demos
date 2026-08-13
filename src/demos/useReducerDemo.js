export default {
  slug: 'usereducer',
  title: 'useReducer',
  category: 'Hooks',
  description:
    'useReducer is useState\'s sibling for when state changes follow clear "actions" — good for state ' +
    'with multiple sub-values or predictable transitions. Instead of calling setters directly, you `dispatch` ' +
    'an action and a reducer function decides the next state.',
  files: {
    '/App.js': `import { useReducer, useState } from "react";

// A reducer is just: (current state, action) => next state. It's called
// automatically by React every time you dispatch — you never call it directly.
// All three branches return a NEW array/object rather than mutating "state",
// which is what lets React detect the change and re-render.
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return state.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    case "remove":
      return state.filter((task) => task.id !== action.id);
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function App() {
  // useReducer(reducer, []) starts "tasks" at [] and gives back "dispatch" —
  // the only way to request a state change; dispatch never touches state itself.
  const [tasks, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    // Dispatching describes WHAT happened ("add" this text) — the reducer
    // above decides HOW that turns into a new tasks array.
    dispatch({ type: "add", text });
    setText("");
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: "6px 0" }}>
            <label
              style={{
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "#999" : "inherit",
              }}
            >
              {/* Same pattern: describe the action, let the reducer compute
                  the result. This component never mutates "task" directly. */}
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: "toggle", id: task.id })}
              />{" "}
              {task.text}
            </label>
            <button
              onClick={() => dispatch({ type: "remove", id: task.id })}
              style={{ marginLeft: 8 }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  },
}
