class Card {
  constructor(obj, cardSelector) {
    this._name = obj.name;
    this._link = obj.link;
    this._alt = obj.alt;
    this._like = false;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
