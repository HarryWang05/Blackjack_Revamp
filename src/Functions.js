let baseCards = [];

let fourKinds = [];

for(let j = 0; j < 4; j++) {
    fourKinds.push(0);
} // fourKinds = [0, 0, 0, 0], one index for each suit
// [0] = Spades, [1] = Hearts, [2] = Diamonds, [3] = Clubs

for(let i = 0; i < 13; i++) {
    baseCards.push(fourKinds.slice());
} // 13 indices, one for each card value, with [0] = Aces ... [12] = Kings

const randomInt = (num) => {
    return Math.ceil(Math.random()*num);
}

export const drawCard = (deck) => {
    /*let newDeck = {
        numCards: deck.numCards,
        totalCards: deck.totalCards.slice()
    };*/
    let pickedCard = randomInt(deck.numCards);
    for(let i = 0; i < 13; i++) {
        for(let j = 0; j < 4; j++) {
            pickedCard -= deck.totalCards[i][j];
            if(pickedCard <= 0) {
                deck.numCards--;
                deck.totalCards[i][j]--;
                return [i, j]; // returns [value,suit] (properties of card drawn)
            }
        }
    }
}

export const createDecks = (num) => {
    let deck = {
        numCards: num*52,
        totalCards: baseCards.slice()
    };
    for(let i = 0; i < 13; i++) {
        for(let j = 0; j < 4; j++) {
            deck.totalCards[i][j] = num;
        }
    }
    return deck;
}