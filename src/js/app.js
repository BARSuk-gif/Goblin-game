import goblinImage from "../img/goblin.png";

export default class BoardGoblin {
  constructor(size = 4) {
    this.size = size;
    this.container = document.querySelector("#grid");
    if (!this.container) {
      throw new Error("Контейнер #grid не найден");
    }
    this.cells = []; // массив всех ячеек (DOM-элементов)
    this.goblin = null; // сам img-элемент гоблина
    this.currentCell = null; // ячейка, в которой сейчас гоблин
  }

  // Генерация сетки 4×4
  generateField() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = r;
        cell.dataset.col = c;
        this.container.appendChild(cell);
        this.cells.push(cell);
      }
    }
  }

  // Создание img-элемента гоблина (если ещё не создан)
  createGoblin() {
    if (!this.goblin) {
      this.goblin = document.createElement("img");
      this.goblin.src = goblinImage;
      this.goblin.alt = "Goblin";
      this.goblin.className = "goblin-img";
    }
    return this.goblin;
  }

  // Поместить гоблина в указанную ячейку (переместить, если уже есть)
  placeGoblin(cell) {
    if (!cell) return;
    const goblinElement = this.createGoblin();
    cell.appendChild(goblinElement);
    this.currentCell = cell;
  }

  // получение случайной ячейки
  getRandomCell() {
    const index = Math.floor(Math.random() * this.cells.length);
    return this.cells[index];
  }

  // Получить случайную ячейку, исключая переданную
  getRandomCellExcluding(excludeCell) {
    const available = this.cells.filter((cell) => cell !== excludeCell);
    if (available.length === 0) return null;
    const index = Math.floor(Math.random() * available.length);
    return available[index];
  }

  // Переместить гоблина в новую случайную ячейку (не в текущую)
  moveGoblin() {
    if (!this.currentCell) {
      // Если гоблин ещё не размещён – ставим в случайную
      const cell = this.getRandomCell();
      this.placeGoblin(cell);
      return;
    }
    const newCell = this.getRandomCellExcluding(this.currentCell);
    if (newCell) {
      this.placeGoblin(newCell);
    }
  }

  // Инициализация поля и первого размещения гоблина
  init() {
    this.generateField();
    // Первое размещение – в случайную ячейку
    const firstCell = this.getRandomCell();
    this.placeGoblin(firstCell);
  }
}
