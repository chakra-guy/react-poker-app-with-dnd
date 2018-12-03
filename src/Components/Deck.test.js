import React from 'react';
import { mount } from 'enzyme';

import { DragDropContext } from 'react-beautiful-dnd';
import Deck from './Deck';
import Card from './Card';

import { getInitialState } from '../utils';

describe('<Deck />', () => {
  it('renders the right amount of cards', () => {
    const onDragEnd = () => { };

    const { deck } = getInitialState();
    const wrapper = mount(
      <DragDropContext onDragEnd={onDragEnd}>
        <Deck cards={deck} />
      </DragDropContext>,
    );
    expect(wrapper.find(Card)).toHaveLength(52);
  });
});
