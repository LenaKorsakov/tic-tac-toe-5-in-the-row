const rulesText = [
  `- Edward, I want to be with you forever, to be by your side as a vampire`,
  `- Bella, I can't risk your life like that. I won't turn you into a vampire!`,
  `- I choose to become a vampire because my love for you is stronger than any obstacle. I'm ready, no matter what it takes.`,
  `- Well, how about a little game? If you can beat me at Tic Tac Toe, I'll make you a vampire.`,
];

const rulesItems = [
  `Objective: The objective of the game is to get five of your markers in a row, either horizontally, vertically, or diagonally.`,
  `Markers: Bella uses 'Lamb," Edward uses "Lion"`,
  `Turns: Players take turns placing their markers on the grid, starting with Bella.`,
  'Winning Condition: The first player to achieve a row of five markers wins the game. Be careful - Edward can read minds!',
  `Edward's Promise: If Bella wins the game and successfully gets five of her markers in a row, Edward will agree to her request to be turned into a vampire.`,
];

const mainURL = {
  BELLA: './img/bella-swan.png',
  EDWARD: './img/edward-cullen-twilight-png.png',
};

const gameOverScreenText = {
  TIE: `Well done, Bella. But I think I'll need to come up with something more challenging before I make such a life-altering decision. But you can try again!`,
  BELLA_WON: 'Bella is a vampire now!',
  EDWARD_WON: `I may have lost the game, but I haven't lost my determination to be with you, Edward. I'll find another way, no matter how long it takes.`,
};

const gameOverModalURL = {
  BELLA_WON: './img/bella-vampire.jpeg',
  EDWARD_WON: './img/bella-wedding.jpeg',
  TIE: '../img/edward-bella-sunny.jpeg',
};

const edwardQuotes = [
  'You really should stay away from me.',
  `I like the night. Without the dark, we'd never see the stars.`,
  'Bella, you are my life now.',
  `I don't have the strength to stay away from you anymore.`,
  'When you can live forever, what do you live for?',
  `Don't be self-conscious, if I could dream at all, it would be about you. And I'm not ashamed of it.`,
  'I may not be a human, but I am a man.',
  'You better hold on tight, spidermonkey',
  'Isabella Swan, I promise to love you every moment of forever.',
  `You're my only reason to stay alive if that's what I am.`,
  'Bella, you are like my personal brand of heroin.',
  'What if I’m not a superhero. What if I’m the bad guy?',
  'Do I dazzle you?',
];

const sound = {
  BELLA_LULLABY: new Audio('/music/CarterBurwell-BellasLullaby_.mp3'),
  CLICK_SOUND: new Audio('/music/click-sound.mp3'),
  BELLAS_MOVE: new Audio('/music/bellas-move.mp3'),
  EDWARDS_MOVE: new Audio('/music/edvard-move.mp3'),
  WOLF_SOUND: new Audio('/music/wolf-sound.mp3'),
};

const soundImage = {
  SOUND_ON: '/img/icon/icon-sound.png',
  SOUND_OFF: '/img/icon/icon-no-noise.png',
};

function randomEdwardQuote() {
  const index = Math.floor(Math.random() * edwardQuotes.length);

  return edwardQuotes[index];
}

export {
  rulesText,
  rulesItems,
  mainURL as URL,
  gameOverScreenText,
  gameOverModalURL,
  randomEdwardQuote,
  sound,
  soundImage,
};
