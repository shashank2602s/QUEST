import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Question from "./pages/Question";
import Profile from "./pages/Profile";

function Home() {
  return (
    <div className="app-shell">
      <nav className="navbar" aria-label="Main navigation">
        <div className="logo" aria-label="QUEST home">
          QUEST<span>•</span>
        </div>

        <div className="nav-links">
          <Link to="/explore">Explore</Link>
          <Link to="/thinking">My Thinking</Link>
        </div>

        <Link to="/explore" className="nav-button">
          Start a Quest
        </Link>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">A SOCIAL NETWORK FOR CURIOSITY</p>

          <h1>
            Follow
            <br />
            <em>curiosity,</em>
            <br />
            not popularity.
          </h1>

          <p className="hero-description">
            QUEST is a social space where you follow questions,
            explore perspectives, challenge ideas, and build
            something new together.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="primary-button">
              Explore questions →
            </Link>

            <Link to="/thinking" className="secondary-button">
              My Thinking
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one">
            <span className="node node-one">AI &amp; careers</span>
          </div>

          <div className="orbit orbit-two">
            <span className="node node-two">Friendship</span>
          </div>

          <div className="orbit orbit-three">
            <span className="node node-three">Creativity</span>
          </div>

          <div className="core">?</div>

          <p className="visual-label">
            QUESTIONS
            <br />
            BECOME WORLDS.
          </p>
        </div>
      </main>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/question/:id" element={<Question key={location.pathname} />} />
      <Route path="/thinking" element={<Profile />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;