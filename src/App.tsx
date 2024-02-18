import "./App.css";
import Hand from "./components/Hand";
import Message from "./components/Message";
import Modal from "./components/Modal";
import { Deck, drawCard, createDecks, calcHand, isBust, checkHandEvent, startDealer } from "./Functions";
import { useState } from "react";

let curDeck: Deck;
let realPlayer: number[][]; // Real player's hand for calc
let realDealer: number[][]; // Real dealer's hand for calc, includes hidden card
let hidden = true; // Whether or not to hide dealer's first card
let cutoff = 0.5; // Decimal fraction of when to shuffle deck
let numDecks = 1; // Number of decks in game

function App() {
  /*const [state, setState] = useState({
		dealerHand: [[13,0]],
		playerHand: [[13,0]],
		dealerEvent: "",
		playerEvent: "",
		started: false,
		playerOver: false
	});*/
  const [dealerHand, setDealerHand] = useState([[13, 0]]);
  const [playerHand, setPlayerHand] = useState([[13, 0]]);
  const [dealerEvent, setDealerEvent] = useState("");
  const [playerEvent, setPlayerEvent] = useState("");
  const [started, setStarted] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  const startRound = (): void => {
    curDeck = createDecks(1);
    firstDeal();
    setStarted(true);
  };

  const restartRound = (): void => {
    if (curDeck.numCards <= 52 * numDecks * cutoff) {
      curDeck = createDecks(numDecks);
      alert('Deck Shuffled!');
    }
    hidden = true;
    firstDeal();
    setRoundOver(false);
    setDealerEvent("");
    setPlayerEvent("");
  };

  const firstDeal = (): void => {
    let deal = [
      drawCard(curDeck),
      drawCard(curDeck),
      drawCard(curDeck),
      drawCard(curDeck),
    ];
    realPlayer = [deal[0], deal[2]];
    realDealer = [deal[1], deal[3]];
    updateHands();
  };

  const doHit = (): void => {
    // alert(JSON.stringify(curDeck));
    realPlayer.push(drawCard(curDeck));
    if (checkHandEvent(realPlayer) != "?!") {
      handleWinEvent();
    } else {
      updateHands();
    }
  };

  const doStand = (): void => {
    handleWinEvent();
  };

  const handleWinEvent = (): void => {
    let playerHandEvent = checkHandEvent(realPlayer);
    let dealerHandEvent = checkHandEvent(realDealer);
    dealerHandEvent = startDealer(realPlayer, realDealer, curDeck);
    if (playerHandEvent == "?!") {
      if (dealerHandEvent == "bust!" || dealerHandEvent == "lose!") {
        playerHandEvent = "win!";
      } else {
        playerHandEvent = "lose!";
      }
    }
    if (dealerHandEvent == "push!") {
      playerHandEvent = "push!";
    }
    hidden = false;
    setPlayerEvent(playerHandEvent);
    setDealerEvent(dealerHandEvent);
    updateHands();
    setRoundOver(true);
  };

  const updateHands = (): void => {
    setPlayerHand(realPlayer);
    if (hidden) {
      setDealerHand([realDealer[0], [13, 0]]); // [13,0] is 'X', the hidden card
    } else {
      setDealerHand(realDealer);
    }
  }

  return (
    <div className="App">
      <div className="title">Blackjack</div>
      <div className="game-area">
        <hr />
        <Hand name="Dealer's" cards={dealerHand} />
        <Message name="Dealer" event={dealerEvent} />
        <hr />
        <Hand name="Your" cards={playerHand} />
        <Message name="Player" event={playerEvent} />
        <div className="buttons">
          <button
            className={`${started || roundOver ? "invis" : ""}`}
            onClick={startRound}
          >
            Start
          </button>
          <button
            className={`${started && !roundOver ? "" : "invis"}`}
            onClick={doHit}
          >
            Hit
          </button>
          <button
            className={`${started && !roundOver ? "" : "invis"}`}
            onClick={doStand}
          >
            Stand
          </button>
          <button
            className={`${roundOver ? "" : "invis"}`}
            onClick={restartRound}
          >
            Next
          </button>
          <br />
          <button 
            className={`${settingModal ? "invis" : ""}`}
            onClick={() => setSettingModal(true)}
          >
            Settings
          </button>
          <Modal open={settingModal} onClose={() => setSettingModal(false)}>
            Settings coming soon!
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
