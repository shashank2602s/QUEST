import { Link } from "react-router-dom";
import { questionList } from "../data/questions";

function Explore() {
  return (
    <main className="explore-page">
      <section className="explore-header">
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
      </section>

      <section className="question-grid" aria-label="Explore questions">
        {questionList.map((item) => (
          <article className="question-card" key={item.id}>
            <div className="question-top">
              <span>{item.category}</span>
              <span>{item.explored} exploring</span>
            </div>

            <h2>{item.question}</h2>

            <p>{item.description}</p>

            <div className="question-bottom">
              <span>{item.perspectives.length} perspectives</span>

              <Link to={`/question/${item.id}`} aria-label={`Explore ${item.question}`}>
                Explore →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Explore;