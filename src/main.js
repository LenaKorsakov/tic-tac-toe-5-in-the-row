import handleGameGridClick from './game-logic.js';
import { startNewGame } from './start-game.js';
import { rulesText, rulesItems, EDWARD_URL, BELLA_URL } from './util.js';

const mainScreenWrapperElement = document.querySelector(
  '.main-screen__wrapper'
);
const continueButton = document.querySelector('.btn-continue');
const rulesElement = document.querySelector('.main-screen_rule');
const playerImageElement = document.querySelector('.main-screen__wrapper img');
const gameElement = document.querySelector('.game__grid');

let counter = 1;

continueButton.addEventListener('click', handleContinueButton);
gameElement.addEventListener('click', handleGameGridClick);

function handleContinueButton() {
  rulesElement.textContent = rulesText[counter - 1];
  counter++;

  playerImageElement.src = counter % 2 ? EDWARD_URL : BELLA_URL;

  if (counter === 5) {
    mainScreenWrapperElement.innerHTML = '';

    const divElement = createRulesListElement();
    mainScreenWrapperElement.append(divElement);

    continueButton.textContent = 'How about a little game?';
  }

  if (counter === 6) {
    startNewGame();
    counter = 1;
  }
}

function createRulesListElement() {
  const rulesListElement = document.createElement('div');

  for (let item of rulesItems) {
    const ruleItemElement = document.createElement('p');
    ruleItemElement.textContent = item;
    ruleItemElement.classList.add('main-screen_rule');
    rulesListElement.insertAdjacentElement('beforeend', ruleItemElement);
  }
  return rulesListElement;
}
