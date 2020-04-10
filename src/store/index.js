import { createStore } from 'redux';

// action types

export const actionTypes = {
  SET_SQUARES: 'setSquares',
  SET_WINNER: 'setWinner',
  PLAY_AGAIN: 'playAgain',
};

// action creators

export const setSquares = i => ({ type: actionTypes.SET_SQUARES, payload: i });
export const playAgain = () => ({ type: actionTypes.PLAY_AGAIN });
export const setWinner = winner => ({ type: actionTypes.SET_WINNER, payload: winner });

// selectors

export const getSquares = state => state.squares;
export const getXIsNext = state => state.xIsNext;
export const getWinner = state => state.winner;

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SQUARES:
      return {
        ...state,
        squares: state.squares.map((value, index) => index === action.payload ? state.xIsNext ? 'X' : 'O' : value),
        xIsNext: !state.xIsNext,
      };

    case actionTypes.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };

    case actionTypes.PLAY_AGAIN:
      return {
        ...state,
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
      }

    default:
      return state;
  }
}

export default createStore(reducer, initialState);
