import React from 'react';
import PropTypes from 'prop-types';
import './ColorBox.css'

const ColorBox = ({id, color, status, onBoxClick}) => {
  const style = {
    width: '120px',
    height: '120px',
    display: 'inline-block',
    backgroundColor: color,
    border: '2px solid #fff',
    margin: '2px'
  }
  return <div
            onClick={(e) => onBoxClick(e)}
            className={status}
            style={style}
            id={id}
          />
};

ColorBox.propTypes = {
  onBoxClick: PropTypes.func.isRequired
}

export default ColorBox;
