import PopupWithImage from './PopupWithImage.js';
import { initialCards } from '../utils/consts.js';
class Card {
  constructor({ name, link, like }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._like = like;
    this._cardSelector = cardSelector;
    this.likeCard = this.likeCard.bind(this);
    this.disLikeCard = this.disLikeCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this._heart = document.querySelector('.card__imagen-corazon');
    this._heart_solid = document.querySelector('.card__imagen-corazon_solid');
    // this._trash = document.querySelector('.card__trash');
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

  deleteCard(e) {
    // const card = e.target.parentElement;
    // card.classList.add('popup-cierre');
    // setTimeout(() => {
    //   card.remove();
    //   this._removeListeners();
    // }, `1000`);
    console.log('borrando');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _listeners() {
    const likeHeartElement = this._element.querySelector(
      '.card__imagen-corazon'
    );
    const disLikeHeartElement = this._element.querySelector(
      '.card__imagen-corazon_solid'
    );

    if (likeHeartElement) {
      this.likeHeart = likeHeartElement.addEventListener(
        'click',
        this.likeCard
      );
    }

    if (disLikeHeartElement) {
      this.disLikeHeart = disLikeHeartElement.addEventListener(
        'click',
        this.disLikeCard
      );
    }

    const trashElement = this._element.querySelector('.card__trash');
    if (trashElement) {
      this._trash = trashElement;
      this._trash.addEventListener('click', this.deleteCard);

      this._trash.addEventListener('mouseenter', () => {
        this._trash.style.color = 'rgba(255, 255, 255, 0.60)';
      });
      this._trash.addEventListener('mouseout', () => {
        this._trash.style.color = 'currentColor';
      });
    }
  }
  _removeListeners() {
    this._element
      .querySelector('.card__imagen-corazon')
      .removeEventListener('click', this.likeCard);
    this._element
      .querySelector('.card__imagen-corazon_solid')
      .removeEventListener('click', this.disLikeCard);
    this._trash.removeEventListener('click', this.deleteCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;

    this._listeners();
    return this._element;
  }
}

export default Card;
