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
const popup__form = document.querySelector('.popup__form'); //formulario
const cardContainer = document.querySelector('.elements'); //contenedor de tarjetas
const titulo = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const body = document.querySelector('body');
const popupElement = document.querySelector('.popup_Element'); //popup agregar nueva tarjeta
const divTemp = document.querySelector('.overlay-image__container'); //Div que contiene la imagen
const overlay = document.querySelector('.overlay-image');
const popupPerfil = document.querySelector('.popup_perfil');
const btnNuevaImagen = document.querySelector('.popup__formElement'); //formulario agregar nueva tarjeta
const FormPerfil = document.querySelector('.popup__formPerfil');
const editButton = document.querySelector('.edit-button');
const buttonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);
const addButton = document.querySelector('.add-button');

export {
  initialCards,
  objConfig,
  popup__form,
  cardContainer,
  titulo,
  subtitle,
  body,
  popupElement,
  divTemp,
  overlay,
  popupPerfil,
  btnNuevaImagen,
  FormPerfil,
  editButton,
  buttonPopupButtonCerrarPlaces,
  addButton,
};
