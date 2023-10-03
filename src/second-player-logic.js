const empty = 0;
const X = 1;
const O = 2;

const LENGTH_TO_WIN = 5;
const INITIAL_DEPTH = 0;
const MAX_DEPTH = 3;

const DIRECTIONS = [
  [
    [1, 0],
    [-1, 0],
  ],
  [
    [0, 1],
    [0, -1],
  ],
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [1, -1],
    [-1, 1],
  ],
];
/**
 * return next position
 * @name getNextPosition
 * @function
 * @param {[number, number]} direction
 * @param {number} i
 * @param {number} j
 * @returns {[number, number]}
 */
function getNextPosition(i, j, direction, fieldSize) {
  const nextI = i + direction[0];
  const nextJ = j + direction[1];
  //borders
  if (nextI < 0 || nextJ < 0 || nextI >= fieldSize || nextJ >= fieldSize) {
    return undefined;
  }
  return [nextI, nextJ];
}

/**
 * count each move score
 * @name getMyScore
 * @function
 * @param {number[][]} field
 * @param {number} i
 * @param {number} j
 * @returns {number}
 */
function getMoveScore(field, i, j) {
  const playerPosition = field[i][j];

  let maxScore = 0;
  let numOfThreeLengthLinesWithSpaces = 0;

  DIRECTIONS.forEach((directionsPair) => {
    let lengthOfPlayersLine = 1;
    let numberOfSpacesAfterPlayersLine = 0;
    const [firstDirectionsPair, secondDirectionsPair] = directionsPair;

    [firstDirectionsPair, secondDirectionsPair].forEach((direction) => {
      let coordI = i;
      let coordJ = j;

      while (true) {
        const nextPosition = getNextPosition(
          coordI,
          coordJ,
          direction,
          field.length
        );
        if (!nextPosition) {
          break;
        }
        const nextElement = field[nextPosition[0]][nextPosition[1]];
        if (nextElement !== playerPosition) {
          if (nextElement === empty) {
            numberOfSpacesAfterPlayersLine++;
          }
          break;
        }
        lengthOfPlayersLine++;
        coordI = nextPosition[0];
        coordJ = nextPosition[1];
      }
    });

    if (lengthOfPlayersLine > LENGTH_TO_WIN) {
      lengthOfPlayersLine = LENGTH_TO_WIN;
    }

    let score = lengthOfPlayersLine;
    if (
      lengthOfPlayersLine < LENGTH_TO_WIN &&
      numberOfSpacesAfterPlayersLine === 0
    ) {
      score = 0;
    } else if (
      lengthOfPlayersLine < LENGTH_TO_WIN &&
      numberOfSpacesAfterPlayersLine === 2
    ) {
      score += 0.5;
    } else if (
      lengthOfPlayersLine < LENGTH_TO_WIN &&
      numberOfSpacesAfterPlayersLine === 1
    ) {
      score += 0.25;
    }

    if (
      lengthOfPlayersLine === LENGTH_TO_WIN - 2 &&
      numberOfSpacesAfterPlayersLine === 2
    ) {
      numOfThreeLengthLinesWithSpaces += 1;
    }

    maxScore = Math.max(maxScore, score);
  });

  if (numOfThreeLengthLinesWithSpaces >= 2) {
    maxScore = Math.max(maxScore, LENGTH_TO_WIN - 0.5); //winning situation
  }
  return maxScore;
}

function notPlayersPosition(me = О) {
  if (me === X) {
    return O;
  }
  return X;
}

function hasNonEmptyCellsNear(i, j, field) {
  const fieldSize = field.length;

  let isEmptyCellsNear = false;

  DIRECTIONS.forEach((directionsPairs) => {
    [directionsPairs[0], directionsPairs[1]].forEach((direction) => {
      const nextPosition = getNextPosition(i, j, direction, fieldSize);
      if (nextPosition && field[nextPosition[0]][nextPosition[1]] !== empty) {
        isEmptyCellsNear = true;
      }
    });
  });

  return isEmptyCellsNear;
}

/**
 * return next move
 * @name getNextMove
 * @function
 * @param {number[][]} field
 * @returns {[number, number]}
 */
function getBestNextMove(
  field,
  playerMarker = X,
  depth = INITIAL_DEPTH,
  maxDepth = MAX_DEPTH
) {
  const fieldSize = field.length;

  let allPossibleMoves = [];
  let isFieldEmpty = true;

  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== empty) {
        isFieldEmpty = false;
        continue;
      }

      if (!hasNonEmptyCellsNear(i, j, field)) {
        continue;
      }

      allPossibleMoves.push([i, j]);
    }
  }

  //in case of first move
  if (isFieldEmpty) {
    return [Math.floor(fieldSize / 2) | 0, Math.floor(fieldSize / 2) | 0];
  }

  let bestNextMove = undefined;
  let maxMoveScore = -Infinity;
  let minOpponentScore = +Infinity;

  allPossibleMoves.forEach((possibleMove) => {
    if (maxMoveScore === LENGTH_TO_WIN) {
      return;
    }

    field[possibleMove[0]][possibleMove[1]] = playerMarker;

    let score = getMoveScore(field, possibleMove[0], possibleMove[1]);
    if (score === LENGTH_TO_WIN) {
      field[possibleMove[0]][possibleMove[1]] = empty;
      bestNextMove = possibleMove;
      maxMoveScore = score;
      return;
    }

    let opponentMoveScore = 0;
    let bestOpponentMove = undefined;

    if (depth < maxDepth) {
      bestOpponentMove = getBestNextMove(
        field,
        notPlayersPosition(playerMarker),
        depth + 1,
        maxDepth
      );

      if (bestOpponentMove) {
        field[bestOpponentMove[0]][bestOpponentMove[1]] =
          notPlayersPosition(playerMarker);
        opponentMoveScore = getMoveScore(
          field,
          bestOpponentMove[0],
          bestOpponentMove[1]
        );
        field[bestOpponentMove[0]][bestOpponentMove[1]] = empty;

        if (opponentMoveScore == LENGTH_TO_WIN) {
          score = 0.1;
        } else if (
          opponentMoveScore >= LENGTH_TO_WIN - 0.55 &&
          score < LENGTH_TO_WIN - 1
        ) {
          score = 0.1;
        }
      }
    }

    if (score > maxMoveScore) {
      maxMoveScore = score;
      minOpponentScore = opponentMoveScore;
      bestNextMove = possibleMove;
    } else if (score === maxMoveScore) {
      if (opponentMoveScore < minOpponentScore) {
        minOpponentScore = opponentMoveScore;
        bestNextMove = possibleMove;
      }
    }

    field[possibleMove[0]][possibleMove[1]] = empty;
  });

  return bestNextMove;
}

export { getBestNextMove, getMoveScore, LENGTH_TO_WIN };
