import PopupWithImage from './PopupWithImage.js';
import { initialCards } from '../utils/consts.js';
import { popupDeleteCard } from '../pages/index.js';

class Card {
  constructor({ name, link, like, display, _id }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._like = like;
    this._id = _id;
    this._display = display;
    this._cardSelector = cardSelector;
    // this.likeCard = this.likeCard.bind(this);
    // this.disLikeCard = this.disLikeCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    // this._heart = document.querySelector('.card__imagen-corazon');
    // this._heart_solid = document.querySelector('.card__imagen-corazon_solid');
  }

  updateCardLikeStatus(isLiked) {
    initialCards.forEach((card) => {
      if (card.link === this._link) {
        card.like = isLiked;
      }
    });
  }

  likeCard(e) {
    const heart = e.target;
    const heartSolid = heart.nextElementSibling;
    heartSolid.style.animation = 'megusta 1s 2';
    heart.classList.add('corazonOff');
    heart.classList.remove('corazonOn');
    heartSolid.classList.add('corazonOn');
    heartSolid.classList.remove('corazonOff');

    this.updateCardLikeStatus(heart.classList.contains('corazonOff'));

  }


  disLikeCard(e) {
    const heartSolid = e.target;
    const heart = heartSolid.previousElementSibling;
    heartSolid.classList.add('corazonOff');
    heartSolid.classList.remove('corazonOn');
    heart.classList.remove('corazonOff');
    heart.classList.remove('corazonOn');

    this._like = heart.classList.contains('corazonOn');

    this.updateCardLikeStatus(heartSolid.classList.contains('corazonOn'));
  }

  deleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    /* console.log('cardElement', cardElement); */
    return cardElement;
  }

  _listeners() {
    this._heart.addEventListener('click', (e) => {
      this._heart.classList.toggle('card__imagen-corazon')
      this._heart.classList.toggle('card__imagen-corazon_solid')
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
        popupDeleteCard.open(this.deleteCard, this._id)
        //luego delete
        //this.deleteCard()
      })
    }
  }
  _removeListeners() {
    this._element
      .querySelector('.card__imagen-corazon')
      .removeEventListener('click', this.likeCard);
    this._element
      .querySelector('.card__imagen-corazon_solid')
      .removeEventListener('click', this.disLikeCard);
    // this._trash.removeEventListener('click', this.deleteCard);
  }

  generateCard(display) {
    this._display = display;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector('.card__imagen-corazon');
    this._heart_solid = this._heart.nextElementSibling;
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;
    this._listeners();
    this._trash.style.display = this._display ? 'block' : 'none';
    this._element.dataset.id = this._id;
    // console.log(this._heart)
    return this._element;
  }
}
export default Card;
