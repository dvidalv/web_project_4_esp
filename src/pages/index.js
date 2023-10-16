import './styles/index.css';
import {
  btnUpdateAvatar,
  initialCards,
  editButton,
  addButton,
  cardContainer,
  userSelectors,
  objConfig,
  popup__form,
  popupAddImage,
} from '../utils/consts.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

// const conect = new Api();
// const cards = conect.getInitialCards();

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

  const validate = new FormValidator(objConfig, popup__form);
  validate.enableValidation();
});

const newPlace = new PopupWithForm((obj) => {
  const { link, name } = obj;

  const newCard = new Card({ name, link, like: false }, '.template-card');

  cardContainer.prepend(newCard.generateCard());
}, '.popup_Element');

addButton.addEventListener('click', () => {
  newPlace.open();
  const validate = new FormValidator(objConfig, popupAddImage);
  validate.enableValidation();
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

const deleteCard = new PopupWithForm(() => {}, '.popup_delete-card');

const updatePerfil = new PopupWithForm(() => {}, '.popup_update-perfil');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__trash')) {
    deleteCard.open();
  }
});
btnUpdateAvatar.addEventListener('click', () => {
  updatePerfil.open();
});

cardsList.renderItems();
