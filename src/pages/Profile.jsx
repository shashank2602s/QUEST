import { Link } from "react-router-dom";

const thinkingStats = [
  {
    number: "06",
    label: "QUESTIONS EXPLORED",
  },
  {
    number: "04",
    label: "PERSPECTIVES",
  },
  {
    number: "02",
    label: "IDEAS BUILT",
  },
  {
    number: "01",
    label: "CHALLENGES",
  },
];

const recentThinking = [
  {
    category: "FUTURE",
    question: "Would you let AI choose your career?",
    action: "Added a perspective",
    date: "Today",
  },
  {
    category: "CREATIVITY",
    question: "Does technology make us more creative?",
    action: "Explored the thinking space",
    date: "Yesterday",
  },
  {
    category: "RELATIONSHIPS",
    question: "What actually makes a friendship last?",
    action: "Resonated with a perspective",
    date: "2 days ago",
  },
];

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

        <div className="profile-mark">
          <span>?</span>
        </div>
      </header>

      <section className="thinking-stats">
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
              to="/question/1"
              className="thinking-item"
              key={item.question}
            >
              <div className="thinking-number">
                0{index + 1}
              </div>

              <div className="thinking-main">
                <span>{item.category}</span>

                <h2>{item.question}</h2>

                <p>{item.action}</p>
              </div>

              <div className="thinking-date">
                {item.date}
                <span>→</span>
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