import { WORDS, KEYBOARD_LETTERS } from './consts';

const gameDiv = document.querySelector('#game');
const logoH1 = document.querySelector('#logo');

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem('word');
  const placeHoldersHTML = word
    .split('')
    .reduce(
      (acc, _, i) => acc + `<span id="letter_${i}" class="letter"> _ </span>`,
      ''
    );
  return `<div id="placeholders" class="placeholders-wrapper">${placeHoldersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
    );
  }, '');

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement('img');
  image.src = 'images/hg-0.png';
  image.alt = 'hangman image';
  image.classList.add('hangman-img');
  image.id = 'hangman-img';

  return image;
};

export const startGame = () => {
  logoH1.classList.add('logo-sm');
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML +=
    '<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>';

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener('click', (event) => {
    console.log(event.target.id);
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);
};
