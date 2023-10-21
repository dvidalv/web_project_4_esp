import { initialCards } from '../utils/consts.js';
import { popupDeleteCard } from '../pages/index.js';

class Card {
  constructor({ name, link, like, display, _id, likes }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._like = like;
    this._likes = likes;
    this._id = _id;
    this._display = display;
    this._cardSelector = cardSelector;
    // this.likeCard = this.likeCard.bind(this);
    // this.disLikeCard = this.disLikeCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    // this._heart = document.querySelector('.card__imagen-corazon');
    // this._heart_solid = document.querySelector('.card__imagen-corazon_solid');
  }

  deleteCard() {
    this._element.remove();
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  _likeCard() {
    this._heart.classList.toggle('card_like');
  }
  _listeners() {
    this._heart.addEventListener('click', (e) => {
      this._likeCard();
    });

    const trashElement = this._element.querySelector('.card__trash');
    if (trashElement) {
      this._trash = trashElement;

      this._trash.addEventListener('mouseenter', () => {
        this._trash.style.color = 'rgba(255, 255, 255, 0.60)';
      });
      this._trash.addEventListener('mouseout', () => {
        this._trash.style.color = 'currentColor';
      });

      this._trash.addEventListener('click', () => {
        //primero open del popup
        popupDeleteCard.open(this.deleteCard, this._id);
        //luego delete
        //this.deleteCard()
      });
    }
  }
  _removeListeners() {
    this._element
      .querySelector('')
      .removeEventListener('click', this.likeCard);
    this._element
      .querySelector('.like')
      .removeEventListener('click', this._likeCard);
    // this._trash.removeEventListener('click', this.deleteCard);
  }
  generateCard(display, likes) {
    this._display = display;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector('.card_dislike');
    // this._heart_solid = this._heart.nextElementSibling;
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.card__imagen');
    this._listeners();
    this._trash.style.display = this._display ? 'block' : 'none';
    this._element.dataset.id = this._id;
    // console.log(this._heart)
    return this._element;
  }
}
export default Card;
