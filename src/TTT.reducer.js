const INITIAL_STATE = {
  gameState: {
    board: [null,null,null,null,null,null,null,null,null],
    currentPlayer: 'X',
    message: "Player X's Turn",
    gameOver: false,
    xwins: 0,
    owins: 0,
    winningCells: []
  }

};

export default function tttReducer(state = INITIAL_STATE, action){


  if (state.gameOver === false){
      switch (action.type) {
        case 'move':
          let newMessage;
          let gameFinished = false;
          if (state.board[action.cell] === null){
            let tmpBoard = state.board.slice();
            tmpBoard[action.cell] = state.currentPlayer;
            let winner = check4Winner(tmpBoard);
            if (winner[0] !== 0){
              let tmpxwins = winner[0] === 'X' ? state.xwins + 1: state.xwins;
              let tmpowins = winner[0] === 'O' ? state.owins + 1: state.owins;
              newMessage = state.currentPlayer + " has won";
              gameFinished = true;
              return Object.assign({},state,{board: tmpBoard, message: newMessage, gameOver: gameFinished, xwins: tmpxwins, owins: tmpowins, winningCells: winner[1]});
            }
            let cellsTaken = tmpBoard.reduce( (accum, item ) => {
              return accum + (item === null ? 0 : 1)}, 0 );

            if(cellsTaken === 9){
              newMessage = "It's a Draw";
              gameFinished = true;
              return Object.assign({},state,{board: tmpBoard, message: newMessage, gameOver: gameFinished});
            }
            let nextPlayer = state.currentPlayer === "X"? 'O': 'X';
            newMessage = nextPlayer === "X"? "Player X's Turn": "Player O's Turn";
            return Object.assign({},state,{board: tmpBoard, currentPlayer: nextPlayer, message: newMessage});
          }
          break;
        default:
          return Object.assign({}, state);
        }


  }
  if (action.type==='restart'){
    return Object.assign( {}, INITIAL_STATE.gameState,{xwins: state.xwins, owins: state.owins});
  }
  return state;



  function check4Winner(pastMoves){
      let winningCells = [];
      let winner = 0;
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[1] && pastMoves[0]===pastMoves[2]){
        winner = pastMoves[0];
        winningCells = winningCells.concat([0,1,2]);
      }
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[4] && pastMoves[0]===pastMoves[8]){
        winner = pastMoves[0];
        winningCells = winningCells.concat([0,4,8]);
      }
      if (pastMoves[0]!==null && pastMoves[0]===pastMoves[3] && pastMoves[0]===pastMoves[6]){
        winner = pastMoves[0];
        winningCells = winningCells.concat([0,3,6]);
      }

      if (pastMoves[3]!==null && pastMoves[3]===pastMoves[4] && pastMoves[3]===pastMoves[5]){
        winner = pastMoves[3];
        winningCells = winningCells.concat([3,4,5]);
      }
      if (pastMoves[6]!==null && pastMoves[6]===pastMoves[7] && pastMoves[6]===pastMoves[8]){
        winner = pastMoves[6];
        winningCells = winningCells.concat([6,7,8]);
      }
      if (pastMoves[1]!==null && pastMoves[1]===pastMoves[4] && pastMoves[1]===pastMoves[7]){
        winner = pastMoves[1];
        winningCells = winningCells.concat([1,4,7]);
      }
      if (pastMoves[2]!==null && pastMoves[2]===pastMoves[5] && pastMoves[2]===pastMoves[8]){
        winner = pastMoves[2];
        winningCells = winningCells.concat([2,5,8]);
      }
      if (pastMoves[2]!==null && pastMoves[2]===pastMoves[4] && pastMoves[2]===pastMoves[6]){
        winner = pastMoves[2];
        winningCells = winningCells.concat([2,4,6]);
      }
      return [winner, winningCells];
    }
}
