const cardContainer = document.querySelector('.elements');
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', openPopPlaces);

const nombre = document.querySelector('.popup__input_nombre');
const aboutMe = document.querySelector('.popup__input_about-me');
const titulo = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const body = document.querySelector('body');

const popupElement = document.querySelector('.popup_Element');
const popupPerfil = document.querySelector('.popup_perfil');

const editButton = document.querySelector('.edit-button');
const editButtonPopupButtonCerrarPlaces = document.querySelector(
  '.popup__button-cerrar-places'
);
const popupButtonCerrarPerfil = document.querySelector(
  '.popup__button-cerrar-perfil'
);

document.addEventListener('DOMContentLoaded', iniciarAPP);
function iniciarAPP() {
  cargarImagenes();

  const trashs = document.querySelectorAll('.card__trash');
  const btnFormPerfil = document.querySelector('.popup__formPerfil');
  const imagenes = document.querySelectorAll('.card__image-container');
  const btnNuevaImagen = document.querySelector('.popup__formElement');

  imagenes.forEach((imagen) => {
    imagen.addEventListener('click', selectImagen);
  });

  btnFormPerfil.addEventListener('submit', handleProfileFormSubmit);
  btnNuevaImagen.addEventListener('submit', handlePlacesFormSubmit);

  editButton.addEventListener('click', openPopPerfil);

  editButtonPopupButtonCerrarPlaces.addEventListener('click', closePopPlaces);
  popupButtonCerrarPerfil.addEventListener('click', closePopPerfil);

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
      console.log(initialCards);
      limpiarHTML();
      iniciarAPP();
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
    const template = document.querySelector('.template__card').content;
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
    meGustan.onclick = meGusta;

    cardContainer.append(templateElements);
  });
}

// meGusta();
function meGusta(e) {
  const heart = e.target;
  heart.classList.toggle('fa-regular');
  heart.classList.toggle('fa-solid');
}

function selectImagen(e) {
  //variables
  const divTemp = document.createElement('div');
  divTemp.classList.add('overlay__divTemp');
  const url = e.target.src;

  //Contenedor de la imagen que se le da click
  divTemp.style.backgroundImage = `url('${url}')`;

  //Creando el boton de cerrar popup
  const btnCerrar = document.createElement('img');
  btnCerrar.src = '../imagenes/Close-Icon.svg';
  btnCerrar.classList.add('btnCerrar', 'btnCerrar_overlay');
  divTemp.insertAdjacentElement('beforeend', btnCerrar);
  divTemp.style.animation = 'zoomIn .5s forwards';

  //Agragando al boton la funcionalidad de remover el overlay
  //y removiendo la clase de fix al body
  btnCerrar.onclick = () => {
    divTemp.style.animation = 'zoomOut .5s forwards';
    setTimeout(() => {
      overlay.remove();
    }, '500');
    body.classList.remove('fix');
  };

  //Creando el overlay
  const overlay = document.createElement('div');
  overlay.appendChild(divTemp);
  overlay.classList.add('overlay');
  body.append(overlay);

  //Agrefgando la clase de fix al body
  body.classList.add('fix');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      divTemp.style.animation = 'zoomOut .5s forwards';
      setTimeout(() => {
        overlay.remove();
      }, '500');
      body.classList.remove('fix');
    }
  });
}

function openPopPerfil() {
  popupPerfil.classList.toggle('popup_opened');
  nombre.value = titulo.textContent;
  aboutMe.value = subtitle.textContent;

  body.classList.add('fix');
}
function closePopPerfil() {
  popupPerfil.classList.toggle('popup_opened');
  body.classList.remove('fix');
}
function handleProfileFormSubmit(e) {
  e.preventDefault();

  let nameInput = document.querySelector('.popup__input_nombre');
  let jobInput = document.querySelector('.popup__input_about-me');

  // Inserta nuevos valores utilizando el textContent
  titulo.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopPerfil();
}

function openPopPlaces() {
  popupElement.classList.toggle('popup_opened');
  body.classList.add('fix');
}
function closePopPlaces() {
  popupElement.classList.toggle('popup_opened');
  body.classList.remove('fix');
}
//AGREGAR UNA NUEVA IMAGEN
function handlePlacesFormSubmit(e) {
  e.preventDefault();
  limpiarHTML();

  let tituloInput = document.querySelector('.popup__input-titulo');
  let linkImput = document.querySelector('.popup__input-link');

  // Creamos un objeto con los datos del formulario
  const nuevaImagen = {
    name: tituloInput.value,
    link: linkImput.value,
  };
  initialCards.unshift(nuevaImagen);
  iniciarAPP();
  closePopPlaces();
  return;

  //LIMPIANDO LOS CAMPOS DEL FORMULARIO
  tituloInput.value = '';
  linkImput.value = '';
}

function limpiarHTML() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}
