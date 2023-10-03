import { gameField } from './start-game.js';
import {
  getBestNextMove,
  getMoveScore,
  LENGTH_TO_WIN,
} from './second-player-logic.js';

const X = 1;
const O = 2;

const FIRST_PLAYER_MARKER = X;
const SECOND_PLAYER_MARKER = O;

function isGameFieldFull(gameField) {
  let gameArray = [];

  for (let row of gameField) {
    gameArray = [...gameArray, ...row];
  }

  return !gameArray.includes(0);
}

function handleGameGridClick(event) {
  const currentCell = event.target;
  const row = +currentCell.dataset.row;
  const col = +currentCell.dataset.col;

  if (!gameField[row][col]) {
    gameField[row][col] = FIRST_PLAYER_MARKER;
    currentCell.classList.add('lamb');
  } else {
    return;
  }

  const firstPlayerScore = getMoveScore(gameField, row, col);
  if (firstPlayerScore === LENGTH_TO_WIN) {
    console.log('Game over. ' + 'Bella' + ' won!');
    return;
  }

  // in case of odd number of rows/cols
  // if (isGameFieldFull(gameField)) {
  //   console.log('show modal end of game');
  // }

  setTimeout(() => {
    const secondPlayerMove = getBestNextMove(gameField, SECOND_PLAYER_MARKER);

    const [coordI, coordJ] = secondPlayerMove;

    gameField[coordI][coordJ] = SECOND_PLAYER_MARKER;
    const secondPlayerElement = document.querySelector(
      `[data-row="${coordI}"][data-col="${coordJ}"]`
    );
    secondPlayerElement.classList.add('lion');

    const secondPlayerScore = getMoveScore(gameField, coordI, coordJ);
    if (secondPlayerScore === LENGTH_TO_WIN) {
      console.log('Game over. ' + 'Edward' + ' won!');
      return;
    }

    if (isGameFieldFull(gameField)) {
      console.log('show modal end of game');
    }
  }, 800);
}

export default handleGameGridClick;
