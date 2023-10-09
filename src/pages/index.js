import "./styles/index.css";
import '../vendors/normalize.css';
import'../fonts/Inter/inter.css';
import'./styles/blocks/globales/globales.css';
import'./styles/blocks/globales/animaciones.css';
import'./styles/blocks/buttons/buttons.css';
import'./styles/blocks/buttons/add-button/add-button.css';
import'./styles/blocks/buttons/edit-button/edit-button.css';
import'./styles/blocks/buttons/btn-cerrar/btncerrar.css';
import'./styles/blocks/page/page.css';
import'./styles/blocks/content/content.css';
import'./styles/blocks/header/__logo/logo.css';
import'./styles/blocks/header/header.css';
import'./styles/blocks/profile/profile.css';
import'./styles/blocks/popup/popup.css';
import'./styles/blocks/popup/__popcontainer/__popupcontatiner.css';
import'./styles/blocks/popup/__popuptitle/__popuptitle.css';
import'./styles/blocks/popup/__popupinput/__popupinput.css';
import'./styles/blocks/popup/__popupsubmit/__popupsubmit.css';
import'./styles/blocks/profile/__profiledata/__profiledata.css';
import'./styles/blocks/profile/__profiledata/__profileinfo/__profiloSubtitle/__profiloSubtitle.css';
import'./styles/blocks/profile/__profiledata/__profileavatar/__profileavatar.css';
import'./styles/blocks/profile/__profiledata/__profileavatar/__profileimage/__profileimage.css';
import'./styles/blocks/profile/__profiledata/__profileinfo/__profileinfo.css';
import'./styles/blocks/profile/__profiledata/__profileinfo/__profileContenedorTitle/__profileContenedorTitle.css';
import'./styles/blocks/profile/__profiledata/__profileinfo/__profileContenedorTitle/__profiletitle/__profiletitle.css';
import'./styles/blocks/elements/elements.css';
import'./styles/blocks/cards/card.css';
import'./styles/blocks/cards/__card__image-container/__card__image-container.css';
import'./styles/blocks/cards/__card__imagen/__card__imagen.css';
import'./styles/blocks/cards/__card__contenido/__card__contenido.css';
import'./styles/blocks/cards/__card__info/__card__info.css';
import'./styles/blocks/cards/__card__title/__card__title.css';
import'./styles/blocks/cards/__card__imagen-corazon/__card__imagen-corazon.css';
import'./styles/blocks/cards/__me-gusta/__me-gusta.css';
import'./styles/blocks/cards/__card__trash/__card__trash.css';
import'./styles/blocks/overlay/overlay.css';
import'./styles/blocks/overlay/__overlay__divTemp/__overlaydivtemp.css';
import'./styles/blocks/footer/footer.css';

import {
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
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

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
  console.log(initialCards)
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

cardsList.renderItems();





