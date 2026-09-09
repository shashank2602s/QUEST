import { Link } from "react-router-dom";
import { questionList } from "../data/questions";

const thinkingStats = [
  { number: "06", label: "QUESTIONS EXPLORED" },
  { number: "04", label: "PERSPECTIVES" },
  { number: "02", label: "IDEAS BUILT" },
  { number: "01", label: "CHALLENGES" },
];

const recentThinking = questionList.slice(0, 3).map((question, index) => ({
  id: question.id,
  category: question.category.split(" / ")[0],
  question: question.question,
  action:
    index === 0
      ? "Added a perspective"
      : index === 1
        ? "Explored the thinking space"
        : "Resonated with a perspective",
  date: index === 0 ? "Today" : index === 1 ? "Yesterday" : "2 days ago",
}));

function Profile() {
  return (
    <main className="profile-page">
      <header className="profile-header">
        <div>
          <p className="eyebrow">MY THINKING</p>

          <h1>
            A record of
            <br />
            <em>curiosity.</em>
          </h1>

          <p className="profile-intro">
            The questions you've explored, the perspectives
            you've added, and the ideas you've helped build.
          </p>
        </div>

        <div className="profile-mark" aria-hidden="true">
          <span>?</span>
        </div>
      </header>

      <section className="thinking-stats" aria-label="Thinking stats">
        {thinkingStats.map((stat) => (
          <div className="thinking-stat" key={stat.label}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="recent-thinking">
        <div className="section-heading">
          <p className="eyebrow">RECENT ACTIVITY</p>
          <span>YOUR CURIOSITY TRAIL</span>
        </div>

        <div className="thinking-list">
          {recentThinking.map((item, index) => (
            <Link
              to={`/question/${item.id}`}
              className="thinking-item"
              key={item.id}
              aria-label={`Open ${item.question}`}
            >
              <div className="thinking-number">0{index + 1}</div>

              <div className="thinking-main">
                <span>{item.category}</span>
                <h2>{item.question}</h2>
                <p>{item.action}</p>
              </div>

              <div className="thinking-date">
                {item.date}
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="profile-closing">
        <p className="eyebrow">KEEP GOING</p>

        <h2>
          Curiosity is
          <br />
          <em>never finished.</em>
        </h2>

        <Link to="/explore" className="primary-button">
          Explore more questions →
        </Link>
      </section>
    </main>
  );
}

export default Profile;