import React from 'react';

const Square = ({ value, onClick }) => {

  return (
    <button 
      className="board__square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;