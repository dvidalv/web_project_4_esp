import {
  initialCards,
  editButton,
  addButton,
  cardContainer,
  userInfo,
} from '../../utils/consts.js';
import * as utils from '../../utils/utils.js';
import Section from '../../components/Section.js';
import Card from '../../components/Card.js';
import Popup from '../../components/Popup.js';
import PopupWithForm from '../../components/PopupWithForm.js';
import PopupWithImage from '../../components/PopupWithImage.js';

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

editButton.addEventListener('click', () => {
  const popup = new PopupWithForm(
    {
      data: userInfo,
      getUser: (info) => {
        const user = new UserInfo();
      },
    },
    '.popup_perfil'
  );
  popup.open();
});
addButton.addEventListener('click', () => {
  const popup = new PopupWithForm([], '.popup_Element');
  popup.open();
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
