//класс CardList для отрисовки карточки;
//    DOM-элемент — контейнер, куда нужно складывать карточки;
//     массив карточек, которые будут на странице при загрузке.
//
// Ещё у класса CardList должно быть два метода:
// -addCard для добавления карточки в список, принимает на вход экземпляр карточки;
// -render для отрисовки карточек при загрузке страницы.


 export default class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard = (card) => {
    this.container.appendChild(card);
  }

  render = (cards) => {
    cards.forEach((card) => {
      return this.addCard(card);
    });
  }
}
