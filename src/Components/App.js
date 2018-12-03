import React, { Component } from 'react';
import uuid from 'uuid/v4';

import { DragDropContext } from 'react-beautiful-dnd';

import {
  getInitialState,
  calcPokerWinner,
  moveCardsBackToDeck,
  reorder, copy, move, remove,
} from '../utils';

import Layout from './Layout';
import Deck from './Deck';
import Player from './Player';
import Modal from './Modal';

import { Button, Footer } from '../Styles/Styled';

class App extends Component {
  state = getInitialState();

  onDragEnd = (result) => {
    const { source, destination } = result;
    const { players, deck } = this.state;

    // card from deck dropped outside the player's hand
    if (
      (!destination || destination.droppableId === 'DECK')
      && source.droppableId === 'DECK'
    ) {
      return;
    }

    // remove card from player's hand
    if (!destination && source.droppableId !== 'DECK') {
      const playerClone = players[source.droppableId];
      const playerCard = [];
      playerCard[0] = playerClone.cards[source.index];

      const newDeck = moveCardsBackToDeck(deck, playerCard);

      this.setState({
        deck: [...newDeck],
        players: {
          ...players,
          [source.droppableId]: {
            name: playerClone.name,
            cards: remove(
              playerClone.cards,
              source.index,
            ),
          },
        },
      });
    } else if (source.droppableId === 'DECK') { // card added to player's hand
      const newDeck = [...deck];
      newDeck[source.index].isTaken = true;

      this.setState({
        deck: [...newDeck],
        players: {
          ...players,
          [destination.droppableId]: {
            name: players[destination.droppableId].name,
            cards: copy(
              deck,
              players[destination.droppableId].cards,
              source,
              destination,
            ),
          },
        },
      });
    } else if (source.droppableId === destination.droppableId) { // card reordered in player's hand
      this.setState({
        players: {
          ...players,
          [destination.droppableId]: {
            name: players[source.droppableId].name,
            cards: reorder(
              players[source.droppableId].cards,
              source.index,
              destination.index,
            ),
          },
        },
      });
    } else { // card moved form one player's hand to antoher
      const newPlayers = move(
        players[source.droppableId],
        players[destination.droppableId],
        source,
        destination,
      );
      this.setState({
        players: {
          ...players,
          ...newPlayers,
        },
      });
    }
  };

  onDragStart = (draggingItem) => {
    this.setState({ draggingItem });
  };

  addNewPlayer = () => {
    const { players } = this.state;
    const numberOfPlayers = Object.keys(players).length;
    const name = `Player ${numberOfPlayers + 1}`;
    this.setState({
      players: {
        ...players,
        [uuid()]: {
          name,
          cards: [],
        },
      },
    });
  };

  deletePlayer = (id) => {
    const { players, deck } = this.state;
    const playersClone = players;
    const playerCards = playersClone[id].cards;

    const newDeck = moveCardsBackToDeck(deck, playerCards);

    delete playersClone[id];

    this.setState({
      deck: [...newDeck],
      players: {
        ...playersClone,
      },
    });
  };

  changePlayerName = (id, name) => {
    const { players } = this.state;
    this.setState({
      players: {
        ...players,
        [id]: {
          name,
          cards: [...players[id].cards],
        },
      },
    });
  };

  findWinner = () => {
    const { players } = this.state;
    const playersArray = Object.keys(players).map(key => players[key]);
    const result = calcPokerWinner(playersArray);

    this.setState({ winner: result.name }, () => this.openModal());
  };

  resetGame = () => {
    this.setState(getInitialState());
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    const {
      players, deck, isModalOpen, winner, draggingItem,
    } = this.state;

    const numberOfPlayers = Object.keys(players).length;
    const numberOfTakenCards = deck.filter(card => card.isTaken).length;

    const isAddBtnDisabled = numberOfPlayers >= 6;
    const isRemoveBtnDisabled = numberOfPlayers <= 2;
    const isWinnerBtnDisabled = (
      numberOfTakenCards % (numberOfPlayers * 5) !== 0 || numberOfTakenCards <= 0
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
        <Layout>

          <section>

            <Deck cards={deck} />

          </section>
          <section>

            <header>
              <h1>Players</h1>
            </header>

            {Object.keys(players).map(player => (
              <Player
                key={player}
                id={player}
                player={players[player]}
                deletePlayer={() => this.deletePlayer(player)}
                changePlayerName={this.changePlayerName}
                isRemoveBtnDisabled={isRemoveBtnDisabled}
                draggingFrom={draggingItem ? draggingItem.source.droppableId : ' '}
              />
            ))}

            <Footer>
              <Button onClick={this.addNewPlayer} disabled={isAddBtnDisabled} data-testid="add-player-btn">
                <span
                  role="img"
                  alt="woman raising hand"
                  aria-label="woman raising hand"
                >
                  🙋‍
                </span>
                Add new player
              </Button>
              <Button onClick={this.findWinner} disabled={isWinnerBtnDisabled}>
                <span role="img" alt="trophy" aria-label="trophy">
                  🏆
                </span>
                Find the winner
              </Button>
              <Button onClick={this.resetGame}>
                <span role="img" alt="restart" aria-label="restart">
                  🔄
                </span>
                Reset game
              </Button>
            </Footer>

            <Modal
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              resetGame={this.resetGame}
              winner={winner}
            />

          </section>
        </Layout>
      </DragDropContext>
    );
  }
}

export default App;
