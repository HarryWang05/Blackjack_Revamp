import logo from './logo.svg';
import './App.css';
import Hand from './components/Hand';
import {drawCard, createDecks} from './Functions';
import {useState} from 'react';

function App() {
  const [dealerHand, setDealerHand] = useState([[13,0]]);
  const [playerHand, setPlayerHand] = useState([[13,0]]);
  const [started, setStarted] = useState(false);

  let curDeck;

  const startRound = () => {
    curDeck = createDecks(1);
    let drawn = drawCard(curDeck);
    alert(JSON.stringify(curDeck));
    alert(drawn[0]);
    alert(drawn[1]);
    setDealerHand([[1,0],[2,0]]);
    setPlayerHand([drawn,[10,0]]);
  }

  return (
    <div className="App">
      <div className="title">
        Blackjack
      </div>
      <div className="game-area">
        <Hand name="Dealer's" cards={dealerHand}/>
        <Hand name="Your" cards={playerHand}/>
        <div className="buttons">
          <button className="start {" onClick={startRound}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
