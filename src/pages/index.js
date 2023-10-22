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
  eraseBtn,
} from '../utils/consts.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

let card_Id;
let cardToErase;

//Instanciamos la clase Api
export const api = new Api();
export const popupDeleteCard = new PopupWithForm(
  async (inputValues, deleteCallback, cardId) => {
    await api.deleteCard('cards/' + cardId);
    deleteCallback();
  },
  '.popup_delete-card'
);
(async function() {
try {
  //Instanciamos la clase User
  const userInfo = new UserInfo(userSelectors);

  const user = await api.getUserInfo('users/me');
  userInfo.setUserInfo(user);

  const cards = await api.getInitialCards('cards');
  // console.log(cards);
  const cardsList = new Section(
    {
      data: cards,
      renderer: (item) => {
        // console.log(item);
        const card = new Card(item, '.template-card');
        const cardElement = card.generateCard(
          item.owner._id === userInfo._id,
          item.likes
        );
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
  // console.log(user._id);
  const newPlace = new PopupWithForm(async (obj) => {
    const rest =  await api.addCard('cards', obj);
    const _id= rest._id
    const { link, name, display = true } = obj;

    const newCard = new Card(
      { name, link, like: false, display, _id },
      '.template-card'
    );

    cardsList.addItem(newCard.generateCard(display), 'prepend');
    const cards = await api.getInitialCards('cards');
    // cardsList.renderItems();

    newPlace.close();
  
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

  api.getUserAvatar('users/me').then((avatar) => {
    userInfo.updateAvatar(avatar.avatar);
  });

  const updatePerfil = new PopupWithForm(async ({ link }) => {
    // éste método Recibe un objeto con la propiedad de avatar
    const data = await api.patchUserInfo('users/me/avatar', { avatar: link });

    // Actualizar la imagen del usuario en la interfaz
    userInfo.updateAvatar(data.avatar);
    updatePerfil.close();
  }, '.popup_update-perfil');
  btnUpdateAvatar.addEventListener('click', (e) => {
    updatePerfil.open();
  });
} catch (error) {
  console.log(error);
}
})();
