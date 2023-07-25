const noNeGustan = document.querySelectorAll(".card__imagen-corazon");
const meGustan = document.querySelectorAll(".me-gusta");
const trashs = document.querySelectorAll(".card__trash");



const nombre = document.querySelector(".popup__input_nombre");
const aboutMe = document.querySelector(".popup__input_about-me");
const titulo = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");


const body = document.querySelector("body");

const popup_Element = document.querySelector(".popup_Element");
const popup_perfil = document.querySelector(".popup_perfil");

const edit_button = document.querySelector(".edit-button");
const popup__button_cerrar_places = document.querySelector(
  ".popup__button-cerrar-places"
);
const popup__button_cerrar_perfil = document.querySelector(
  ".popup__button-cerrar-perfil"
);

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-button");
  const trashs = document.querySelectorAll(".card__trash");
  const formPerfil = document.querySelector(".popup__formPerfil");
  const imagenes = document.querySelectorAll(".card__image-container");
  imagenes.forEach((imagen) => {
    imagen.addEventListener("click", selectImagen);
  });

  formPerfil.addEventListener("submit", handleProfileFormSubmit);
  addButton.addEventListener("click", openPopPlaces);
  edit_button.addEventListener("click", openPopPerfil);

  popup__button_cerrar_places.addEventListener("click", closePopPlaces);
  popup__button_cerrar_perfil.addEventListener("click", closePopPerfil);

  trashs.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const element = e.target.parentElement;
      element.remove();
    });
  });

  trashs.forEach( (trash) => {
    trash.addEventListener('mouseenter', () => {
      trash.style.color = 'rgba(255, 255, 255, 0.60)'
    })
  } )
  trashs.forEach( (trash) => {
    trash.addEventListener('mouseout', () => {
      trash.style.color = 'currentColor'
    })
  } )

 
});

meGusta()
function meGusta() {
    noNeGustan.forEach((noMegusta) => {
    noMegusta.addEventListener("click", (e) => {
    const element = e.target;
    const meGusta = element.nextElementSibling;
    element.classList.add('heartOff');
    element.classList.remove('heartOn');
    meGusta.classList.add("heartOn");
    meGusta.classList.remove("heartOff");
 });
});
meGustan.forEach((meGusta) => {
 meGusta.addEventListener("click", (e) => {
   const element = e.target;
   const noGusta = element.previousElementSibling;
   element.classList.add('heartOff');
   element.classList.remove('heartOn');
   noGusta.classList.add("heartOn");
   noGusta.classList.remove("heartOff");
 });
});
}


function selectImagen(e) {
  //variables
  const divTemp = document.createElement("div");
  divTemp.classList.add("overlay__divTemp");
  const url = e.target.src;



  //Contenedor de la imagen que se le da click
  divTemp.style.backgroundImage = `url('${url}')`;
  

  //Creando el boton de cerrar popup
  const btnCerrar = document.createElement("img");
  btnCerrar.src = "../imagenes/Close Icon.svg";
  btnCerrar.classList.add("btnCerrar", "btnCerrar_overlay");
  divTemp.insertAdjacentElement("beforeend", btnCerrar);

  //Agragando al boton la funcionalidad de remover el overlay
  //y removiendo la clase de fix al body
  btnCerrar.onclick = () => {
    overlay.remove();
    body.classList.remove("fix");
  };

  //Creando el overlay
  const overlay = document.createElement("div");
  overlay.appendChild(divTemp);
  overlay.classList.add("overlay");
  body.append(overlay);

  //Agrefgando la clase de fix al body
  body.classList.add("fix");

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      body.classList.remove('fix')
    }
  });

}

function openPopPerfil() {
  popup_perfil.classList.toggle("popup_opened");
  nombre.value = titulo.textContent;
  aboutMe.value = subtitle.textContent;

  body.classList.add("fix");
}

function openPopPlaces() {
  popup_Element.classList.toggle("popup_opened");
  body.classList.add("fix");
}

function closePopPerfil() {
  popup_perfil.classList.toggle("popup_opened");
  body.classList.remove("fix");
}
function closePopPlaces() {
  popup_Element.classList.toggle("popup_opened");
  body.classList.remove("fix");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  let nameInput = document.querySelector(".popup__input_nombre");
  let jobInput = document.querySelector(".popup__input_about-me");

  // Obtén los valores de cada campo desde la propiedad de valor correspondiente
  // const titulo = document.querySelector('.profile__title');
  // const subtitle = document.querySelector('.profile__subtitle');

  // Selecciona los elementos donde se introducirán los valores de los campos

  // Inserta nuevos valores utilizando el textContent
  titulo.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopPerfil();
  // propiedad del método querySelector()
}
