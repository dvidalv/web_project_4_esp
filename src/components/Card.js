import { popupDeleteCard, popupImage } from '../pages/index.js';
import { deleteButtonElement } from '../utils/consts.js';
import { api } from '../pages/index.js';
class Card {
  constructor(
    { name, link, display, _id, likes, owner = {} },
    cardSelector,
    user
  ) {
    this._name = name;
    this._user = user ? user.name : undefined;
    this._link = link;
    this._alt = name;
    this._ownerName = owner.name ? owner.name : {};
    this._likes = likes ? likes : [];
    this._isLiked = this._likes.some((user) => user.name === this._user);
    this._id = _id;
    this._display = display;
    this._cardSelector = cardSelector;
    this.deleteCard = this.deleteCard.bind(this);

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  like() {
    return (this._isLiked = !this._isLiked);
  }

  async updateLikes() {
    try {
      if (this._isLiked) {
        const res = await api.likeCard('cards/likes', this._id);
        this._likes = res.likes;
        this._getLikes();
        this._heart.classList.toggle('card_like');
      } else {
        const res = await api.dislikeCard('cards/likes', this._id);
        this._likes = res.likes;
        this._getLikes();
        this._heart.classList.toggle('card_like');
      }
    } catch (error) {
      console.error(error);
    }
  }

  _getLikes() {
    if (this._likes) {
      return (this._element.querySelector('.card__likes').textContent =
        this._likes.length > 0 ? this._likes.length : '');
    }
  }

  deleteCard() {
    this._element.remove();
  }

  _listeners() {
    this._heart.addEventListener('click', (e) => {
      this.like();
      this.updateLikes();
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
        deleteButtonElement.value = 'Si';
        popupDeleteCard.open(this.deleteCard, this._id);
      });
    }

    this._image.addEventListener('click', this._getImageInfo.bind(this));
  }

  _imageInfo() {
    return {
      src: this._link,
      alt: this._alt,
    };
  }

  _getImageInfo() {
    popupImage.open(this._imageInfo.bind(this));
  }

  _removeListeners() {
    this._element.querySelector('').removeEventListener('click', this.likeCard);
    this._element
      .querySelector('.like')
      .removeEventListener('click', this._likeCard);
    this._getImageInfo.removeEventListener('click', this._getImageInfo);
  }
  _iLikeCard() {
    return this._isLiked ? this._heart.classList.add('card_like') : '';
  }
  generateCard(display, likes) {
    this._display = display;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__imagen');
    this._heart = this._element.querySelector('.card_dislike');
    this._element.querySelector('.card__imagen').src = this._link;
    this._element.querySelector('.card__imagen').alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.card__imagen');
    this._getLikes();
    this._iLikeCard();
    this._listeners();
    this._trash.style.display = this._display ? 'block' : 'none';
    this._element.dataset.id = this._id;
    return this._element;
  }
}
export default Card;
