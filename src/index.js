import './style.css';
import {
  knightMoves,
  knightTravails,
  produceBoard,
} from './modules/knight-travails';

(() => {
  const boardUI = document.querySelector('.chess-board');
  const board = produceBoard(8, 8);

  const buildBoard = (theBoard, boardDiv) => {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const node = theBoard[i][j];
        const div = document.createElement('div');
        div.classList.add('cell');
        div.setAttribute('data-x', node.x);
        div.setAttribute('data-y', node.y);
        boardDiv.appendChild(div);
      }
    }
  };

  buildBoard(board, boardUI);
})();
