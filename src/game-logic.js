import { gameField } from './start-game.js';

const FIRST_PLAYER_SIGN = 'X';

function handleGameGridClick(event) {
  console.log(event.target);
  const currentCell = event.target;
  currentCell.classList.add('lamb');
  const row = currentCell.dataset.row;
  const col = currentCell.dataset.col;

  gameField[row][col] = FIRST_PLAYER_SIGN;

  //Second Player move(using minMax)

  //Check if someone win ? show end screen

  // check if it was a last cell in the grid ? show end screen
}

export default handleGameGridClick;
