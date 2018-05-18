import React from 'react';
import PropTypes from 'prop-types';
import './NewButton.css';

const NewButton = ({startNewGame}) => (
  <h1 onClick={startNewGame}>
    New Game
  </h1>
);

NewButton.propTypes = {
  startNewGame: PropTypes.func.isRequired
};

export default NewButton;
