import { useState } from "react";

// components
import Popup from "./Popup";

// helper functions
import { fetchFromLS, removeFromLS } from "../helper";

// icons
import { AiFillDelete as ClearIcon } from "react-icons/ai";

// assets
import no_data from "../assets/no_data.svg";

function HighScores(props) {
  const [scores, setScores] = useState(fetchFromLS("extra_word_hs") || []);
  const { visible, onClose } = props;

  const clearScores = () => {
    removeFromLS("extra_word_hs");
    setScores([]);
  };

  const render_no_scores = () => {
    return (
      <div className="no-high-scores">
        <img src={no_data} alt="no high scores" />
        <p>No Records !!</p>
      </div>
    );
  };

  const render_score = (score, idx) => {
    const { name, points } = score;

    return (
      <div key={idx} className="high-score">
        <h3 className="name">{name}</h3>
        <p className="points">{points} Words</p>
      </div>
    );
  };

  return (
    <Popup title="high scores" type="LEFT" visible={visible} onClose={onClose}>
      {scores.length === 0 && render_no_scores()}

      {scores.length > 0 && (
        <div>
          <div className="high-scores">{scores.map(render_score)}</div>

          <button className="clear-high-scores-btn" onClick={clearScores}>
            <span>clear high scores</span>
            <ClearIcon />
          </button>
        </div>
      )}
    </Popup>
  );
}

export default HighScores;
