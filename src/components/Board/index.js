import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSquares, getXIsNext, getWinner } from '../../store';
import { setSquares, playAgain, setWinner } from '../../store';

import Square from '../Square';
import './board.scss';

const Board = () => {
  const squares = useSelector(getSquares);
  const xIsNext = useSelector(getXIsNext);
  const winner = useSelector(getWinner);
  const dispatch = useDispatch();

  useEffect(() => {
    calculateWinner(squares);
  }, [squares]);

  const handleClick = i => {
    if (winner || squares[i]) return;

    dispatch(setSquares(i));
  }

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        dispatch(setWinner(squares[a]));
        return squares[a];
      }
    }

    return null;
  }

  let status;
  
  if (winner) {
    status = `${winner} is the winner`;
  } else if (squares.indexOf(null) === -1) {
    status = 'Draw!';
  } else {
    status = `Next player ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="board">
      <div className="board__status">{status}</div>

      <div className="board__squares">
        {[...Array(9).keys()].map(i => (
          <Square 
            key={i}
            value={squares[i]}
            onClick={() => handleClick(i)}
          />
        ))}
        <div className="board__line board__line--horizontal n1"></div>
        <div className="board__line board__line--horizontal n2"></div>
        <div className="board__line board__line--vertical n1"></div>
        <div className="board__line board__line--vertical n2"></div>
      </div>

      <button 
        className="board__again"
        onClick={() => dispatch(playAgain())}
      >
        Play Again
      </button>
    </div>
  );
};

export default Board;