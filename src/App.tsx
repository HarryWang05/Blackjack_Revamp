import logo from "./logo.svg";
import "./App.css";
import Hand from "./components/Hand";
import Message from "./components/Message";
import { Deck, drawCard, createDecks, calcHand, isBust } from "./Functions";
import { useState } from "react";

let curDeck: Deck;
let hiddenCard: number[]; // Dealer's first card

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
  let cutoff = 0.5; // Decimal fraction of when to shuffle deck

  const startRound = () => {
    curDeck = createDecks(1);
    firstDeal();
    setStarted(true);
  };

  const restartRound = () => {
    if (curDeck.numCards <= 52 * cutoff) {
      curDeck = createDecks(1);
    }
    firstDeal();
    setRoundOver(false);
		setDealerEvent('');
		setPlayerEvent('');
  };

  const firstDeal = () => {
    let deal = [
      drawCard(curDeck),
      drawCard(curDeck),
      drawCard(curDeck),
      drawCard(curDeck),
    ];
    hiddenCard = deal[1].slice(); // Store hidden card in variable
		alert(JSON.stringify(hiddenCard) + "hiddenCardasdf");
    setPlayerHand([deal[0], deal[2]]);
    setDealerHand([[13, 0], deal[3]]); // [13,0] is 'X', the hidden card
    setDealerEvent("playing");
  };

  const doHit = () => {
    alert(JSON.stringify(curDeck));
    let drawn = drawCard(curDeck);
    if (isBust([...playerHand, drawn])) {
      setPlayerEvent("Bust!");
			startDealer(true); // Player bust true
    }
    setPlayerHand([...playerHand, drawn]);
  };

  const doStand = () => {
    setRoundOver(true);
		startDealer(false); // Player bust false
  };

	const startDealer = (isPlayerBust: Boolean) => {
		alert("reached startDealer");
		let tempHand = JSON.parse(JSON.stringify(dealerHand)); // Temp hand to store dealer hand
		tempHand[0] = hiddenCard; // Reveal hidden card
		if(isPlayerBust) {
			dealerWin();
		} else {
			while(calcHand(tempHand) < 17) {
				tempHand.push(drawCard(curDeck));
			}
			if(isBust(tempHand)) {
				setDealerEvent("bust!");
				playerWin();
			} else if(calcHand(tempHand) < calcHand(playerHand)) {
				playerWin();
			} else if(calcHand(tempHand) > calcHand(playerHand)) {
				dealerWin();
			} else {
				tie();
			}
		}
		setDealerHand(tempHand);
	}

	const dealerWin = () => {
		alert("reached dealerWin");
		setDealerEvent("wins!");
		setRoundOver(true);
	}

	const playerWin = () => {
		setPlayerEvent("wins!");
		setRoundOver(true);
	}

	const tie = () => {
		setDealerEvent("ties!");
		setPlayerEvent("ties!");
		setRoundOver(true);
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
            className={`${started || roundOver ? "start invis" : "start"}`}
            onClick={startRound}
          >
            Start
          </button>
          <button
            className={`${started && !roundOver ? "hit" : "hit invis"}`}
            onClick={doHit}
          >
            Hit
          </button>
          <button
            className={`${started && !roundOver ? "stand" : "stand invis"}`}
            onClick={doStand}
          >
            Stand
          </button>
          <button
            className={`${roundOver ? "restart" : "restart invis"}`}
            onClick={restartRound}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
