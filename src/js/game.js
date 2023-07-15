import { WORDS, KEYBOARD_LETTERS } from './consts';

const gameDiv = document.querySelector('#game');

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

export const startGame = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);
  gameDiv.innerHTML = createPlaceholdersHTML();
};

console.log(KEYBOARD_LETTERS);
