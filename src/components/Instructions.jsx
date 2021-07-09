// components
import Popup from "./Popup";

function Instructions(props) {
  const { visible, onClose } = props;

  return (
    <Popup title="instructions" visible={visible} onClose={onClose}>
      <p className="mt">
        If you are unfamiliar with this game, the following instructions will
        help you.
      </p>

      <p className="mt">
        Once you hit <span className="em">start the game</span> button you will
        see a board which contains a few words and a button below the board
        which says <span className="em">next.</span>
      </p>

      <p className="mt">
        You are supposed to memorize these words. Once you're certain you
        memorized all of them by clicking on the next button another board will
        be displayed and the new board contains all the previous words and also{" "}
        <span className="em">one extra word.</span>
      </p>

      <div className="mt">
        You should detect which word is extra which means did not exist in the
        last board. Obviously if you choose the extra word correctly your score
        will be increased by one.
        <p className="em">This process will continue until your time is up.</p>
      </div>

      <p className="mt">Give it a try to see how many points you can get 👊</p>
      <p className="mt">
        Here is the{" "}
        <a href="#" className="link">
          project repository link
        </a>
        , in case you want to access to the source code, make a PR, or star it
        to make me happy 🙂
      </p>
    </Popup>
  );
}

export default Instructions;
