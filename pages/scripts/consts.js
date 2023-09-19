const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg',
    alt: 'imagen Valle de Yosenite',
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg',
    alt: 'imagen Lago Louise',
  },
  {
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg',
    alt: 'imagen Montañas calvas',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg',
    alt: 'imagen Latemar',
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg',
    alt: 'imagen Parque Nacional de la Vanouse',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg',
    alt: 'imagen Lago Louise',
  },
];

const objConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// export default initialCards;
export {initialCards, objConfig} ;
