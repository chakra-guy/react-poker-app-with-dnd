import React from 'react';
import PropTypes from 'prop-types';

import { Draggable } from 'react-beautiful-dnd';

import { CardContent, CardContentClone } from '../Styles/Styled';

const Card = ({
  card, index, copying,
}) => (
  <Draggable
    draggableId={card.id}
    index={index}
    isDragDisabled={card.isTaken}
  >
    {(provided, snapshot) => (
      <>
        <CardContent
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          disabled={card.isTaken}
          suit={card.suit}
          value={card.value}
          selected={card.selected}
        >
          {card.value}
        </CardContent>

        {/* when the user is copy-dragging a card from the deck,
         this part below render's the "ghost card" */}
        {snapshot.isDragging && copying && (
          <CardContentClone suit={card.suit} value={card.value}>
            {card.value}
          </CardContentClone>
        )}
      </>
    )}
  </Draggable>
);

export default Card;

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isTaken: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    copying: PropTypes.bool,
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
