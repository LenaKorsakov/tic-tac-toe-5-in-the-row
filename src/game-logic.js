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
  sound,
} from './util.js';

const X = 1;
const O = 2;

const FIRST_PLAYER_MARKER = X;
const SECOND_PLAYER_MARKER = O;

let isFirstPlayerMove = true;
let isFirstPlayerWon = false;

const gameOverModal = document.querySelector('.game-over-modal');
const restartGameButton = gameOverModal.querySelector('.btn');
const edwardImgElement = document.querySelector('.edward__wrapper img');

restartGameButton.addEventListener('click', handleRestartButtonClick);
gameOverModal.addEventListener('click', handleBackDropClick);
edwardImgElement.addEventListener('click', handleEdwardImgElementClick);

function firstPlayerMove(currentCell, row, col) {
  sound.BELLAS_MOVE.play();

  gameField[row][col] = FIRST_PLAYER_MARKER;
  currentCell.classList.add('lamb');
  isFirstPlayerMove = false;

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

    sound.EDWARDS_MOVE.play();
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

function changeEdwardQuote() {
  const edwardQuoteElement = document.querySelector('.edward__quote p');
  edwardQuoteElement.textContent = randomEdwardQuote();
}

function handleRestartButtonClick() {
  sound.CLICK_SOUND.play();
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

function handleEdwardImgElementClick() {
  sound.EDWARDS_MOVE.play();
  changeEdwardQuote();
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
    changeEdwardQuote();
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
