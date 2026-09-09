import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { questionMap } from "../data/questions";

function Question() {
  const { id } = useParams();
  const normalizedId = Number(id) || 1;
  const question = questionMap[String(normalizedId)] ?? questionMap["1"];

  const [perspectives, setPerspectives] = useState(() => question.perspectives);
  const [showComposer, setShowComposer] = useState(false);
  const [response, setResponse] = useState("");
  const [resonated, setResonated] = useState([]);
  const [composerMode, setComposerMode] = useState("PERSPECTIVE");

  useEffect(() => {
    if (!showComposer) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowComposer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showComposer]);

  const openComposer = (mode) => {
    setComposerMode(mode);
    setResponse("");
    setShowComposer(true);
  };

  const publishPerspective = () => {
    if (!response.trim()) {
      return;
    }

    const newPerspective = {
      id: Date.now(),
      name: "You",
      role: "New contributor",
      type: composerMode,
      text: response.trim(),
      position: "node-new",
      resonance: 0,
    };

    setPerspectives((current) => [...current, newPerspective]);
    setResponse("");
    setShowComposer(false);
  };

  const toggleResonate = (perspectiveId) => {
    const alreadyResonated = resonated.includes(perspectiveId);

    setResonated((current) =>
      alreadyResonated
        ? current.filter((item) => item !== perspectiveId)
        : [...current, perspectiveId]
    );

    setPerspectives((current) =>
      current.map((perspective) => {
        if (perspective.id !== perspectiveId) {
          return perspective;
        }

        return {
          ...perspective,
          resonance: alreadyResonated
            ? perspective.resonance - 1
            : perspective.resonance + 1,
        };
      })
    );
  };

  const words = question.question.split(" ");

  return (
    <main className="question-page">
      <motion.header
        className="question-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Link to="/explore" className="back-link" aria-label="Back to explore questions">
          ← Back to questions
        </Link>

        <p className="question-category">{question.category}</p>

        <h1>
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              {index === words.length - 1 ? <em>{word}</em> : `${word} `}
            </span>
          ))}
        </h1>

        <p className="question-description">{question.description}</p>

        <div className="question-meta">
          <span>{perspectives.length} perspectives</span>
          <span>{question.explored} exploring</span>
        </div>
      </motion.header>

      <motion.section
        className="thinking-space"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        aria-label={`${question.question} thinking space`}
      >
        <div className="space-label">
          <span>THE THINKING SPACE</span>
          <span>01 — {String(perspectives.length).padStart(2, "0")}</span>
        </div>

        <motion.div
          className="connection-line line-one"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.div
          className="connection-line line-two"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        />

        <motion.div
          className="connection-line line-three"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.36 }}
        />

        <motion.div
          className="question-core"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15, type: "spring", stiffness: 120 }}
        >
          <span>THE QUESTION</span>
          <strong>?</strong>
        </motion.div>

        <AnimatePresence>
          {perspectives.map((perspective, index) => {
            const hasResonated = resonated.includes(perspective.id);

            return (
              <motion.article
                className={`perspective-node ${perspective.position}`}
                key={perspective.id}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="node-info">
                  <span>{perspective.type}</span>
                  <small>
                    {perspective.name} · {perspective.role}
                  </small>
                </div>

                <p>{perspective.text}</p>

                <div className="node-actions">
                  <button
                    type="button"
                    className={hasResonated ? "resonated" : ""}
                    aria-pressed={hasResonated}
                    onClick={() => toggleResonate(perspective.id)}
                  >
                    {hasResonated ? "Resonated ✓" : "Resonate"} · {perspective.resonance}
                  </button>

                  <button type="button" onClick={() => openComposer("CHALLENGE")}>
                    Challenge
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.section>

      <motion.section
        className="contribute-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <p className="eyebrow">YOUR TURN</p>

        <h2>
          Add something
          <br />
          <em>to the question.</em>
        </h2>

        <div className="contribute-actions">
          <button type="button" onClick={() => openComposer("PERSPECTIVE")}>
            Add perspective
          </button>

          <button type="button" onClick={() => openComposer("CHALLENGE")}>
            Challenge an idea
          </button>

          <button type="button" onClick={() => openComposer("BUILD")}>
            Build on this
          </button>

          <button type="button" onClick={() => openComposer("REMIX")}>
            Remix
          </button>
        </div>
      </motion.section>

      <AnimatePresence>
        {showComposer && (
          <motion.div
            className="composer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComposer(false)}
          >
            <motion.div
              className="composer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="composer-title"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="composer-close"
                aria-label="Close composer"
                onClick={() => setShowComposer(false)}
              >
                ×
              </button>

              <p className="eyebrow">
                {composerMode === "BUILD"
                  ? "BUILD ON AN IDEA"
                  : composerMode === "CHALLENGE"
                    ? "CHALLENGE A PERSPECTIVE"
                    : composerMode === "REMIX"
                      ? "REMIX THE IDEA"
                      : "ADD TO THE THINKING SPACE"}
              </p>

              <h2 id="composer-title">
                {composerMode === "BUILD" ? (
                  <>
                    Build on <em>an idea.</em>
                  </>
                ) : composerMode === "CHALLENGE" ? (
                  <>
                    Question <em>the idea.</em>
                  </>
                ) : composerMode === "REMIX" ? (
                  <>
                    See it <em>differently.</em>
                  </>
                ) : (
                  <>
                    What do <em>you</em> think?
                  </>
                )}
              </h2>

              <label className="sr-only" htmlFor="composer-response">
                Share your response
              </label>
              <textarea
                id="composer-response"
                placeholder={
                  composerMode === "BUILD"
                    ? "Take an existing idea somewhere new..."
                    : composerMode === "CHALLENGE"
                      ? "What would you question about this idea?"
                      : composerMode === "REMIX"
                        ? "Reimagine this idea from another angle..."
                        : "Share your perspective..."
                }
                value={response}
                onChange={(event) => setResponse(event.target.value)}
                maxLength={280}
                autoFocus
              />

              <div className="composer-footer">
                <span>{response.length}/280</span>

                <button
                  type="button"
                  className="publish-button"
                  disabled={!response.trim()}
                  onClick={publishPerspective}
                >
                  Add to the space →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Question;