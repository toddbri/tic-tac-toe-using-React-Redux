import React from 'react';
import ReactDOM from 'react-dom';
import TTT from './TTT';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import tttReducer from './TTT.reducer';

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

function reducer (state = INITIAL_STATE, action){
    return {
      gameState: tttReducer(state.gameState, action)
    }
}

const TTTContainer = ReactRedux.connect(
  state => ({gameState: state.gameState}),
  dispatch => ({
      select : (idx) => dispatch({
                                  type : 'move',
                                  cell : idx
                                }),
      restart: () => dispatch({type: 'restart'})
  })
)(TTT);



const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
      <div className="boardContainer">
       <div className="title">Tic-Tac-Toe using React/Redux</div>
       <TTTContainer />
      </div>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
