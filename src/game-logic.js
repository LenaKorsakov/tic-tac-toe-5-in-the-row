import { gameField, restartGame } from './start-game.js';
import {
  getBestNextMove,
  getMoveScore,
  LENGTH_TO_WIN,
} from './second-player-logic.js';
import {
  gameOverModalURL,
  gameOverScreenText,
  randomEdwardQuote,
} from './util.js';

const X = 1;
const O = 2;

const FIRST_PLAYER_MARKER = X;
const SECOND_PLAYER_MARKER = O;

let isFirstPlayerMove = true;
let isFirstPlayerWon = false;

const gameOverModal = document.querySelector('.game-over-modal');
const restartGameButton = gameOverModal.querySelector('.btn');
const edwardQuoteElement = document.querySelector('.edward__quote p');

restartGameButton.addEventListener('click', handleRestartButtonClick);
gameOverModal.addEventListener('click', handleBackDropClick);

function firstPlayerMove(currentCell, row, col) {
  if (gameField[row][col] === 0) {
    gameField[row][col] = FIRST_PLAYER_MARKER;
    currentCell.classList.add('lamb');
    isFirstPlayerMove = false;
  } else {
    return;
  }

  const firstPlayerScore = getMoveScore(gameField, row, col);
  if (firstPlayerScore === LENGTH_TO_WIN) {
    showModal(gameOverScreenText.BELLA_WON, gameOverModalURL.BELLA_WON);

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
      showModal(gameOverScreenText.EDWARD_WON, gameOverModalURL.EDWARD_WON);

      return;
    }

    isFirstPlayerMove = true;

    if (isGameFieldFull(gameField)) {
      showModal(gameOverScreenText.TIE, gameOverModalURL.TIE);
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

function showModal(text, url = gameOverModalURL.TIE) {
  const gameOverScreenImageElement = document.querySelector(
    '.game-over-modal__wrapper img'
  );
  const title = document.querySelector('.modal__title');

  title.textContent = text;
  gameOverScreenImageElement.src = url;
  document.querySelector('body').classList.add('scroll-lock');
  gameOverModal.showModal();
}

function resetGameField() {
  gameOverModal.close();
  restartGame();
  document.querySelector('body').classList.remove('scroll-lock');
  isFirstPlayerMove = true;
  isFirstPlayerWon = false;
}

function handleRestartButtonClick() {
  resetGameField();
}

function handleBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    dialogElement.close();
  }

  resetGameField();
}

function handleGameGridClick(event) {
  const currentCell = event.target;
  const row = +currentCell.dataset.row;
  const col = +currentCell.dataset.col;

  if (
    isFirstPlayerMove &&
    !currentCell.classList.contains('lamb') &&
    !currentCell.classList.contains('lion')
  ) {
    edwardQuoteElement.textContent = randomEdwardQuote();
    firstPlayerMove(currentCell, row, col);

    // in case of odd number of rows/cols
    if (isGameFieldFull(gameField)) {
      showModal(gameOverScreenText.TIE, gameOverModalURL.TIE);
    }

    if (!isFirstPlayerWon) {
      secondPlayerMove();
    }
  }
}

export default handleGameGridClick;
