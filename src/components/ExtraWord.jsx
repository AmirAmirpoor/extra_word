import { useState, useEffect } from "react";

// components
import Board from "./Board";
import Countdown from "react-countdown";

// react-router-dom stuff
import { Link, useHistory } from "react-router-dom";

// helper functions
import { feedTheBoard, fetchFromLS, persistToLS } from "../helper";

// assets
import new_record from "../assets/new_record.svg";

function ExtraWord() {
  const [board, setBoard] = useState(null);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();

  useEffect(() => {
    feed();
    setTimer(Date.now() + 60000); // 60 seconds
    setPlaying(true);
    setNewRecord(false);
  }, []);

  const feed = () => setBoard(feedTheBoard());

  const updatePoints = (type) => {
    if (type === "CORRECT") setPoints((points) => points + 1);
    setTimeout(() => feed(), 200);
  };

  const timesUp = () => {
    const scores = fetchFromLS("extra_word_hs") || [];
    const threshold = scores.length ? scores[0].points : 1;

    if (points > threshold) setNewRecord(true);
    setPlaying(false);
  };

  const reset = () => {
    setPlaying(true);
    setTimer(Date.now() + 60000);
    setPoints(0);
    setName("");
    feed();
  };

  const adddToScores = () => {
    if (!name.trim()) return;

    const updatedScores = fetchFromLS("extra_word_hs") || [];
    updatedScores.unshift({ name, points });
    if (updatedScores.length > 5) updatedScores.shift();

    persistToLS("extra_word_hs", updatedScores);
    history.push("/");
  };

  const timerRenderer = ({ minutes, seconds, completed }) => {
    if (completed) return null;

    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    return (
      <div>
        {m}:{s}
      </div>
    );
  };

  return (
    <div className="board">
      {isPlaying && (
        <div className="board-header">
          <div>POINTS : {points}</div>

          <Countdown
            date={timer}
            key={timer}
            renderer={timerRenderer}
            onComplete={timesUp}
          />
        </div>
      )}

      {isPlaying && <Board board={board} updatePoints={updatePoints} />}

      {!isPlaying && (
        <div className="result">
          <p>Time's up</p>
          <p>
            You detect <span className="result-points">{points}</span> word
            {points > 1 && "s"}
          </p>

          {newRecord && (
            <div className="new-record">
              <img src={new_record} alt="new record" />
              <p className="mt">good job. you set a new record !!</p>

              <div className="new-record-form-container">
                <p>
                  in order to save this record, type your name and hit{" "}
                  <span className="em">save this record</span> button
                </p>

                <div className="new-record-form mt">
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="enter your name..."
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                  />

                  <div className="new-record-form-actions">
                    <button onClick={adddToScores}>Save this record</button>
                    <button onClick={() => setNewRecord(false)}>cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="result-actions">
            <button onClick={reset}>Play Again</button>
            <Link to="/">Back Home</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExtraWord;
