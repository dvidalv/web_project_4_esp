const megusta = document.querySelectorAll('.card__imagen-corazon');
const trashs = document.querySelectorAll('.card__trash');

trashs.forEach(trash => {
    trash.addEventListener('click', (e)=>{
        // console.log(e.target.parentElement);
        const element = e.target.parentElement
        element.remove()

    })
});

// function borrar() {
//     console.log('borrando imagen');
// }