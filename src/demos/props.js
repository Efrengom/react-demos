export default {
  slug: 'props',
  title: 'Props',
  category: 'Fundamentals',
  description:
    'Props are how data flows from a parent component down to its children. ' +
    '<App> owns the data and passes pieces of it into <Greeting> and <UserCard> as props — ' +
    'each child only sees what it\'s handed. Try changing the `users` array or the props passed to <Greeting>.',
  files: {
    '/App.js': `import Greeting from "./Greeting";
import UserCard from "./UserCard";

export default function App() {
  // This data lives in App. Greeting and UserCard don't own any of it —
  // they only ever see the slice App decides to hand them below.
  const users = [
    { name: "Ada", role: "Engineer" },
    { name: "Grace", role: "Mathematician" },
    { name: "Alan", role: "Cryptographer" },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      {/* Passing a single prop: name="Ada" becomes props.name inside Greeting. */}
      <Greeting name="Ada" />

      <h3>Team</h3>
      <ul>
        {/* .map turns each object in "users" into a <UserCard>, spreading its
            fields out as separate props. "key" isn't a real prop — React uses
            it internally to track list items and never passes it to UserCard. */}
        {users.map((user) => (
          <UserCard key={user.name} name={user.name} role={user.role} />
        ))}
      </ul>
    </div>
  );
}
`,
    '/Greeting.js': `// Destructuring { name } out of the props object is the same as writing
// (props) => ... and then reading props.name. Props are read-only here —
// Greeting can use "name" but can never change it; only App controls that.
export default function Greeting({ name }) {
  return <p>Hello, {name}! 👋</p>;
}
`,
    '/UserCard.js': `// Every prop App passed in the JSX call — name and role — shows up here
// as a field on the same props object, picked out by destructuring.
export default function UserCard({ name, role }) {
  return (
    <li>
      <strong>{name}</strong> — {role}
    </li>
  );
}
`,
  },
}
