import { deflateRaw } from "zlib";
import { calcHand } from "../Functions";

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

const calcHit = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return calcHand(playerHand) != 21;
}

const calcStand = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return true;
}

const calcDoubleDown = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return (playerHand.length == 2) && (calcHand(playerHand) != 21);
}

const calcSplit = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return (playerHand.length == 2) && (playerHand[0][0] == playerHand[1][0]);
}

const calcInsurance = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return dealerHand[0][0] == 0;
}

const calcSurrender = (playerHand: number[][], dealerHand: number[][]): boolean => {
  return true;
}

const GameButtons = (props: Props) => {
  return (
    <div className="buttons">
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcDoubleDown(props.playerHand, props.dealerHand)}
        // onClick={props.hitFunc}
      >
        Double Down
      </button>
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcSplit(props.playerHand, props.dealerHand)}
        // onClick={props.hitFunc}
      >
        Split
      </button>
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcHit(props.playerHand, props.dealerHand)}
        onClick={props.hitFunc}
      >
        Hit
      </button>
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcStand(props.playerHand, props.dealerHand)}
        onClick={props.standFunc}
      >
        Stand
      </button>
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcInsurance(props.playerHand, props.dealerHand)}
        // onClick={props.hitFunc}
      >
        Insurance
      </button>
      <button
        // className={`${props.hasStarted && !props.over ? "" : "invis"}`}
        disabled={!props.hasStarted || props.over || !calcSurrender(props.playerHand, props.dealerHand)}
        // onClick={props.hitFunc}
      >
        Surrender
      </button>
      <br />
      {(() => {
        if (!props.hasStarted && !props.over) {
          return (
            <button
              className={`${props.hasStarted || props.over ? "invis" : ""}`}
              onClick={props.startFunc}
            >
              Start
            </button>);
        } else if (props.over) {
          return (
            <button
              className={`${props.over ? "" : "invis"}`}
              onClick={props.restartFunc}
            >
              Next
            </button>);
        } else {
          return (<br />);
        }
      })()}
    </div>
  );
};

export default GameButtons;
