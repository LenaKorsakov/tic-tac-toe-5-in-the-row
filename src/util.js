const rulesText = [
  `- Edward, I want to be with you forever, to be by your side as a vampire`,
  `- Bella, I can't risk your life like that. I won't turn you into a vampire!`,
  `- I choose to become a vampire because my love for you is stronger than any obstacle. I'm ready, no matter what it takes.`,
  `- Well, how about a little game? If you can beat me at Tic Tac Toe, I'll make you a vampire.`,
];

const rulesItems = [
  `Objective: The objective of the game is to get five of your markers in a row, either horizontally, vertically, or diagonally.`,
  `Markers: Bella uses "Lamb," Edward uses "Lion"`,
  `Turns: Players take turns placing their markers on the grid, starting with Bella.`,
  'Winning Condition: The first player to achieve a row of five markers wins the game. Be careful - Edward can read minds!',
  `Edward's Promise: If Bella wins the game and successfully gets five of her markers in a row, Edward will agree to her request to be turned into a vampire.`,
];

const URL = {
  BELLA: '../img/bella-swan.png',
  EDWARD: '../img/edward-cullen-twilight-png.png',
};

const gameOverScreenText = {
  TIE: `Well done, Bella. But I think I'll need to come up with something more challenging before I make such a life-altering decision. But you can try again!`,
  BELLA_WON: 'Bella is a vampire now!',
  EDWARD_WON: `I may have lost the game, but I haven't lost my determination to be with you, Edward. I'll find another way, no matter how long it takes.`,
};

export { rulesText, rulesItems, URL, gameOverScreenText };
