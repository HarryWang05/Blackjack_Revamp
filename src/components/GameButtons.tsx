import { Deck, drawCard, createDecks, calcHand, isBust, checkHandEvent, startDealer, calcHit } from "../Functions";

interface Props {
  hasStarted: boolean;
  over: boolean;
  playerHand: number[][];
  dealerHand: number[][];
  startFunc: () => void;
  hitFunc: () => void;
  standFunc: () => void;
  restartFunc: () => void;
}

const GameButtons = (props: Props) => {
  return (
    <div className="message">
    <button
      className={`${props.hasStarted || props.over ? "invis" : ""}`}
      onClick={props.startFunc}
    >
      Start
    </button>
    <button
      className={`${props.hasStarted && !props.over ? "" : "invis"}`}
      disabled={props.over}
      onClick={props.hitFunc}
    >
      Hit
    </button>
    <button
      className={`${props.hasStarted && !props.over ? "" : "invis"}`}
      disabled={props.over}
      onClick={props.standFunc}
    >
      Stand
    </button>
    <button
      className={`${props.over ? "" : "invis"}`}
      onClick={props.restartFunc}
    >
      Next
    </button>
    <br />
    </div>
  );
};

export default GameButtons;
