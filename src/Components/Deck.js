import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';

import Card from './Card';
import { CardHolder } from '../Styles/Styled';

const Deck = ({ cards }) => (
  <>
    <h1>Cards deck</h1>
    <Droppable droppableId="DECK" isDropDisabled>
      {(provided, snapshot) => (
        <CardHolder
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              copying
            />
          ))}
        </CardHolder>
      )}
    </Droppable>
  </>
);

export default Deck;

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isTaken: PropTypes.bool.isRequired,
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};
