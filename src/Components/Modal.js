import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { Button, WinnerTitle } from '../Styles/Styled';

const modalStyles = {
  overlay: {
    background: 'transparent',
  },
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '2em 3em',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '6px',
    background: '#455cbd',
    boxShadow: '0 5px 13px 0 rgba(40, 44, 51, 0.64)',
    width: '380px',
    textAlign: 'center',
  },
};

ReactModal.setAppElement('body');

const Modal = ({
  isModalOpen, closeModal, resetGame, winner,
}) => (
  <ReactModal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    contentLabel="Winner announcement"
  >
    <WinnerTitle>
      <span role="img" alt="party popper" aria-label="party popper">
        🎉
      </span>
      {`${winner} won the game!`}
    </WinnerTitle>

    <Button onClick={closeModal}>
      <span role="img" alt="cross mark" aria-label="cross mark">
        ❌
      </span>
      Close
    </Button>
    <Button onClick={resetGame}>
      <span role="img" alt="restart" aria-label="restart">
        🔄
      </span>
      Restart Game
    </Button>

  </ReactModal>
);

export default Modal;

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired,
};
