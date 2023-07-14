export const darkModeHandle = () => {
  const htmlEl = document.documentElement;
  const modeSwitch = document.querySelector('#toggleDarkMode');

  if (localStorage.getItem('mode') === 'dark') {
    htmlEl.classList.add('dark');
    modeSwitch.checked = true;
  }

  modeSwitch.addEventListener('change', () => {
    htmlEl.classList.toggle('dark');

    if (htmlEl.classList.contains('dark')) {
      localStorage.setItem('mode', 'dark');
    } else {
      localStorage.setItem('mode', 'light');
    }
  });
};
