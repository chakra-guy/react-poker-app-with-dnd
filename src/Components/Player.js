import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';

import Card from './Card';

import {
  PlayerHand,
  Button,
  PlayerName,
  PlayerHeader,
  Placeholder,
} from '../Styles/Styled';

export default class Player extends Component {
  state = {
    name: this.props.player.name,
    inputIsDisabled: true,
  };

  handleInputChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleInputBlur = () => {
    const { player } = this.props;
    this.setState({
      name: player.name,
      inputIsDisabled: true,
    });
  };

  editName = () => {
    this.setState({ inputIsDisabled: false }, () => {
      this.nameInput.focus();
      this.nameInput.select();
    });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.saveNameChange();
    }
  };

  saveNameChange = () => {
    const { name } = this.state;
    const { changePlayerName, id } = this.props;

    changePlayerName(id, name);

    this.setState({ inputIsDisabled: true });
  };

  render() {
    const {
      id, isRemoveBtnDisabled, player, deletePlayer, draggingFrom,
    } = this.props;
    const { cards } = player;
    const { name, inputIsDisabled } = this.state;

    const isDropDisabled = id === draggingFrom ? false : cards.length >= 5;

    return (
      <section>
        <article>

          <PlayerHeader>
            <PlayerName
              type="text"
              autoComplete="off"
              value={name}
              name="name"
              disabled={inputIsDisabled}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              ref={(input) => { this.nameInput = input; }}
            />
            {!inputIsDisabled && (
              <Button onMouseDown={this.saveNameChange}>
                <span role="img" alt="floppy disk" aria-label="floppy disk">
                  💾
                </span>
                Save
              </Button>
            )}
            <Button onClick={this.editName} disabled={!inputIsDisabled}>
              <span role="img" alt="pencil" aria-label="pencil">
                ✏️
              </span>
              Edit
            </Button>
            <Button onClick={deletePlayer} disabled={isRemoveBtnDisabled}>
              <span role="img" alt="flame" aria-label="flame">
                🔥
              </span>
              Remove
            </Button>
          </PlayerHeader>

          <Droppable
            droppableId={id}
            direction="horizontal"
            isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <PlayerHand
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                isDropDisabled={isDropDisabled}
              >
                {cards.length
                  ? cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))
                  : !provided.placeholder && (
                    <Placeholder>Drop cards here</Placeholder>
                  )}
                {provided.placeholder}
              </PlayerHand>
            )}
          </Droppable>

        </article>
      </section>
    );
  }
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
  player: PropTypes.shape({
    cards: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isRemoveBtnDisabled: PropTypes.bool.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  changePlayerName: PropTypes.func.isRequired,
  draggingFrom: PropTypes.string.isRequired,
};
