import React from 'react';

export default class TTT extends React.Component {


  render(){
    let board = [0,1,2,3,4,5,6,7,8];
    return (
      <div>
        <div className="board">
          {board.map(idx => {
            return <div key={idx} onClick={() => this.props.select(idx)} className="cell">{this.props.gameState.board[idx]}</div>

          })}

        </div>
        <div className="message">{this.props.gameState.message}</div>
        {this.props.gameState.gameOver === true ? <div className="restart"><button onClick={this.props.restart}>Restart</button></div>:null}
      </div>
    )
  }

}
