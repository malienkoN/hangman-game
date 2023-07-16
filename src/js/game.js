import { WORDS, KEYBOARD_LETTERS } from './consts';

const gameDiv = document.querySelector('#game');
const logoH1 = document.querySelector('#logo');

let triesLeft;

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

const checkLetter = (letter) => {
  const word = sessionStorage.getItem('word');
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.querySelector('#tries-left');
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.querySelector('#hangman-img');
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;
  } else {
    const wordArray = word.split('');
    wordArray.forEach((currentLetter, index) => {
      if (currentLetter === inputLetter) {
        document.querySelector(`#letter_${index}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  triesLeft = 10;

  logoH1.classList.add('logo-sm');
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyboardDiv);
};
