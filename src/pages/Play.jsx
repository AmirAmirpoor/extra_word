import { useState, useEffect } from "react";

// components
import Countdown from "react-countdown";
import ExtraWord from "../components/ExtraWord";

function Play() {
  const [initialTimer, setInitialTimer] = useState(null);
  const [isBoardVisible, setBoardVisible] = useState(false);

  useEffect(() => setInitialTimer(Date.now() + 3000), []);

  const initialTimerRenderer = ({ seconds, completed }) => {
    if (completed) return null;

    return <div className="initial-timer">{seconds}</div>;
  };

  return (
    <div className="container">
      <Countdown
        date={initialTimer}
        key={initialTimer}
        renderer={initialTimerRenderer}
        onComplete={() => setBoardVisible(true)}
      />

      {isBoardVisible && <ExtraWord />}
    </div>
  );
}

export default Play;
