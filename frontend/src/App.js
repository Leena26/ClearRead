import { useState } from "react";

function App() {
  // State variables for input text, reading level and transformed text (result)
  const [text, setText] = useState("");
  const [readingLevel, setReadingLevel] = useState(5);
  const [result, setResult] = useState("");

  const submitText = async () => {
    const response = await fetch("http://127.0.0.1:8000/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        reading_level: readingLevel,
      }),
    });

    const data = await response.json();
    setResult(data.transformed_text);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ClearRead</h1>

      <textarea
        rows={5}
        cols={50}
        placeholder="Paste text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        value={readingLevel}
        onChange={(e) => setReadingLevel(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={submitText}>Simplify</button>

      <p><strong>Result:</strong></p>
      <p>{result}</p>
    </div>
  );
}

export default App;
