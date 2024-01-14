import logo from './logo.svg';
import './App.css';
import Hand from './components/Hand';
import Message from './components/Message';
import {Deck, drawCard, createDecks, calcHand} from './Functions';
import {useState} from 'react';

let curDeck: Deck;

function App() {
  const [dealerHand, setDealerHand] = useState([[13,0]]);
  const [playerHand, setPlayerHand] = useState([[13,0]]);
  const [dealerEvent, setDealerEvent] = useState('');
  const [playerEvent, setPlayerEvent] = useState('');
  const [started, setStarted] = useState(false);
  const [playerOver, setPlayerOver] = useState(false);

  let hiddenCard: number[]; // Dealer's first card
  let cutoff = 0.5; // Decimal fraction of when to shuffle deck

  const startRound = () => {
    curDeck = createDecks(1);
    firstDeal();
    setStarted(true);
  }

  const restartRound = () => {
    if(curDeck.numCards <= 52*cutoff) {
      curDeck = createDecks(1);
    }
    firstDeal();
    setPlayerOver(false);
  }

  const firstDeal = () => {
    let deal = [drawCard(curDeck), drawCard(curDeck), drawCard(curDeck), drawCard(curDeck)];
    setPlayerHand([deal[0]]);
    hiddenCard = deal[1]; // Store hidden card in variable
    setPlayerHand([deal[0], deal[2]]);
    setDealerHand([[13,0],deal[3]]); // [13,0] is 'X', the hidden card
    setDealerEvent('playing');
    // alert([...playerHand[0],...playerHand[1]]);
    // alert([...dealerHand[0],...dealerHand[1]]);
  }

  const doHit = () => {
    alert(JSON.stringify(curDeck));
    let drawn = drawCard(curDeck);
    if(calcHand([...playerHand, drawn]) > 21) {
      setPlayerEvent('Bust!');
      setPlayerOver(true);
    }
    setPlayerHand([
      ...playerHand,
      drawn
    ]);
  }
  
  const doStand = () => {
    setPlayerOver(true);
  }

  return (
    <div className="App">
      <div className="title">
        Blackjack
      </div>
      <div className="game-area">
        <hr/>
        <Hand name="Dealer's" cards={dealerHand}/>
        <Message name="Dealer" event={dealerEvent}/>
        <hr/>
        <Hand name="Your" cards={playerHand}/>
        <Message name="Player" event={playerEvent}/>
        <div className="buttons">
          <button className={`${(started || playerOver) ? "start invis" : "start"}`} onClick={startRound}>Start</button>
          <button className={`${(started && !playerOver) ? "hit" : "hit invis"}`} onClick={doHit}>Hit</button>
          <button className={`${(started && !playerOver) ? "stand" : "stand invis"}`} onClick={doStand}>Stand</button>
          <button className={`${playerOver ? "restart" : "restart invis"}`} onClick={restartRound}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
