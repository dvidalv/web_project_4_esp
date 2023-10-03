class UserInfo {
  constructor({ nombre, job }) {
    this._nombre = nombre;
    this._job = job;
  }
  getUserInfo() {
    //Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto
    const nombre = document.querySelector(this._nombre).textContent;
    const job = document.querySelector(this._job).textContent;
    const data = {
      nombre: nombre,
      job: job,
    };
    return data;
  }
  setUserInfo({ nombre, job }) {
    //toma los datos del nuevo usuario y los agrega en la página.
    const titulo = document.querySelector('.popup__input_nombre');
    const aboutMe = document.querySelector('.popup__input_about-me');

    titulo.value = nombre;

    aboutMe.value = job;
  }
}
export default UserInfo;
