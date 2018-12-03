import React from 'react';
import { mount } from 'enzyme';

import { DragDropContext } from 'react-beautiful-dnd';
import Player from './Player';
import Card from './Card';


import { PlayerHand } from '../Styles/Styled';

describe('<Player />', () => {
  const onDragEnd = () => { };
  const props = {
    id: '0',
    player: {
      cards: [{
        id: '1',
        isTaken: false,
        selected: true,
        suit: 'C',
        value: '1',
      },
      {
        id: '2',
        isTaken: false,
        selected: false,
        suit: 'C',
        value: '2',
      },
      {
        id: '3',
        isTaken: false,
        selected: false,
        suit: 'C',
        value: '3',
      },
      {
        id: '4',
        isTaken: false,
        selected: false,
        suit: 'C',
        value: '5',
      },
      {
        id: '5',
        isTaken: false,
        selected: false,
        suit: 'C',
        value: '5',
      },
      ],
      name: 'Test Player 1',
    },
    isRemoveBtnDisabled: false,
    deletePlayer: () => {},
    changePlayerName: () => {},
    draggingFrom: '123',
  };

  it('renders without crashing', () => {
    const wrapper = mount(
      <DragDropContext onDragEnd={onDragEnd}>
        <Player {...props} />
      </DragDropContext>,
    );
    expect(wrapper.find(Card).exists()).toEqual(true);
  });

  it('drop is disabled when 5 cards are in hands', () => {
    const wrapper = mount(
      <DragDropContext onDragEnd={onDragEnd}>
        <Player {...props} />
      </DragDropContext>,
    );
    expect(wrapper.find(PlayerHand).prop('isDropDisabled')).toEqual(true);
  });
});
