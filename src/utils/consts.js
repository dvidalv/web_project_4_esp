const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg',
    alt: 'imagen Valle de Yosenite',
    like: false,
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg',
    alt: 'imagen Lago Louise',
    like: false,
  },
  {
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg',
    alt: 'imagen Montañas calvas',
    like: false,
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg',
    alt: 'imagen Latemar',
    like: false,
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg',
    alt: 'imagen Parque Nacional de la Vanouse',
    like: false,
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg',
    alt: 'imagen Lago Louise',
    like: false,
  },
];

const objConfig = {
  formSelector: '.popup__form', //selecciona el formulario
  inputSelector: '.popup__input', //selecciona los inputs
  submitButtonSelector: '.popup__submit', //selecciona los submits
  inactiveButtonClass: 'popup__button_disabled', //inactiva un boton mediata esta case
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
const btnUpdateAvatar = document.querySelector('.profile__edit-icon');
const eraseBtn = document.querySelectorAll('.card__trash')
const popup__form = document.querySelector('.popup__form'); //formulario
const cardContainer = document.querySelector('.elements'); //contenedor de tarjetas
const title = '.profile__title';
const subtitle = '.profile__subtitle';
const body = document.querySelector('body');
const popupElement = document.querySelector('.popup_Element'); //popup agregar nueva tarjeta
const divTemp = document.querySelector('.overlay-image__container'); //Div que contiene la imagen
const overlay = document.querySelector('.overlay-image');
const popupPerfil = document.querySelector('.popup_perfil');
const popupAddImage = document.querySelector('.popup__formElement'); //formulario agregar nueva tarjeta
const FormPerfil = document.querySelector('.popup__formPerfil');
const editButton = document.querySelector('.edit-button');
const buttonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);
const userSelectors = {
  nombre: title,
  job: subtitle,
};
const addButton = document.querySelector('.add-button');

export {
  btnUpdateAvatar,
  userSelectors,
  initialCards,
  objConfig,
  popup__form,
  cardContainer,
  title,
  subtitle,
  body,
  popupElement,
  divTemp,
  overlay,
  popupPerfil,
  popupAddImage,
  FormPerfil,
  editButton,
  buttonPopupButtonCerrarPlaces,
  addButton,
  eraseBtn,
};
