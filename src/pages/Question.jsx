import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const questions = {
  1: {
    category: "FUTURE / CAREER",
    question: "Would you let AI choose your career?",
    description:
      "If an algorithm understood your strengths, personality, and opportunities better than you did — would you trust its decision?",
    explored: "1.2k",
    perspectives: [
      {
        id: 101,
        name: "Maya",
        role: "UX Designer",
        type: "PERSPECTIVE",
        text: "I'd let AI recommend a direction, but never make the final decision. A career isn't just about optimization.",
        position: "node-a",
        resonance: 18,
      },
      {
        id: 102,
        name: "Arjun",
        role: "Computer Science Student",
        type: "CHALLENGE",
        text: "But what if the AI understands your strengths and opportunities better than you do?",
        position: "node-b",
        resonance: 12,
      },
      {
        id: 103,
        name: "Noah",
        role: "Founder",
        type: "PERSPECTIVE",
        text: "The interesting part isn't whether AI chooses. It's whether we're willing to question the choice.",
        position: "node-c",
        resonance: 25,
      },
      {
        id: 104,
        name: "Zara",
        role: "Psychology Student",
        type: "BUILD",
        text: "Maybe AI should give us three possible lives instead of one perfect answer.",
        position: "node-d",
        resonance: 21,
      },
    ],
  },

  2: {
    category: "RELATIONSHIPS / FRIENDSHIP",
    question: "What actually makes a friendship last?",
    description:
      "Is it shared memories, honesty, effort, or simply growing in the same direction?",
    explored: "846",
    perspectives: [
      {
        id: 201,
        name: "Lena",
        role: "Writer",
        type: "PERSPECTIVE",
        text: "Consistency matters more than constant communication. Real friends can disappear for months and still feel close.",
        position: "node-a",
        resonance: 16,
      },
      {
        id: 202,
        name: "Dev",
        role: "Student",
        type: "CHALLENGE",
        text: "But doesn't friendship require effort? If nobody makes time, even a strong connection can fade.",
        position: "node-b",
        resonance: 11,
      },
      {
        id: 203,
        name: "Mira",
        role: "Photographer",
        type: "PERSPECTIVE",
        text: "Growing together is underrated. Sometimes friendship lasts because both people keep becoming better versions of themselves.",
        position: "node-c",
        resonance: 22,
      },
      {
        id: 204,
        name: "Sam",
        role: "Music Producer",
        type: "BUILD",
        text: "Maybe lasting friendship isn't about staying the same. It's about giving each other room to change.",
        position: "node-d",
        resonance: 19,
      },
    ],
  },

  3: {
    category: "CREATIVITY / TECHNOLOGY",
    question: "Does technology make us more creative?",
    description:
      "When tools become more powerful, do humans create more — or think less?",
    explored: "2.4k",
    perspectives: [
      {
        id: 301,
        name: "Iris",
        role: "Digital Artist",
        type: "PERSPECTIVE",
        text: "Better tools remove technical barriers and let people focus more on the idea itself.",
        position: "node-a",
        resonance: 24,
      },
      {
        id: 302,
        name: "Kabir",
        role: "Developer",
        type: "CHALLENGE",
        text: "Powerful tools can also make everyone reach for the same shortcuts. Convenience doesn't always create originality.",
        position: "node-b",
        resonance: 17,
      },
      {
        id: 303,
        name: "Ava",
        role: "Film Student",
        type: "PERSPECTIVE",
        text: "Technology expands what we can imagine because we can experiment faster and fail more cheaply.",
        position: "node-c",
        resonance: 20,
      },
      {
        id: 304,
        name: "Leo",
        role: "Creative Technologist",
        type: "BUILD",
        text: "Maybe creativity isn't reduced by technology. Maybe the definition of creativity is simply changing.",
        position: "node-d",
        resonance: 27,
      },
    ],
  },

  4: {
    category: "LIFE / PRODUCTIVITY",
    question: "Is being busy the same as being productive?",
    description:
      "Why do we measure our days by how much we did instead of what actually mattered?",
    explored: "634",
    perspectives: [
      {
        id: 401,
        name: "Nora",
        role: "Researcher",
        type: "PERSPECTIVE",
        text: "Being busy can feel productive because there is always visible activity. But meaningful work often looks slower.",
        position: "node-a",
        resonance: 15,
      },
      {
        id: 402,
        name: "Rohan",
        role: "Entrepreneur",
        type: "CHALLENGE",
        text: "Still, some seasons require intensity. Being busy isn't bad if the work is moving you toward something important.",
        position: "node-b",
        resonance: 14,
      },
      {
        id: 403,
        name: "Ella",
        role: "Student",
        type: "PERSPECTIVE",
        text: "Productivity should probably be measured by progress, not exhaustion.",
        position: "node-c",
        resonance: 23,
      },
      {
        id: 404,
        name: "Kai",
        role: "Designer",
        type: "BUILD",
        text: "Maybe the better question is: what deserves our attention in the first place?",
        position: "node-d",
        resonance: 18,
      },
    ],
  },

  5: {
    category: "SOCIETY / DIGITAL LIFE",
    question: "Should everyone have the right to disappear online?",
    description:
      "What would digital life look like if you could completely erase your presence?",
    explored: "1.8k",
    perspectives: [
      {
        id: 501,
        name: "Theo",
        role: "Privacy Researcher",
        type: "PERSPECTIVE",
        text: "People should have meaningful control over their digital history. The internet shouldn't define someone forever.",
        position: "node-a",
        resonance: 29,
      },
      {
        id: 502,
        name: "Anya",
        role: "Journalist",
        type: "CHALLENGE",
        text: "But disappearing completely could also erase information other people have a legitimate reason to keep.",
        position: "node-b",
        resonance: 16,
      },
      {
        id: 503,
        name: "Omar",
        role: "Security Student",
        type: "PERSPECTIVE",
        text: "Privacy should not be something you earn. It should be a basic part of participating online.",
        position: "node-c",
        resonance: 21,
      },
      {
        id: 504,
        name: "Sia",
        role: "Law Student",
        type: "BUILD",
        text: "Maybe the future is not total deletion, but giving people control over who can access different parts of their history.",
        position: "node-d",
        resonance: 26,
      },
    ],
  },

  6: {
    category: "IDENTITY / PEOPLE",
    question: "How much of who we are is shaped by other people?",
    description:
      "Where does your identity end and the expectations of others begin?",
    explored: "923",
    perspectives: [
      {
        id: 601,
        name: "Nia",
        role: "Psychology Student",
        type: "PERSPECTIVE",
        text: "We learn who we are partly through the reactions of people around us. Identity is never built completely alone.",
        position: "node-a",
        resonance: 19,
      },
      {
        id: 602,
        name: "Adil",
        role: "Philosophy Student",
        type: "CHALLENGE",
        text: "But if identity is entirely shaped by others, where does individual choice fit into the picture?",
        position: "node-b",
        resonance: 13,
      },
      {
        id: 603,
        name: "Rhea",
        role: "Illustrator",
        type: "PERSPECTIVE",
        text: "Other people can influence our identity without owning it. We still decide which parts become ours.",
        position: "node-c",
        resonance: 24,
      },
      {
        id: 604,
        name: "Yuki",
        role: "Student",
        type: "BUILD",
        text: "Maybe identity is less like a fixed label and more like a conversation between who we are and who we're becoming.",
        position: "node-d",
        resonance: 28,
      },
    ],
  },
};

