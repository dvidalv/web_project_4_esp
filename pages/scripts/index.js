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

editButton.addEventListener('click', () => {
  const popup = new PopupWithForm(
    {
      data: userInfo,
      handleFormSubmit: () => {
        const user = new UserInfo(userInfo);
        const data = user.getUserInfo();
        user.setUserInfo(data);
      },
    },
    '.popup_perfil'
  );
  popup.open();
  // popup.getInputData();
});
addButton.addEventListener('click', () => {
  const popup = new PopupWithForm(
    {
      data: {},
      handleFormSubmit: () => {
        const user = new UserInfo(userInfo);
        const data = user.getUserInfo();
        user.setUserInfo(data);
      },
    },
    '.popup_Element'
  );
  popup.open();
});

cardsList.renderItems();
