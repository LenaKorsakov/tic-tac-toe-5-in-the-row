import { gameField, restartGame } from './start-game.js';
import {
  getBestNextMove,
  getMoveScore,
  LENGTH_TO_WIN,
} from './second-player-logic.js';
import { gameOverScreenText } from './util.js';

const gameOverModal = document.querySelector('.game-over-modal');
const restartGameButton = gameOverModal.querySelector('.btn');

restartGameButton.addEventListener('click', handleRestartButtonClick);

function handleRestartButtonClick() {
  gameOverModal.close();
  restartGame();
  document.querySelector('body').classList.remove('scroll-lock');
}

const X = 1;
const O = 2;

const FIRST_PLAYER_MARKER = X;
const SECOND_PLAYER_MARKER = O;

let isFirstPlayerMove = true;
let isFirstPlayerWon = false;

function handleGameGridClick(event) {
  const currentCell = event.target;
  const row = +currentCell.dataset.row;
  const col = +currentCell.dataset.col;

  if (isFirstPlayerMove) {
    firstPlayerMove(currentCell, row, col);

    // in case of odd number of rows/cols
    if (isGameFieldFull(gameField)) {
      showModal(gameOverScreenText.TIE);
    }

    if (!isFirstPlayerWon) {
      secondPlayerMove();
    }
  }
}

function firstPlayerMove(currentCell, row, col) {
  if (!gameField[row][col]) {
    gameField[row][col] = FIRST_PLAYER_MARKER;
    currentCell.classList.add('lamb');
    isFirstPlayerMove = false;
  } else {
    return;
  }

  const firstPlayerScore = getMoveScore(gameField, row, col);
  if (firstPlayerScore === LENGTH_TO_WIN) {
    showModal(gameOverScreenText.BELLA_WON);

    console.log('Game over. ' + 'Bella' + ' won!');
    isFirstPlayerWon = true;
    return;
  }
}

function secondPlayerMove() {
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
      showModal(gameOverScreenText.EDWARD_WON);

      console.log('Game over. ' + 'Edward' + ' won!');
      return;
    }

    isFirstPlayerMove = true;

    if (isGameFieldFull(gameField)) {
      showModal(gameOverScreenText.TIE);
    }
  }, 800);
}

function isGameFieldFull(gameField) {
  let gameArray = [];

  for (let row of gameField) {
    gameArray = [...gameArray, ...row];
  }

  return !gameArray.includes(0);
}

function showModal(text) {
  const title = document.querySelector('.modal__title');
  title.textContent = text;
  document.querySelector('body').classList.add('scroll-lock');
  gameOverModal.showModal();
}

export default handleGameGridClick;
