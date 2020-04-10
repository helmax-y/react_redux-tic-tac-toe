import React from 'react';
import { connect } from 'react-redux';
import { getSquares, getXIsNext, getWinner } from '../../store';
import { actionTypes } from '../../store';
import Square from '../Square';
import './board.scss';

class Board extends React.Component {

  componentDidUpdate({ squares }) {
    if (squares !== this.props.squares) {
      this.calculateWinner(this.props.squares);
    }
  }

  handleClick(i) {
    if (this.props.winner || this.props.squares[i]) return;

    this.props.setSquares(i);
  }

  calculateWinner(squares) {
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
        this.props.setWinner(squares[a]);
        return squares[a];
      }
    }

    return null;
  }

  render() {
    const winner = this.props.winner;
    let status;
    
    if (winner) {
      status = `${winner} is the winner`;
    } else if (this.props.squares.indexOf(null) === -1) {
      status = 'Draw!';
    } else {
      status = `Next player ${this.props.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="board">
        <div className="board__status">{status}</div>

        <div className="board__squares">
          {[...Array(9).keys()].map(i => (
            <Square 
              key={i}
              value={this.props.squares[i]}
              onClick={() => this.handleClick(i)}
            />
          ))}
          <div className="board__line board__line--horizontal n1"></div>
          <div className="board__line board__line--horizontal n2"></div>
          <div className="board__line board__line--vertical n1"></div>
          <div className="board__line board__line--vertical n2"></div>
        </div>

        <button 
          className="board__again"
          onClick={() => this.props.playAgain()}
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
  xIsNext: getXIsNext(state),
  winner: getWinner(state),
});

const mapDispatchToProps = dispatch => ({
  setSquares: i => dispatch({ type: actionTypes.SET_SQUARES, payload: i }),
  playAgain: () => dispatch({ type: actionTypes.PLAY_AGAIN }),
  setWinner: winner => dispatch({ type: actionTypes.SET_WINNER, payload: winner }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);