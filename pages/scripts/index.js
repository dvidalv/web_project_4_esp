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

const popup = new PopupWithForm(
  {
    handleFormSubmit: () => {
      const user = new UserInfo(userInfo);
      const data = user.getUserInfo();
      user.setUserInfo();
      return data;
    },
  },
  '.popup_perfil'
);
editButton.addEventListener('click', () => {
  popup.open();
});

const newImage = new PopupWithForm(
  {
    getObget: (obj) => {
      const {link, name} = obj
      const newCard = {
        name,
        link,
        alt: name,
        linke: false
      };
      initialCards.unshift(newCard);
      cardsList.renderItems();

    
    },
  },
  '.popup_Element'
);
addButton.addEventListener('click', () => {

  // initialCards.unshift(getObget())

  newImage.open();
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
export { popup };
