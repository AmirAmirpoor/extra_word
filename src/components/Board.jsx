import { useState, useEffect } from "react";

const GRID_CLASSNAMES = {
  4: "grid-four",
  5: "grid-five",
  6: "grid-six",
  7: "grid-seven",
};

function Board(props) {
  const [step, setStep] = useState(1);
  const [selectedWord, setSelectedWord] = useState("");

  const { board, updatePoints } = props;

  useEffect(() => {
    if (props.board !== null) {
      setStep(1);
      setSelectedWord("");
    }
  }, [props.board]);

  const goToNextStep = () => setStep(2);

  const handleClick = (word) => {
    const { extraWord } = board;

    setSelectedWord(word);

    if (word === extraWord) updatePoints("CORRECT");
    else updatePoints("WRONG");
  };

  const renderGameBoard = (words, patterns) => {
    if (!words || !patterns) return null;

    const { extraWord } = board;

    const gridClasses = `grid ${GRID_CLASSNAMES[words.length]}`;

    return (
      <div className={gridClasses}>
        {words.map((word, idx) => {
          let buttonClasses = "btn";
          if (step === 2) {
            const isGreen = selectedWord && word === extraWord;
            const isRed = selectedWord === word && selectedWord !== extraWord;

            if (isGreen) buttonClasses = "btn correct";
            else if (isRed) buttonClasses = "btn wrong";
          }

          return (
            <button
              style={{ ...patterns[idx] }}
              key={idx}
              className={buttonClasses}
              disabled={step === 1}
              onClick={() => handleClick(word)}
            >
              {word}
            </button>
          );
        })}
      </div>
    );
  };

  if (!board) return <div></div>;

  const {
    firstStepWords,
    firstStepPatterns,
    secondStepWords,
    secondStepPatterns,
  } = board;

  return (
    <div>
      {step === 1 && renderGameBoard(firstStepWords, firstStepPatterns)}
      {step === 2 && renderGameBoard(secondStepWords, secondStepPatterns)}

      <div className="next-btn-container">
        {step === 1 && (
          <button className="next-btn" onClick={goToNextStep}>
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}

export default Board;
