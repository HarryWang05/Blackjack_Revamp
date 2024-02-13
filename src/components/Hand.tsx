import { calcHand, isSoftTotal, calcHardTotal } from "../Functions";

interface Props {
  name: string;
  cards: number[][];
}

let cardStrings: string[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "X",
]; // index 13 'X' is used for when a placeholder is desired rather than an actual card

const Hand = (props: Props) => {
  let charHand: string[] = [];
  for (let i = 0; i < props.cards.length; i++) {
    charHand.push(cardStrings[props.cards[i][0]]); // Change each card from hand from int to char
  }
  return (
    <div className="hand">
      {props.name} Hand ({isSoftTotal(props.cards) ? calcHand(props.cards) + " or " + calcHardTotal(props.cards) : calcHand(props.cards)})
      <br />
      {charHand.map((it, index) => (
        <span key={index}>{it + " "}</span>
      ))}
    </div>
  );
};

export default Hand;
