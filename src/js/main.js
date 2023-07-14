import '../css/style.css';
import { darkModeHandle } from './utils';

darkModeHandle();

const startGameBtn = document.querySelector('#startGame');
startGameBtn.addEventListener('click', () => {
  console.log('Start game');
});
