import {
  initialCards,
  editButton,
  addButton,
  cardContainer,
  userSelectors,
  title,
  subtitle,
} from '../../utils/consts.js';
import * as utils from '../../utils/utils.js';
import Section from '../../components/Section.js';
import Card from '../../components/Card.js';
import Popup from '../../components/Popup.js';
import PopupWithForm from '../../components/PopupWithForm.js';
import PopupWithImage from '../../components/PopupWithImage.js';
import UserInfo from '../../components/UserInfo.js';

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template-card');
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardContainer
);
const userInfo = new UserInfo(userSelectors);

const popupProfile = new PopupWithForm((data) => {
  userInfo.setUserInfo(data);
}, '.popup_perfil');

editButton.addEventListener('click', () => {
  //abre form profile
  const { _inputTitle, _inputStittle } = userInfo;
  const { nombre, job } = userInfo.getUserInfo();

  _inputTitle.value = nombre;
  _inputStittle.value = job;

  popupProfile.open();

  // const form = new FormValidator(popupFormSelectorsToValidate, '.popup');

  // form.enableValidation();
});

const newPlace = new PopupWithForm((obj) => {
  const { link, name } = obj;

  const newCard = new Card({ name, link, like: false }, '.template-card');

  cardContainer.prepend(newCard.generateCard());
  console.log(initialCards)
}, '.popup_Element');

addButton.addEventListener('click', () => {
  newPlace.open();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__imagen')) {
    const imageInfo = {
      src: e.target.src,
      alt: e.target.alt,
    };
    const popupImage = new PopupWithImage(imageInfo, '.overlay-image');
    popupImage.open();
  }
});

cardsList.renderItems();
