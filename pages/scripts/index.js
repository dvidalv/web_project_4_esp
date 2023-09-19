import Card from './Card.js.js';
import { initialCards} from './consts.js';
import * as utils from './utils.js';

//AGREGANDO LA PROPIEDAD DE LIKE AL ARREGLO INICIAL
// initialCards.forEach((element) => {
//   element.like = false;
// });

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
const editButton = document.querySelector('.edit-button');
export const btnNuevaImagen = document.querySelector('.popup__formElement'); //formulario agregar nueva tarjeta
const buttonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);

export const FormPerfil = document.querySelector('.popup__formPerfil');
const addButton = document.querySelector('.add-button');
editButton.addEventListener('click', utils.openPopPerfil);
addButton.addEventListener('click', utils.openPopPlaces);

export function cargarImagenes() {
  initialCards.forEach((item) => {
    //Instanciamos una nueva Tarjeta
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();

    // //APLICANDO FUNSION MEGUSTA
    cardElement.querySelector('.card__imagen-corazon').onclick = utils.meGusta;

    cardElement.querySelector('.card__imagen-corazon_solid').onclick =
      utils.noMeGusta;

    const NoLike = cardElement.querySelector('.card__imagen-corazon');
    const Like = cardElement.querySelector('.card__imagen-corazon_solid');
    if (item.like) {
      NoLike.classList.add('corazonOff');
      Like.classList.add('corazonOn');
    } else {
      Like.classList.add('corazonOff');
      NoLike.classList.add('corazonOn');
    }

    cardContainer.append(cardElement);
  });
}

cargarImagenes();
utils.init()
