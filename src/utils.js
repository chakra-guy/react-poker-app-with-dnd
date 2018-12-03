import uuid from 'uuid/v4';
import poker from 'poker-hands';

export const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['D', 'H', 'S', 'C'];

export const getColourForSuit = suit => (suit === 'D' || suit === 'H' ? 'red' : 'black');

const formatPlayerHand = player => player.cards.map(card => `${card.value}${card.suit}`).join(' ');

export const getInitialState = () => {
  const generatedDeck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      generatedDeck.push({
        id: uuid(),
        isTaken: false,
        suit,
        value,
      });
    });
  });

  const initialState = {
    isModalOpen: false,
    winner: '',
    draggingItem: '',
    deck: [...generatedDeck],
    players: {
      [uuid()]: {
        name: 'Player 1',
        cards: [],
      },
      [uuid()]: {
        name: 'Player 2',
        cards: [],
      },
    },
  };

  return initialState;
};

export const calcPokerWinner = (array) => {
  const player = array.shift();

  if (array.length === 0) {
    return player;
  }
  const otherPlayer = calcPokerWinner(array);

  if (poker.judgeWinner([formatPlayerHand(player), formatPlayerHand(otherPlayer)]) === 0) {
    return player;
  }
  return otherPlayer;
};

export const reorder = (cards, startIndex, endIndex) => {
  const result = Array.from(cards).map(card => ({ ...card, selected: false }));

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  result[endIndex].selected = true;

  return result;
};

export const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination).map(card => ({ ...card, selected: false }));
  const card = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, {
    ...card,
    id: uuid(),
    isTaken: false,
    selected: true,
  });
  return destClone;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourcePlayerCards = Array.from(source.cards);
  const destPlayerCards = Array.from(destination.cards).map(card => ({ ...card, selected: false }));

  const [removed] = sourcePlayerCards.splice(droppableSource.index, 1);
  destPlayerCards.splice(droppableDestination.index, 0, removed);
  destPlayerCards[droppableDestination.index].selected = true;

  const result = {
    [droppableSource.droppableId]: {
      name: source.name,
      cards: [...sourcePlayerCards],
    },
    [droppableDestination.droppableId]: {
      name: destination.name,
      cards: [...destPlayerCards],
    },
  };

  return result;
};

export const remove = (cards, removeIndex) => {
  const result = Array.from(cards);

  result.splice(removeIndex, 1);

  return result;
};

export const moveCardsBackToDeck = (deck, playerCards) => {
  const newDeck = Array.from(deck).map((card) => {
    const isSameCard = Array.from(playerCards).some((obj) => {
      const playerCard = `${obj.suit}${obj.value}`;
      const deckCard = `${card.suit}${card.value}`;

      return playerCard === deckCard;
    });

    return isSameCard ? ({ ...card, isTaken: false }) : card;
  });

  return newDeck;
};
