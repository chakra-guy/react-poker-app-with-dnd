import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from './Card';


describe('<Card /> ', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const onDragEnd = () => { };
    const props = {
      index: 0,
      card: {
        id: '0',
        isTaken: false,
        selected: false,
        suit: 'D',
        value: 'A',
      },
    };

    ReactDOM.render(
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="TEST">
          {provided => (
            <div ref={provided.innerRef}>
              <Card {...props} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
