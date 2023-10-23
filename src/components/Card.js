import { popupDeleteCard } from '../pages/index.js';
import { api } from '../pages/index.js';
class Card {
  constructor({ name, link, display, _id, likes, owner={} }, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = name;
    this._ownerName = owner.name?owner.name:{};
    this._likes = likes ? likes : [];
    this._isLiked = this._likes.some((user) => (user = this._ownerName));
    this._id = _id;
    this._display = display;
    this._cardSelector = cardSelector;
    this.deleteCard = this.deleteCard.bind(this);
    // console.log(display)
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
    console.log(this._isLiked);
    try {
      if (this._isLiked) {
        console.log(this._isLiked);
        const res = await api.likeCard('cards/likes', this._id);
        console.log(res);
        this._likes = res.likes;
        this._getLikes();
        this._heart.classList.toggle('card_like');
      } else {
        console.log(this._isLiked);
        const res = await api.dislikeCard('cards/likes', this._id);
        console.log(res);
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
      // console.log(this._isLiked);
      this.updateLikes();
    });

    const trashElement = this._element.querySelector('.card__trash');
    if (trashElement) {
      this._trash = trashElement;
      // this._trash.style.display = this._display ? 'block' : 'none';

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
    this._element.querySelector('').removeEventListener('click', this.likeCard);
    this._element
      .querySelector('.like')
      .removeEventListener('click', this._likeCard);
    // this._trash.removeEventListener('click', this.deleteCard);
  }
  _iLikeCard() {
    this._isLiked ? this._heart.classList.add('card_like') : '';
  }
  generateCard(display, likes) {
    this._display = display;
    this._element = this._getTemplate();
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
    // console.log(this._element)
    return this._element;
  }
}
export default Card;
