const megusta = document.querySelectorAll('.card__imagen-corazon');
const addButton = document.querySelector('.add-button');
const trashs = document.querySelectorAll('.card__trash');
const nombre = document.querySelector('.popup__input_nombre');
const aboutMe = document.querySelector('.popup__input_about-me');
const titulo = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const formPerfil= document.querySelector('.popup__formPerfil');



const popup_Element = document.querySelector('.popup_Element');
const popup_perfil = document.querySelector('.popup_perfil');

const edit_button = document.querySelector('.edit-button');
const popup__button_cerrar_places = document.querySelector('.popup__button-cerrar-places');
const popup__button_cerrar_perfil = document.querySelector('.popup__button-cerrar-perfil');



adeventlisteners();
function adeventlisteners() {
    formPerfil.addEventListener('submit', handleProfileFormSubmit)
    addButton.addEventListener('click', openPopPlaces);
    edit_button.addEventListener('click', openPopPerfil );
    
    popup__button_cerrar_places.addEventListener('click', closePopPlaces);
    popup__button_cerrar_perfil.addEventListener('click', closePopPerfil);
    
    trashs.forEach(trash => {
        trash.addEventListener('click', (e)=>{
            // console.log(e.target.parentElement);
            const element = e.target.parentElement
            element.remove()
    
        })
    });
}

function openPopPlaces() {
    popup_Element.classList.toggle('popup_opened');
}
function openPopPerfil() {
    popup_perfil.classList.toggle('popup_opened');
    nombre.value = titulo.textContent;
    aboutMe.value = subtitle.textContent;
}

function closePopPerfil() {
    popup_perfil.classList.toggle('popup_opened');

 }
function closePopPlaces() {
    popup_Element.classList.toggle('popup_opened');

}

function handleProfileFormSubmit(e) {
    e.preventDefault();

    let nameInput = document.querySelector('.popup__input_nombre');
    let jobInput = document.querySelector('.popup__input_about-me');

    // Obtén los valores de cada campo desde la propiedad de valor correspondiente
    // const titulo = document.querySelector('.profile__title');
    // const subtitle = document.querySelector('.profile__subtitle');


    // Selecciona los elementos donde se introducirán los valores de los campos

    // Inserta nuevos valores utilizando el textContent
     titulo.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopPerfil()
    // propiedad del método querySelector()
}