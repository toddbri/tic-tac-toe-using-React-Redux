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

exports.INITIAL_STATE = INITIAL_STATE;
