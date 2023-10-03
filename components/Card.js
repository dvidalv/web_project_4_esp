import PopupWithImage from './PopupWithImage.js';
class Card {
  constructor({ name, link, alt }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
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
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.addEventListener('click', (e) => {
      if (e.target.classList.contains('card__imagen')) {
        const imageInfo = {
          src: e.target.src,
          alt: e.target.alt,
        };
        const popupImage = new PopupWithImage(imageInfo, '.overlay-image');
        popupImage.open();
      }
    });

    return this._element;
  }
}

export default Card;
