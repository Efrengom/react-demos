export default {
  slug: 'lifting-state',
  title: 'Lifting State Up',
  category: 'Fundamentals',
  description:
    'When two components need to stay in sync with the same data, the fix is to move ("lift") that ' +
    'state up to their closest common parent and pass it back down as props. Here, two temperature inputs ' +
    "stay in sync because neither one owns the temperature — their shared parent does.",
  files: {
    '/TemperatureInput.js': `export default function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const label = scale === "c" ? "Celsius" : "Fahrenheit";

  return (
    <fieldset style={{ marginBottom: 12 }}>
      <legend>Temperature in {label}</legend>
      {/* Neither input keeps its own state — "temperature" always comes
          from the parent, and every keystroke is reported straight back up. */}
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}
`,
    '/App.js': `import { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function round(value) {
  const n = parseFloat(value);
  return Number.isNaN(n) ? "" : Math.round(n * 10) / 10;
}

export default function App() {
  // The temperature and which scale was last edited both live here, in the
  // shared parent — that's the "lift" in lifting state up. Neither
  // TemperatureInput below owns any of this itself.
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  // Guard against the empty string: "" * 9 coerces to 0 in JS, which would
  // otherwise make the untouched field show a converted "32" instead of blank.
  const celsius = scale === "f" ? (temperature === "" ? "" : round(toCelsius(temperature))) : temperature;
  const fahrenheit = scale === "c" ? (temperature === "" ? "" : round(toFahrenheit(temperature))) : temperature;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={(value) => {
          setScale("c");
          setTemperature(value);
        }}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={(value) => {
          setScale("f");
          setTemperature(value);
        }}
      />
      <p>
        {celsius !== ""
          ? "Water would " + (celsius >= 100 ? "boil" : "not boil") + " at this temperature."
          : "Enter a temperature."}
      </p>
    </div>
  );
}
`,
  },
}
