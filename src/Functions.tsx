export interface Deck {
    numCards: number;
    totalCards: number[][];
}

let baseCards: number[][] = [];

let fourKinds: number[] = [];

for(let j = 0; j < 4; j++) {
    fourKinds.push(0);
} // fourKinds = [0, 0, 0, 0], one index for each suit
// [0] = Spades, [1] = Hearts, [2] = Diamonds, [3] = Clubs

for(let i = 0; i < 13; i++) {
    baseCards.push(fourKinds.slice());
} // 13 indices, one for each card value, with [0] = Aces ... [12] = Kings

const randomInt = (num: number) => {
    return Math.ceil(Math.random()*num);
}

export const drawCard = (deck: Deck) => {
    /*let newDeck = {
        numCards: deck.numCards,
        totalCards: deck.totalCards.slice()
    };*/
    if(deck.numCards <= 0) {
        return [13,0]; // Returns 'X' if there are no more cards in the deck
    }
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
    return [13,0];
}

export const createDecks = (num: number) => {
    let deck: Deck = {
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

export const calcHand = (hand: number[][]) => {
    let total = 0;
    for(let i = 0; i < hand.length; i++) {
        if(hand[i][0] > 9) {
            total += 10; // when face card
        } else {
            total += hand[i][0]+1; // face value
        }
    }
    return total;
}