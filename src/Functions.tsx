export interface Deck {
  numCards: number;
  totalCards: number[][];
  simpleCards: number[]; // With no suits, for probability calculation
}

// Total cards value and suits in it's indices
// First dimension: 13 indices, one for each card value, with [0] = Aces ... [12] = Kings
// Second dimension: 4 indicies, one for each suit,  [0] = Spades, [1] = Hearts, [2] = Diamonds, [3] = Clubs
// E.g. deck.totalCards[6][1] is the number of 7 of Hearts in the shoe

const randomInt = (num: number): number => {
  return Math.ceil(Math.random() * num);
};

export const drawCard = (deck: Deck): number[] => {
  if (deck.numCards <= 0) {
    return [13, 0]; // Returns 'X' if there are no more cards in the deck
  }
  let pickedCard = randomInt(deck.numCards);
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      pickedCard -= deck.totalCards[i][j];
      if (pickedCard <= 0) {
        deck.numCards--;
        deck.totalCards[i][j]--;
        deck.simpleCards[i]--;
        return [i, j]; // returns [value,suit] (properties of card drawn)
      }
    }
  }
  return [13, 0];
};

export const createDecks = (num: number): Deck => {
  let deck: Deck = {
    numCards: num * 52,
    totalCards: Array(13).fill(0).map(() => Array(4).fill(0)),
    simpleCards: Array(13).fill(0)
  };
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      deck.totalCards[i][j] = num;
    }
    deck.simpleCards[i] += num * 4;
  }
  return deck;
};

export const calcHardTotal = (hand: number[][]): number => {
  let total = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i][0] == 13) {
      total += 0; // when 'X' add zero
    } else if (hand[i][0] > 9) {
      total += 10; // when face card
    } else {
      total += hand[i][0] + 1; // face value
    }
  }
  return total;
}

export const calcHand = (hand: number[][]): number => {
  let total = 0;
  total = calcHardTotal(hand);
  if (total < 12) {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i][0] == 0) {
        total += 10;
        break;
      }
    }
  } // check for soft total
  return total;
};

export const isSoftTotal = (hand: number[][]): boolean => {
  return (calcHand(hand) != calcHardTotal(hand));
}

export const isBust = (hand: number[][]): boolean => {
  return (calcHand(hand) > 21);
};

export const checkHandEvent = (hand: number[][]): string => {
  if(calcHand(hand) > 21) {
    return "bust!";
  } else if((hand.length == 2) && (hand[0][0] == 0 || hand[1][0] == 0) && (calcHand(hand) == 21)) {
    return "natural!";
  } else if(hand.length == 6) {
    return "six card Charlie!"
  }
  return "?!";
}

export const startDealer = (playerHand: number[][], dealerHand: number[][], deck: Deck): string => {
  let returnVal = "";
  if (checkHandEvent(playerHand) == "bust!") {
    returnVal = (checkHandEvent(dealerHand) == "natural!" ? "natural!" : "win!"); // Special case when player busts and dealer has a meaningless natural
  } else if (checkHandEvent(playerHand) == "six card Charlie!") {
    returnVal = "lose!";
  } else {
    while (calcHand(dealerHand) < 17) {
      dealerHand.push(drawCard(deck));
    }
    if (isBust(dealerHand)) {
      returnVal = "bust!";
    } else if (checkHandEvent(dealerHand) == "natural!" && checkHandEvent(playerHand) == "natural!") {
      returnVal = "push!";
    } else if (checkHandEvent(dealerHand) == "natural!") {
      returnVal = "natural!";
    } else if (calcHand(dealerHand) < calcHand(playerHand)) {
      returnVal = "lose!";
    } else if (calcHand(dealerHand) > calcHand(playerHand)) {
      returnVal = "win!";
    } else {
      returnVal = "push!";
    }
  }
  return returnVal;
};