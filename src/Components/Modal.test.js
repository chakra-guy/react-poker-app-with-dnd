import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

import { WinnerTitle } from '../Styles/Styled';

describe('<Modal />', () => {
  it('show modal when isOpen = true', () => {
    const props = {
      isModalOpen: true,
      closeModal: () => {},
      resetGame: () => {},
      winner: 'Test Player',
    };
    const wrapper = mount(<Modal {...props} />);

    expect(wrapper.find(Modal).exists()).toEqual(true);
    expect(wrapper.find(WinnerTitle).exists()).toEqual(true);
  });

  it('hide modal when isOpen = false', () => {
    const props = {
      isModalOpen: false,
      closeModal: () => {},
      resetGame: () => {},
      winner: 'Test Player',
    };
    const wrapper = mount(<Modal {...props} />);

    expect(wrapper.find(Modal).exists()).toEqual(true);
    expect(wrapper.find(WinnerTitle).exists()).toEqual(false);
  });
});
