const empty = 0;
const X = 1;
const O = 2;

const LENGTH_TO_WIN = 5;

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
const getNextPosition = (i, j, direction, fieldSize) => {
  const nextI = i + direction[0];
  const nextJ = j + direction[1];
  //borders
  if (nextI < 0 || nextJ < 0 || nextI >= fieldSize || nextJ >= fieldSize) {
    return undefined;
  }
  return [nextI, nextJ];
};

/**
 * @name emptyCellsAround
 * @function
 * @param {number[][]} field
 * @param {number} i
 * @param {number} j
 * @returns {number[][]}
 */
const emptyCellsAround = (field, i, j) => {
  let result = [];
  DIRECTIONS.forEach((directionPair) => {
    const [firstDirection, secondDirection] = directionPair;
    [firstDirection, secondDirection].forEach((direction) => {
      const nextPosition = nextPosition(i, j, direction, field.length);
      if (nextPosition && field[nextPosition[0]][nextPosition[1]] === empty) {
        result.push([i, j]);
      }
    });
  });
  return result;
};

const logField = (field) => {
  console.log('------');
  field.forEach((line) => {
    let line_str = line.join('');
    line_str = line_str
      .replaceAll('' + empty, ' ')
      .replaceAll('' + X, 'X')
      .replaceAll('' + O, 'O');
    console.log(
      line_str + '                                    ' + Math.random()
    );
  });
  console.log('------');
};

/**
 * count each move score
 * @name getMyScore
 * @function
 * @param {number[][]} field
 * @param {number} i
 * @param {number} j
 * @returns {number}
 */
const getMoveScore = (field, i, j) => {
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
            numberOfSpacesAfterPlayersLine += 1;
          }
          break;
        }
        lengthOfPlayersLine += 1;
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
      numberOfSpacesAfterPlayersLine == 2
    ) {
      numOfThreeLengthLinesWithSpaces += 1;
    }

    maxScore = Math.max(maxScore, score);
  });

  if (numOfThreeLengthLinesWithSpaces >= 2) {
    maxScore = Math.max(maxScore, LENGTH_TO_WIN - 0.5); //winning situation
  }
  return maxScore;
};

const notPlayersPosition = (me = X) => {
  if (me === X) {
    return O;
  }
  return X;
};

const hasNonEmptyNear = (i, j, fieldSize) => {
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
};

/**
 * return next move
 * @name getNextMove
 * @function
 * @param {number[][]} field
 * @returns {boolean}
 */
const getBestNextMove = (field, playerMarker = X, depth = 0, maxDepth = 3) => {
  const fieldSize = field.length;

  let allPossibleMoves = [];
  let isEmpty = true;

  for (i = 0; i < fieldSize; i++) {
    //TODO j???
    for (j = 0; j < fieldSize; j++) {
      if (field[i][j] !== empty) {
        isEmpty = false;
        continue;
      }

      if (!hasNonEmptyNear(i, j, fieldSize)) {
        continue;
      }

      allPossibleMoves.push([i, j]);
    }
  }

  //??????why
  if (isEmpty) {
    return [(fieldSize / 2) | 0, (fieldSize / 2) | 0];
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
        depth++,
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

  if (depth === 0) {
    console.log('Possible moves: ', allPossibleMoves.length);
    console.log('Max Score: ', maxMoveScore);
    console.log('Next Move: ', bestNextMove);
    console.log('Max opponent Score: ', minOpponentScore);
  }

  return bestNextMove;
};

export default { getBestNextMove };

// let FIELD = [
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
//   [
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//     empty,
//   ],
// ];

// let me = X;

// for (let p = 0; p <= 100; p++) {
//   move = getBestNextMove(FIELD, me, 0, 1);
//   if (!!move) {
//     FIELD[move[0]][move[1]] = me;
//     /// CHANGE DOM data-coord="0-0"
//     score = getMoveScore(FIELD, move[0], move[1]);
//     if (score == LENGTH_TO_WIN) {
//       console.log('Game over. ' + me + ' won!');
//       logField(FIELD);
//       break;
//     }
//     me = notPlayersPosition(me);
//   } else {
//     // tie
//     break;
//   }
//   logField(FIELD);
