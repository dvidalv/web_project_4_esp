//VARIABLES
const popup__form = document.querySelector('.popup__form');
const cardContainer = document.querySelector('.elements');
const titulo = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const body = document.querySelector('body');
const popupElement = document.querySelector('.popup_Element');
const divTemp = document.querySelector('.overlay-image__image');
const overlay = document.querySelector('.overlay-image');
const popupPerfil = document.querySelector('.popup_perfil');
const editButton = document.querySelector('.edit-button');
const btnNuevaImagen = document.querySelector('.popup__formElement');
const buttonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);

objConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const FormPerfil = document.querySelector('.popup__formPerfil');
const addButton = document.querySelector('.add-button');
editButton.addEventListener('click', openPopPerfil);
addButton.addEventListener('click', openPopPlaces);

cargarImagenes();

//AGREGANDO LA PROPIEDAD DE LIKE AL ARREGLO INICIAL
initialCards.forEach((element) => {
  element.like = false;
});

init();

function init() {
  const imagenes = document.querySelectorAll('.card__image-container');
  const trashs = document.querySelectorAll('.card__trash');

  imagenes.forEach((imagen) => {
    imagen.addEventListener('click', selectImagen);
    // console.log(imagen)
  });

  //BORRAR IMAGEN
  trashs.forEach((trash) => {
    trash.addEventListener('click', (e) => {
      const element = e.target.parentElement;
      const imagen = element.querySelector('.card__imagen').src;
      initialCards.forEach((link, i) => {
        if (imagen === link.link) {
          initialCards.splice(i, 1);
        }
      });
      limpiarHTML();
      cargarImagenes();
      init();
    });
  });

  trashs.forEach((trash) => {
    trash.addEventListener('mouseenter', () => {
      trash.style.color = 'rgba(255, 255, 255, 0.60)';
    });
  });
  trashs.forEach((trash) => {
    trash.addEventListener('mouseout', () => {
      trash.style.color = 'currentColor';
    });
  });
}

function cargarImagenes() {
  initialCards.forEach((card) => {
    //AGREGANDO EL TEMPLATE
    const template = document.querySelector('.template-card').content;
    const templateElements = template.querySelector('.card').cloneNode(true);

    //AGREGANDO LA IMAGEN
    const imagen = templateElements.querySelector('.card__imagen');
    imagen.src = card.link;
    imagen.alt = card.alt;

    //AGREGANDO EL TITULO
    const titulo = templateElements.querySelector('.card__title');
    titulo.textContent = card.name;

    //APLICANDO FUNSION MEGUSTA
    const meGustan = templateElements.querySelector('.card__imagen-corazon');
    const moMeGustan = templateElements.querySelector(
      '.card__imagen-corazon_solid'
    );
    meGustan.onclick = meGusta;
    moMeGustan.onclick = noMeGusta;

    const NoLike = templateElements.querySelector('.card__imagen-corazon');
    const Like = templateElements.querySelector('.card__imagen-corazon_solid');
    if (card.like) {
      NoLike.classList.add('corazonOff');
      Like.classList.add('corazonOn');
    } else {
      Like.classList.add('corazonOff');
      NoLike.classList.add('corazonOn');
    }

    cardContainer.append(templateElements);
  });
}

// meGusta();
function meGusta(e) {
  const heart = e.target;
  const heartSolid = heart.nextElementSibling;
  heartSolid.style.animation = 'megusta 1s 2';
  heart.classList.add('corazonOff');
  heart.classList.remove('corazonOn');
  heartSolid.classList.add('corazonOn');
  heartSolid.classList.remove('corazonOff');
  setTimeout(() => {
    const card = e.target.parentElement.parentElement.parentElement;

    const image = card.querySelector('.card__imagen').src;

    if (heart.classList.contains('corazonOff')) {
      initialCards.forEach((card) => {
        if (card.link === image) {
          card.like = true;
        }
      });
    } else {
      initialCards.forEach((card) => {
        if (card.link === image) {
          card.like = false;
        }
      });
    }

    limpiarHTML();
    cargarImagenes();
    init();
  }, '2000');
}
// NO meGusta();
function noMeGusta(e) {
  const heartSolid = e.target;
  const heart = heartSolid.previousElementSibling;
  heartSolid.classList.add('corazonOff');
  heartSolid.classList.remove('corazonOn');
  heart.classList.remove('corazonOff');
  heart.classList.remove('corazonOn');

  const card = e.target.parentElement.parentElement.parentElement;

  const image = card.querySelector('.card__imagen').src;

  if (heartSolid.classList.contains('corazonOn')) {
    initialCards.forEach((card) => {
      if (card.link === image) {
        card.like = true;
      }
    });
  } else {
    initialCards.forEach((card) => {
      if (card.link === image) {
        card.like = false;
      }
    });
  }

  limpiarHTML();
  cargarImagenes();
  init();
}

function selectImagen(e) {
  //variables
  divTemp.classList.add('overlay__divTemp');
  const url = e.target.src;

  //Contenedor de la imagen que se le da click
  divTemp.style.backgroundImage = `url('${url}')`;

  //Creando el boton de cerrar popup
  const btnCerrar = document.createElement('img');
  btnCerrar.src = '../imagenes/Close-Icon.svg';
  btnCerrar.classList.add('btnCerrar', 'btnCerrar_overlay');
  divTemp.insertAdjacentElement('beforeend', btnCerrar);
  divTemp.style.animation = 'zoomIn 1s forwards';

  //Creando el overlay
  overlay.appendChild(divTemp);
  overlay.classList.add('overlay');
  body.append(overlay);
  overlay.addEventListener('click', closeImageByClick);
  document.addEventListener('keydown', closeImageByScape);

  //Agrefgando la clase de fix al body
  body.classList.add('fix');

}
const closeImageByScape = (e) => {
  if (e.key === 'Escape') {
    cerrarImagenGallery()
    
  }
};

function closeImageByClick(e) {
  if (
    e.target.classList.contains('btnCerrar') ||
    e.target.classList.contains('overlay')
  ) {
    cerrarImagenGallery();
  }
}
function cerrarImagenGallery() {
  divTemp.style.animation = 'zoomOut .7s forwards';
  setTimeout(() => {
    overlay.classList.remove('overlay');
  }, '1000');
  body.classList.remove('fix');
  document.removeEventListener('keydown', closeImageByScape);
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

  enableValidation(objConfig, formElement);
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
  enableValidation(objConfig, popupElement);
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
  // console.log(e.target)
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
  const linkImput = document.querySelector('.popup__input-link');
  const alt = `imagen de  ${tituloInput.value}`;

  // Creamos un objeto con los datos del formulario
  const nuevaImagen = {
    name: tituloInput.value,
    link: linkImput.value,
    alt: alt,
  };

  initialCards.unshift(nuevaImagen);
  cargarImagenes();
  init();
  closePopPlaces();

  //LIMPIANDO LOS CAMPOS DEL FORMULARIO
  tituloInput.value = '';
  linkImput.value = '';
}

function limpiarHTML() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}
