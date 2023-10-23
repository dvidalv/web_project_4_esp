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
  updateformPerfil,
  FormPerfilBtn,
  addButtonElement,
  deleteButtonElement,
  updatePerfilBtn,
} from '../utils/consts.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

//Instanciamos la clase Api
export const api = new Api();
export const popupDeleteCard = new PopupWithForm(
  async (inputValues, deleteCallback, cardId) => {
    deleteButtonElement.value = 'Eliminando...';
    await api.deleteCard('cards/' + cardId);
    deleteCallback();
    popupDeleteCard.close();
  },
  '.popup_delete-card'
);
(async function () {
  deleteButtonElement.value = 'si';
  try {
    //Instanciamos la clase User
    const userInfo = new UserInfo(userSelectors);

    const user = await api.getUserInfo('users/me');
    userInfo.setUserInfo(user);

    const cards = await api.getInitialCards('cards');
    const cardsList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = new Card(item, '.template-card', user);
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

    const popupProfile = new PopupWithForm(async (datos) => {
      FormPerfilBtn.value = 'Guardando...';
      await api.patchUserInfo('users/me', datos);

      popupProfile.close();

      FormPerfilBtn.value = 'Guardar';
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
    const newPlace = new PopupWithForm(async (obj) => {
      addButtonElement.value = 'Guardando...';
      const rest = await api.addCard('cards', obj);
      newPlace.close();
      const _id = rest._id;
      const { link, name, display = true } = obj;

      const newCard = new Card(
        { name, link, like: false, display, _id },
        '.template-card'
      );

      cardsList.addItem(newCard.generateCard(display), 'prepend');
      const cards = await api.getInitialCards('cards');
    }, '.popup_Element');

    addButton.addEventListener('click', () => {
      addButtonElement.value = 'Nuevo';
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

    api.getUserAvatar('users/me').then((user) => {
      userInfo.updateAvatar(user.avatar, user.name);
    });

    const updatePerfil = new PopupWithForm(async ({ link }) => {
      // éste método Recibe un objeto con la propiedad de avatar
      updatePerfilBtn.value = 'Guardando...';
      const data = await api.patchUserInfo('users/me/avatar', { avatar: link });
      const { avatar, name } = data;

      userInfo.updateAvatar(avatar, name);
      updatePerfil.close();
    }, '.popup_update-perfil');
    btnUpdateAvatar.addEventListener('click', (e) => {
      updatePerfilBtn.value = 'Cuardar';
      updatePerfil.open();
      const validate = new FormValidator(objConfig, updateformPerfil);
      validate.enableValidation();
    });
  } catch (error) {
    if (error) {
      const errorContainer = document.querySelector('.error');
      errorContainer.style.display = 'block';
      errorContainer.innerHTML = `Ha ocurrido un error: ${error}`;
      setTimeout(() => {
        document.querySelector('.error').innerHTML = '';
        errorContainer.style.display = 'none';
      }, 3000);
    }
  }
})();
