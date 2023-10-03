import { gameField } from './start-game.js';
import getBestNextMove from './second-player-logic.js';

const FIRST_PLAYER_MARKER = 1;

function handleGameGridClick(event) {
  console.log(event.target);
  const currentCell = event.target;
  currentCell.classList.add('lamb');
  const row = currentCell.dataset.row;
  const col = currentCell.dataset.col;

  gameField[row][col] = FIRST_PLAYER_MARKER;

  //Second Player move(using minMax)

  //Check if someone win ? show end screen

  // check if it was a last cell in the grid ? show end screen
}

export default handleGameGridClick;
