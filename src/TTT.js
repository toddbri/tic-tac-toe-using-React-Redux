import React from 'react';

export default class TTT extends React.Component {


  render(){
    let board = [0,1,2,3,4,5,6,7,8];
    console.log('tttwc: ' + this.props.gameState.winningCells);
    return (
      <div>
        <div className="scoreBoard"><div className="owins">O wins: {this.props.gameState.owins}</div><div className="xwins">X wins: {this.props.gameState.xwins}</div></div>
        <div className="board">
          {board.map(idx => {
            return <div key={idx} onClick={() => this.props.select(idx)} className={this.props.gameState.winningCells.indexOf(idx) != -1 ? "cell blink":"cell"}>{this.props.gameState.board[idx]}</div>

          })}

        </div>
        <div className="message">{this.props.gameState.message}</div>
        {this.props.gameState.gameOver === true ? <div className="restart"><button onClick={this.props.restart}>Play Again</button></div>:null}
      </div>
    )
  }

}
