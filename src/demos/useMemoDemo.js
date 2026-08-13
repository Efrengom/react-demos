export default {
  slug: 'usememo',
  title: 'useMemo',
  category: 'Hooks',
  description:
    'useMemo caches the result of a calculation and only recomputes it when its dependencies change — ' +
    'not on every render. Type in the box below (unrelated state) and watch the "recalculated" count stay ' +
    'put; change the limit and it climbs.',
  files: {
    '/App.js': `import { useMemo, useRef, useState } from "react";

// A deliberately slow calculation so its cost is obvious. In real code this
// stands in for something like filtering/sorting a large list.
function slowCountPrimes(limit) {
  let count = 0;
  for (let n = 2; n <= limit; n++) {
    let isPrime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }
  return count;
}

// The sandbox this code runs in kills any loop past 100,000 iterations
// ("potential infinite loop") — the outer loop above runs "limit" times, so
// this cap keeps the demo well clear of that ceiling no matter how many
// times you click.
const MAX_LIMIT = 80000;

export default function App() {
  const [limit, setLimit] = useState(20000);
  const [text, setText] = useState("");
  const calculations = useRef(0);

  // Without useMemo, slowCountPrimes would re-run on EVERY render —
  // including every keystroke in the text box below, which has nothing to
  // do with it. The dependency array [limit] tells React "only redo this
  // when limit changes."
  const primeCount = useMemo(() => {
    calculations.current++;
    return slowCountPrimes(limit);
  }, [limit]);

  const atMax = limit >= MAX_LIMIT;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <p>
        Primes up to {limit}: <strong>{primeCount}</strong>
      </p>
      <p style={{ color: "#666" }}>
        Recalculated {calculations.current} time(s) — only goes up when you
        click below, never while typing in the unrelated box.
      </p>

      <button
        disabled={atMax}
        onClick={() => setLimit((l) => Math.min(l + 10000, MAX_LIMIT))}
      >
        {atMax ? "Max reached" : "Increase limit (triggers recalculation)"}
      </button>

      <div style={{ marginTop: 16 }}>
        <label>
          Unrelated text:{" "}
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </label>
      </div>
    </div>
  );
}
`,
  },
}
