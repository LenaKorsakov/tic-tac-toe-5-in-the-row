const mainScreen = document.querySelector('.main-screen');
const gameScreen = document.querySelector('.game-screen');

const gameElement = document.querySelector('.game__grid');
const startButton = document.querySelector('.btn-start');

const rows = 10;
const cols = 10;
let gameField = [];
console.log(gameField);
let cells = [];

startButton.addEventListener('click', handleStartButtonClick);

function generateGameGrid() {
  gameElement.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    gameField.push([]);
    for (let j = 0; j < cols; j++) {
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

function handleStartButtonClick() {
  generateGameGrid();
  mainScreen.style.display = 'none';
  gameScreen.classList.remove('hidden');
}
