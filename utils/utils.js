import {
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
  btnNuevaImagen,
  FormPerfil,
} from './consts.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

function renderElements() {
  initialCards.forEach((item) => {
    //Instanciamos una nueva Tarjeta
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();

    // //APLICANDO FUNSION MEGUSTA
    cardElement.querySelector('.card__imagen-corazon').onclick = meGusta;

    cardElement.querySelector('.card__imagen-corazon_solid').onclick =
      noMeGusta;

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
  init();
}

function openPopPerfil(e) {
  FormPerfil.addEventListener('submit', handleProfileFormSubmit);
  const formElement = document.querySelector('.popup_perfil');

  // const popupButtonCerrarPerfil = formElement.querySelector(
  //   '.popup__button-cerrar-perfil'
  // );
  document.addEventListener('keydown', closePerfilEventEscap);
  document.addEventListener('click', cerrarPerfil);
  const nombre = document.querySelector('.popup__input_nombre');
  const aboutMe = document.querySelector('.popup__input_about-me');
  popupPerfil.classList.toggle('popup_opened');
  popup__form.style.animation = 'zoomIn .7s forwards';
  nombre.value = titulo.textContent;
  aboutMe.value = subtitle.textContent;
  body.classList.add('fix');

  const validation = new FormValidator(objConfig, formElement);
  validation.enableValidation();
}

function closePopPerfil(e) {
  popup__form.style.animation = 'zoomOut .7s forwards';
  setTimeout(() => {
    popupPerfil.classList.toggle('popup_opened');
  }, '1000');
  body.classList.remove('fix');
  document.removeEventListener('keydown', closePerfilEventEscap);
  document.removeEventListener('click', cerrarPerfil);
}
function closePerfilEventEscap(e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closePopPerfil();
  }
}
function cerrarPerfil(e) {
  if (
    e.target.classList.contains('popup_perfil') ||
    e.target.classList.contains('popup__button-cerrar-perfil')
  ) {
    closePopPerfil();
  }
}
function handleProfileFormSubmit(e) {
  // e.preventDefault();

  const nameInput = document.querySelector('.popup__input_nombre');
  const jobInput = document.querySelector('.popup__input_about-me');

  // Inserta nuevos valores utilizando el textContent
  titulo.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopPerfil();
}

function openPopPlaces() {
  btnNuevaImagen.addEventListener('submit', handlePlacesFormSubmit);
  document.addEventListener('click', closePopPlacesByClick);
  document.addEventListener('keydown', closeElementEventEscap);
  btnNuevaImagen.style.animation = 'zoomIn .7s forwards';
  popupElement.classList.toggle('popup_opened');
  body.classList.add('fix');
  const validation = new FormValidator(objConfig, popupElement);
  validation.enableValidation();
}
function closePopPlacesByClick(e) {
  if (
    e.target.classList.contains('btnCerrar') ||
    e.target.classList.contains('popup_Element')
  ) {
    closePopPlaces();
    document.removeEventListener('click', closePopPlacesByClick);
    document.removeEventListener('keydown', closeElementEventEscap);
  }
}
function closeElementEventEscap(e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closePopPlaces(e);
    document.removeEventListener('keydown', closeElementEventEscap);
    document.removeEventListener('click', closePopPlacesByClick);
  }
}
function closePopPlaces() {
  btnNuevaImagen.style.animation = 'zoomOut .7s forwards';
  setTimeout(() => {
    popupElement.classList.toggle('popup_opened');
  }, '1000');
  body.classList.remove('fix');
  document.removeEventListener('keydown', closeElementEventEscap);
  document.removeEventListener('click', closePopPlacesByClick);
}
//AGREGAR UNA NUEVA IMAGEN
function handlePlacesFormSubmit(e) {
  // e.preventDefault();
  limpiarHTML();

  const tituloInput = document.querySelector('.popup__input-titulo');
  const linkinput = document.querySelector('.popup__input-link');
  const alt = `imagen de  ${tituloInput.value}`;

  // Creamos un objeto con los datos del formulario
  const nuevaImagen = {
    name: tituloInput.value,
    link: linkinput.value,
    alt: alt,
  };

  initialCards.unshift(nuevaImagen);
  // renderElements();
  // init();
  closePopPlaces();

  //LIMPIANDO LOS CAMPOS DEL FORMULARIO
  tituloInput.value = '';
  linkinput.value = '';
}

function limpiarHTML() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

export {
  openPopPerfil,
  closePopPerfil,
  closePerfilEventEscap,
  cerrarPerfil,
  handleProfileFormSubmit,
  openPopPlaces,
  closePopPlacesByClick,
  closeElementEventEscap,
  closePopPlaces,
  handlePlacesFormSubmit,
  limpiarHTML,
  renderElements,
};
