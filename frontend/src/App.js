import { useState } from "react";
import "./App.css";

const LEVELS = [
  { label: "Grade 3",  value: 3  },
  { label: "Grade 6",  value: 6  },
  { label: "Grade 9",  value: 9  },
  { label: "Grade 12", value: 12 },
];

function App() {
  const [text, setText]               = useState("");
  const [readingLevel, setReadingLevel] = useState(6);
  const [result, setResult]           = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const wordCount   = text.trim() ? text.trim().split(/\s+/).length : 0;
  const activeIndex = LEVELS.findIndex((l) => l.value === readingLevel);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res  = await fetch("http://127.0.0.1:8000/transform", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ text, reading_level: readingLevel }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data.transformed_text);
    } catch {
      setError("Couldn't reach the server — is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
     
      <header className="header">
        <div className="logo">
          <span className="logo__light">Clear</span><span className="logo__bold">Read</span>
        </div>

        <div className="controls">
          <span className="controls__label">Reading level</span>
          <div className="level-slider">
            <div
              className="level-slider__thumb"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
            {LEVELS.map((l) => (
              <button
                key={l.value}
                type="button"
                className={`level-stop${readingLevel === l.value ? " level-stop--on" : ""}`}
                onClick={() => setReadingLevel(l.value)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn-run"
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
          >
            {loading ? <span className="spinner" /> : "Simplify"}
          </button>
        </div>
      </header>

      {/* ── Workspace ── */}
      <main className="workspace">
        <section className="pane pane--in">
          <header className="pane__bar">
            <span className="pane__label">Original</span>
            {wordCount > 0 && (
              <span className="pane__stat">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            )}
          </header>
          <textarea
            className="pane__text pane__text--input"
            placeholder="Paste or write anything here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
        </section>

        <div className="divider" aria-hidden />

        <section className="pane pane--out">
          <header className="pane__bar">
            <span className="pane__label">Simplified</span>
            {result && (
              <span className="pane__chip">Grade {readingLevel}</span>
            )}
          </header>

          {error && <p className="error">{error}</p>}

          {result ? (
            <p className="pane__text pane__text--output">{result}</p>
          ) : !error ? (
            <div className="ghost">
              <div className="ghost__lines" aria-hidden>
                <span className="ghost__line ghost__line--full"  />
                <span className="ghost__line ghost__line--full"  />
                <span className="ghost__line ghost__line--short" />
              </div>
              <p className="ghost__msg">Your simplified text will appear here</p>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="footer">
        <span className="footer__by">Leena Dany</span>
        <span className="footer__mark">
          <span>Clear</span><span>Read</span>
        </span>
      </footer>
    </div>
  );
}

export default App;