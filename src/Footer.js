import React from 'react';

const Footer = ({ onNewGameClick,onSuggestClick }) => {
  return (
    <div className='footer'>
      <button onClick={onNewGameClick}>New Game</button>
      <button  onClick={onSuggestClick}>Suggest</button>
    </div>
  );
};

export default Footer;
