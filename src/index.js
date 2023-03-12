import './style.css';
import { knightMoves, produceBoard } from './modules/knight-travails';

(() => {
  const boardUI = document.querySelector('.chess-board');
  const outputPanel = document.querySelector('.output');
  const board = produceBoard(8, 8);
  let knightXY;
  let targetXY;

  // removes the knight if there any
  const removeKight = () => {
    const knightSpots = document.querySelectorAll('.knight');
    knightSpots.forEach((spot) => {
      // eslint-disable-next-line no-param-reassign
      spot.innerHTML = '';
    });
  };

  // main function when the user click the cell
  const findShortestPath = (e) => {
    const div = e.target;
    if (!document.querySelectorAll('.knight').length) {
      knightXY = div.getAttribute('id');
      div.classList.add('knight');
      div.innerHTML = '<i class="fa-solid fa-chess-knight"></i>';
    }
    if (!document.querySelectorAll('.target').length) {
      targetXY = div.getAttribute('id');
      if (knightXY === targetXY) {
        outputPanel.textContent = 'Please target cell';
      } else {
        div.classList.add('target');
        const result = knightMoves(
          [parseInt(knightXY[0], 10), parseInt(knightXY[1], 10)],
          [parseInt(targetXY[0], 10), parseInt(targetXY[1], 10)]
        );
        const { shortestMoves: moves, output } = result;
        outputPanel.innerHTML = output;
        for (let i = 0; i < moves.length; i += 1) {
          setTimeout(() => {
            const moveCell = document.getElementById(
              `${moves[i][0]}${moves[i][1]}`
            );
            removeKight();
            moveCell.classList.add('knight');
            moveCell.innerHTML = '<i class="fa-solid fa-chess-knight"></i>';
            moveCell.style.backgroundColor = '#c5f555';
          }, i * 500);
        }
      }
    }
  };

  // Build the chess board and add event listener for each cell
  const buildBoard = (theBoard, boardDiv) => {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const node = theBoard[i][j];
        const div = document.createElement('div');
        div.classList.add('cell');
        div.setAttribute('id', `${node.x}${node.y}`);
        div.addEventListener('click', findShortestPath);
        boardDiv.appendChild(div);
      }
    }
  };
  buildBoard(board, boardUI);

  // Refresh the page
  document.querySelector('button').addEventListener('click', () => {
    window.location.reload();
  });
})();
