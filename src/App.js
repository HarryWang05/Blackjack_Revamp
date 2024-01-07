import logo from './logo.svg';
import './App.css';
import Hand from './components/Hand';
// import {startRound} from './Functions';
import {useState} from 'react';

function App() {
  const [dealerHand, setDealerHand] = useState(['X']);
  const [playerHand, setPlayerHand] = useState(['X']);

  const startRound = () => {
    setDealerHand(['1','2']);
    setPlayerHand(['2','3']);
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
          <button className="start" onClick={startRound}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
