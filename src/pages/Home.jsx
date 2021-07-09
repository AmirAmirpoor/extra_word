import { useState } from "react";

// components
import Instructions from "../components/Instructions";
import HighScores from "../components/HighScores";

// react-router-dom stuff
import { Link } from "react-router-dom";

// icons
import { AiFillGithub as GithubIcon } from "react-icons/ai";

// assets
import welcome from "../assets/welcome.svg";

function Home() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);

  return (
    <div className="container">
      <h1 className="title">Extra Word</h1>
      <img src={welcome} className="welcome-svg" alt="extra word game" />

      <Link to="/play" className="home-btn">
        Start The Game
      </Link>

      <button className="home-btn" onClick={() => setShowInstructions(true)}>
        Instructions
      </button>

      <button className="home-btn" onClick={() => setShowHighScores(true)}>
        high scores
      </button>

      <Instructions
        visible={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <HighScores
        visible={showHighScores}
        onClose={() => setShowHighScores(false)}
      />

      <a
        href="https://github.com/AmirAmirpoor/extra_word"
        target="_blank"
        className="repo-link"
      >
        <span>repository link</span>
        <GithubIcon />
      </a>
    </div>
  );
}

export default Home;
