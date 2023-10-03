const mainScreen = document.querySelector('.main-screen');
const gameScreen = document.querySelector('.game-screen');
const gameElement = document.querySelector('.game__grid');

const ROWS = 10;
const COLS = 10;
let cells = [];

let gameField = [];

function generateGameGrid() {
  gameElement.innerHTML = '';

  for (let i = 0; i < ROWS; i++) {
    gameField.push([]);
    for (let j = 0; j < COLS; j++) {
      const currentCell = generateCell(i, j);
      gameElement.append(currentCell);
      cells.push(currentCell);
      gameField[i].push(0);
    }
  }
}

function generateCell(row, col) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-row', row);
  cell.setAttribute('data-col', col);
  return cell;
}

function startNewGame() {
  generateGameGrid();
  mainScreen.style.display = 'none';
  gameScreen.classList.remove('hidden');
}

function restartGame() {
  gameField = [];
  cells = [];

  generateGameGrid();
}

export { startNewGame, gameField, restartGame };
