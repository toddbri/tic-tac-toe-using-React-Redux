export default function tttReducer(state, action){
  const INITIAL_STATE = {
    gameState: {
      board: [null,null,null,null,null,null,null,null,null],
      currentPlayer: 'X',
      message: "Player X's Turn",
      gameOver: false
    }

  };

  if (state.gameOver === false){
      switch (action.type) {
        case ('move'):
          let newMessage;
          let gameFinished = false;
          console.log("selected: " + action.cell);
          if (state.board[action.cell] === null){
            let tmpBoard = state.board.slice();
            tmpBoard[action.cell] = state.currentPlayer;
            let winner = check4Winner(tmpBoard);
            if (winner != 0){
              newMessage = state.currentPlayer + " has won";
              gameFinished = true;
              return Object.assign({},state,{board: tmpBoard, message: newMessage, gameOver: gameFinished});
            }
            let cellsTaken = tmpBoard.reduce( (accum, item ) => {
              console.log("item "+item);
              return accum + (item === null ? 0 : 1)}, 0 );

            console.log("cellsTaken "+cellsTaken);
            if(cellsTaken === 9){
              newMessage = "Too Bad! AWFUL JOB BOTH OF YOU";
              gameFinished = true;
              return Object.assign({},state,{board: tmpBoard, message: newMessage, gameOver: gameFinished});
            }
            let nextPlayer = state.currentPlayer === "X"? 'O': 'X';
            newMessage = nextPlayer === "X"? "Player X's Turn": "Player O's Turn";
            return Object.assign({},state,{board: tmpBoard, currentPlayer: nextPlayer, message: newMessage});
          }
        }

  }
  if (action.type==='restart'){
    console.log("restarting");
    return INITIAL_STATE.gameState;
  }
  return state;



  function check4Winner(pastMoves){

      let winner = 0;
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[1] && pastMoves[0]===pastMoves[2]){
        winner = pastMoves[0];

      }
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[4] && pastMoves[0]===pastMoves[8]){
        winner = pastMoves[0];
      }
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[3] && pastMoves[0]===pastMoves[6]){
        winner = pastMoves[0];
      }

      if (pastMoves[3]!==null && pastMoves[3]===pastMoves[4] && pastMoves[3]===pastMoves[5]){
        winner = pastMoves[3];
      }
      if (pastMoves[6]!==null && pastMoves[6]===pastMoves[7] && pastMoves[6]===pastMoves[8]){
        winner = pastMoves[6];
      }
      if (pastMoves[1]!==null && pastMoves[1]===pastMoves[4] && pastMoves[1]===pastMoves[7]){
        winner = pastMoves[1];
      }
      if (pastMoves[2]!==null && pastMoves[2]===pastMoves[5] && pastMoves[2]===pastMoves[8]){
        winner = pastMoves[2];
      }
      if (pastMoves[2]!==null && pastMoves[2]===pastMoves[4] && pastMoves[2]===pastMoves[6]){
        winner = pastMoves[2];
      }
      return winner
    }
}
