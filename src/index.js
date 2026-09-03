import "./css/style.css";

import BoardGoblin from "./js/app.js";

// eslint-disable-next-line prettier/prettier
document.addEventListener('DOMContentLoaded', () => {
  const game = new BoardGoblin(4);
  game.init();

  // Перемещаем гоблина каждые 1000 мс
  setInterval(() => {
    game.moveGoblin();
  }, 1000);
});
