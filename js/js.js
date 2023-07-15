const megusta = document.querySelectorAll('.card__imagen-corazon');
const addButton = document.querySelector('.add-button');
const trashs = document.querySelectorAll('.card__trash');

const popup_places = document.querySelector('.popup_places');
const popup_perfil = document.querySelector('.popup_perfil');

const edit_button = document.querySelector('.edit-button');
const popup__button_cerrar_places = document.querySelector('.popup__button-cerrar-places');
const popup__button_cerrar_perfil = document.querySelector('.popup__button-cerrar-perfil');

adeventlisteners();
function adeventlisteners() {
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
    popup_places.classList.toggle('popup_opened');
}
function openPopPerfil() {
    popup_perfil.classList.toggle('popup_opened');
}

function closePopPerfil() {
    popup_perfil.classList.toggle('popup_opened');

 }
function closePopPlaces() {
    popup_places.classList.toggle('popup_opened');

}





// function borrar() {
//     console.log('borrando imagen');
// }