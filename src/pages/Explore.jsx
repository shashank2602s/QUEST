import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    category: "FUTURE",
    question: "Would you let AI choose your career?",
    description:
      "If an algorithm understood your strengths better than you did, would you trust its decision?",
    perspectives: 24,
    explored: "1.2k",
  },
  {
    id: 2,
    category: "RELATIONSHIPS",
    question: "What actually makes a friendship last?",
    description:
      "Is it shared memories, honesty, effort, or simply growing in the same direction?",
    perspectives: 18,
    explored: "846",
  },
  {
    id: 3,
    category: "CREATIVITY",
    question: "Does technology make us more creative?",
    description:
      "When tools become more powerful, do humans create more — or think less?",
    perspectives: 31,
    explored: "2.4k",
  },
  {
    id: 4,
    category: "LIFE",
    question: "Is being busy the same as being productive?",
    description:
      "Why do we measure our days by how much we did instead of what actually mattered?",
    perspectives: 12,
    explored: "634",
  },
  {
    id: 5,
    category: "SOCIETY",
    question: "Should everyone have the right to disappear online?",
    description:
      "What would digital life look like if you could completely erase your presence?",
    perspectives: 27,
    explored: "1.8k",
  },
  {
    id: 6,
    category: "IDENTITY",
    question: "How much of who we are is shaped by other people?",
    description:
      "Where does your identity end and the expectations of others begin?",
    perspectives: 16,
    explored: "923",
  },
];

function Explore() {
  return (
    <main className="explore-page">
      <motion.section
        className="explore-header"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="eyebrow">THE CURIOSITY INDEX</p>

        <h1>
          Questions worth
          <br />
          <em>exploring.</em>
        </h1>

        <p className="explore-intro">
          Follow questions that make you stop scrolling,
          start thinking, and see the world differently.
        </p>
      </motion.section>

      <section className="question-grid">
        {questions.map((item, index) => (
          <motion.article
            className="question-card"
            key={item.id}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <div className="question-top">
              <span>{item.category}</span>
              <span>{item.explored} exploring</span>
            </div>

            <h2>{item.question}</h2>

            <p>{item.description}</p>

            <div className="question-bottom">
              <span>{item.perspectives} perspectives</span>

              <Link to={`/question/${item.id}`}>
                Explore →
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}

export default Explore;