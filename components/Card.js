import PopupWithImage from './PopupWithImage.js';
import { initialCards } from '../utils/consts.js';
// import { meGusta } from '../utils/utils.js';
class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._like = false;
    this._cardSelector = cardSelector;
  }
  likeCard(e) {
    const heart = e.target;
    const heartSolid = heart.nextElementSibling;
    heartSolid.style.animation = 'megusta 1s 2';
    heart.classList.add('corazonOff');
    heart.classList.remove('corazonOn');
    heartSolid.classList.add('corazonOn');
    heartSolid.classList.remove('corazonOff');
  }
  disLikeCard(e) {
    const heartSolid = e.target;
    const heart = heartSolid.previousElementSibling;
    heartSolid.classList.add('corazonOff');
    heartSolid.classList.remove('corazonOn');
    heart.classList.remove('corazonOff');
    heart.classList.remove('corazonOn');
  }
  deleteCard(e) {
    const card = e.target.parentElement;
    card.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _listeners(){
    this.likeHeart = this._element
    .querySelector('.card__imagen-corazon')
    .addEventListener('click', this.likeCard);

  this.disLikeHeart = this._element
    .querySelector('.card__imagen-corazon_solid')
    .addEventListener('click', this.disLikeCard);

  this._trash = this._element.querySelector('.card__trash');
  this._trash.addEventListener('click', this.deleteCard);

  this._trash.addEventListener('mouseenter', () => {
    this._trash.style.color = 'rgba(255, 255, 255, 0.60)';
  });
  this._trash.addEventListener('mouseout', () => {
    this._trash.style.color = 'currentColor';
  });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;

    this._listeners()
    return this._element;
  }
}

export default Card;
