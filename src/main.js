import handleGameGridClick from './game-logic.js';
import { startNewGame } from './start-game.js';
import { rulesText, rulesItems, URL, sound, soundImage } from './util.js';

const mainScreenWrapperElement = document.querySelector(
  '.main-screen__wrapper'
);
const continueButton = document.querySelector('.btn-continue');
const rulesElement = document.querySelector('.main-screen_rule');
const playerImageElement = document.querySelector('.main-screen__wrapper img');
const gameElement = document.querySelector('.game__grid');

const imagesElements = document.querySelectorAll('.img__wrapper img');
const soundElement = document.querySelector('.img-sound img');
const wolfElements = document.querySelectorAll('.wolf__img');

let counter = 1;
let soundOn = true;

continueButton.addEventListener('click', handleContinueButton);
gameElement.addEventListener('click', handleGameGridClick);
soundElement.addEventListener('click', handleSoundElementClick);

imagesElements.forEach((element) => {
  element.addEventListener('mouseover', (event) => {
    event.target.classList.add('swinging');
  });

  element.addEventListener('mouseout', (event) => {
    event.target.classList.remove('swinging');
  });
});

wolfElements.forEach((element) => {
  element.addEventListener('mouseover', handleWolfElementClick);
});

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

function handleSoundElementClick() {
  soundOn = !soundOn;

  const music = sound.BELLA_LULLABY;
  music.loop = true;
  music.autoplay = true;

  if (soundOn) {
    soundElement.src = soundImage.SOUND_ON;
    music.pause();
  } else {
    soundElement.src = soundImage.SOUND_OFF;
    music.play();
  }
}

function handleWolfElementClick() {
  sound.WOLF_SOUND.play();
}
function handleContinueButton() {
  sound.CLICK_SOUND.play();

  rulesElement.textContent = rulesText[counter - 1];
  counter++;

  playerImageElement.src = counter % 2 ? URL.EDWARD : URL.BELLA;

  if (counter === 6) {
    mainScreenWrapperElement.innerHTML = '';

    const divElement = createRulesListElement();
    mainScreenWrapperElement.append(divElement);

    continueButton.textContent = 'How about a little game?';
  }

  if (counter === 7) {
    startNewGame();
    counter = 1;
  }
}