function Question() {
  const { id } = useParams();

  const question = questions[id] || questions[1];

  const [perspectives, setPerspectives] = useState(
    question.perspectives
  );

  const [showComposer, setShowComposer] = useState(false);
  const [response, setResponse] = useState("");
  const [resonated, setResonated] = useState([]);
  const [composerMode, setComposerMode] = useState("PERSPECTIVE");

  const openComposer = (mode) => {
    setComposerMode(mode);
    setResponse("");
    setShowComposer(true);
  };

  const publishPerspective = () => {
    if (!response.trim()) return;

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

  return (
    <main className="question-page">
      <motion.header
        className="question-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to="/explore" className="back-link">
          ← Back to questions
        </Link>

        <p className="question-category">
          {question.category}
        </p>

        <h1>
          {question.question.split(" ").map((word, index) => (
            <span key={index}>
              {index === question.question.split(" ").length - 1 ? (
                <em>{word}</em>
              ) : (
                `${word} `
              )}
            </span>
          ))}
        </h1>

        <p className="question-description">
          {question.description}
        </p>

        <div className="question-meta">
          <span>{perspectives.length} perspectives</span>
          <span>{question.explored} exploring</span>
        </div>
      </motion.header>

      <motion.section
        className="thinking-space"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="space-label">
          <span>THE THINKING SPACE</span>
          <span>
            01 — {String(perspectives.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          className="connection-line line-one"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div
          className="connection-line line-two"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.div
          className="connection-line line-three"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.div
          className="question-core"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.35,
            type: "spring",
            stiffness: 120,
          }}
        >
          <span>THE QUESTION</span>
          <strong>?</strong>
        </motion.div>

        <AnimatePresence>
          {perspectives.map((perspective, index) => {
            const hasResonated = resonated.includes(
              perspective.id
            );

            return (
              <motion.article
                className={`perspective-node ${perspective.position}`}
                key={perspective.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.45,
                  delay: 0.45 + index * 0.1,
                  ease: "easeOut",
                }}
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
                    className={
                      hasResonated ? "resonated" : ""
                    }
                    onClick={() =>
                      toggleResonate(perspective.id)
                    }
                  >
                    {hasResonated
                      ? "Resonated ✓"
                      : "Resonate"}{" "}
                    · {perspective.resonance}
                  </button>

                  <button
                    onClick={() => openComposer("CHALLENGE")}
                  >
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">YOUR TURN</p>

        <h2>
          Add something
          <br />
          <em>to the question.</em>
        </h2>

        <div className="contribute-actions">
          <button
            onClick={() => openComposer("PERSPECTIVE")}
          >
            Add perspective
          </button>

          <button
            onClick={() => openComposer("CHALLENGE")}
          >
            Challenge an idea
          </button>

          <button
            onClick={() => openComposer("BUILD")}
          >
            Build on this
          </button>

          <button
            onClick={() => openComposer("REMIX")}
          >
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
          >
            <motion.div
              className="composer"
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <button
                className="composer-close"
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

              <h2>
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

              <textarea
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
                onChange={(event) =>
                  setResponse(event.target.value)
                }
                maxLength={280}
                autoFocus
              />

              <div className="composer-footer">
                <span>{response.length}/280</span>

                <button
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