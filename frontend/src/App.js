import { useState } from "react";
import "./App.css";

const LEVELS = [
  { label: "Grade 3", value: 3, sub: "Elementary" },
  { label: "Grade 6", value: 6, sub: "Middle School" },
  { label: "Grade 9", value: 9, sub: "High School" },
  { label: "Grade 12", value: 12, sub: "Advanced" },
];

function App() {
  const [text, setText] = useState("");
  const [readingLevel, setReadingLevel] = useState(6);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitText = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("http://127.0.0.1:8000/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, reading_level: readingLevel }),
      });
      if (!response.ok) throw new Error("Something went wrong.");
      const data = await response.json();
      setResult(data.transformed_text);
    } catch (e) {
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const selectedLevel = LEVELS.find((l) => l.value === readingLevel);

  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          <span className="logo-thin">Clear</span><span className="logo-bold">Read</span>
        </div>
        <span className="header-divider" />
        <p className="tagline">Simplify any text to the reading level you need</p>
      </header>

      <div className="toolbar">
        <div className="toolbar__left">
          <span className="toolbar__label">Simplify to</span>
          <div className="segmented">
            {LEVELS.map((level) => (
              <button
                key={level.value}
                className={`seg-btn${readingLevel === level.value ? " seg-btn--active" : ""}`}
                onClick={() => setReadingLevel(level.value)}
                type="button"
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
        <button
          className="btn-submit"
          onClick={submitText}
          disabled={loading || !text.trim()}
          type="button"
        >
          {loading ? "Simplifying…" : "Simplify →"}
        </button>
      </div>

      <div className="panels">
        <div className="panel panel--input">
          <div className="panel__header">
            <span className="panel__label">Original</span>
            {text && <span className="panel__meta">{text.length} chars</span>}
          </div>
          <textarea
            className="textarea"
            placeholder="Type or paste any text here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="panel panel--output">
          <div className="panel__header">
            <span className="panel__label">Simplified</span>
            {result && <span className="panel__badge">{selectedLevel?.label}</span>}
          </div>
          <div className="output-body">
            {error && <p className="error-msg">{error}</p>}
            {result ? (
              <p className="result-text">{result}</p>
            ) : (
              !error && (
                <div className="empty-state">
                  <div className="empty-state__ring">→</div>
                  <p className="empty-state__text">Simplified text will appear here</p>
                  <p className="empty-state__sub">Select a level and click Simplify</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <span className="footer__name">Leena Dany</span>
        <span className="footer__logo">
          <span>Clear</span><span>Read</span>
        </span>
      </footer>
    </div>
  );
}

export default App;
