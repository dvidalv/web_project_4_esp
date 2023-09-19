import { initialCards } from './consts.js';
import * as utils from './utils.js';

//VARIABLES
export const popup__form = document.querySelector('.popup__form'); //formulario
export const cardContainer = document.querySelector('.elements'); //contenedor de tarjetas
export const titulo = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');
export const body = document.querySelector('body');
export const popupElement = document.querySelector('.popup_Element'); //popup agregar nueva tarjeta
export const divTemp = document.querySelector('.overlay-image__container'); //Div que contiene la imagen
export const overlay = document.querySelector('.overlay-image');
export const popupPerfil = document.querySelector('.popup_perfil');
export const btnNuevaImagen = document.querySelector('.popup__formElement'); //formulario agregar nueva tarjeta
export const FormPerfil = document.querySelector('.popup__formPerfil');
const editButton = document.querySelector('.edit-button');
const buttonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);

const addButton = document.querySelector('.add-button');
editButton.addEventListener('click', utils.openPopPerfil);
addButton.addEventListener('click', utils.openPopPlaces);

utils.cargarImagenes(initialCards);

utils.cargarImagenes();
utils.init();
