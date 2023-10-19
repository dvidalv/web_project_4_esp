import './styles/index.css';
import {
  btnUpdateAvatar,
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

let userId;

//Instanciamos la clase Api
const api = new Api();

//Instanciamos la clase User
const userInfo = new UserInfo(userSelectors);

const user = await api.getUserInfo('users/me')
userInfo.setUserInfo(user);

const cards = await api.getInitialCards('cards');
const cardsList = new Section(
  {
    data: cards,
    renderer: (item) => {
      const card = new Card(item, '.template-card');
      const cardElement = card.generateCard(item.owner._id === userInfo._id);
      cardsList.addItem(cardElement);
    },
  },
  cardContainer
);
cardsList.renderItems();

const popupProfile = new PopupWithForm((datos) => {
  api.patchUserInfo('users/me', datos);
  // api.getUserInfo()
  userInfo.setUserInfo(datos);
}, '.popup_perfil');

editButton.addEventListener('click', () => {
  //Selecciona los valores del formulario
  const { _inputTitle, _inputStittle } = userInfo;

  //Selecciona los valores del usuario
  const { nombre, job } = userInfo.getUserInfo();

  _inputTitle.value = nombre;
  _inputStittle.value = job;

  //abre form profile
  popupProfile.open();

  const validate = new FormValidator(objConfig, popup__form);
  validate.enableValidation();
});

const newPlace = new PopupWithForm((obj) => {
  api.addCard('cards', obj);

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

const deleteCard = new PopupWithForm(() => { }, '.popup_delete-card');

api.getUserAvatar('users/me').then((avatar) => {
  userInfo.updateAvatar(avatar.avatar);
});
const updatePerfil = new PopupWithForm(({ link }) => {
  api
    .patchUserInfo('users/me/avatar', { avatar: link })
    .then((data) => {
      // Actualizar la imagen del usuario en la interfaz
      console.log(data.avatar);
      userInfo.updateAvatar(data.avatar);
    })
    .catch((error) => {
      // Manejar el error en caso de que ocurra
      console.log(error);
    });

  updatePerfil.close();
}, '.popup_update-perfil');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__trash')) {
    deleteCard.open();
  }
});
btnUpdateAvatar.addEventListener('click', (e) => {
  updatePerfil.open();
});
