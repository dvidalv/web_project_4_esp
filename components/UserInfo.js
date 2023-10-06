class UserInfo {
  constructor({ nombre, job }) {
    this._nombre = document.querySelector(nombre).textContent;
    this._job = document.querySelector(job).textContent;
  }
  getUserInfo() {
    //Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto
    // const nombre = document.querySelector(this._nombre).textContent;
    // const job = document.querySelector(this._job).textContent;
    const data = {
      nombre: this._nombre,
      job: this._job,
    };
    return data;
  }
  setUserInfo() {
    //toma los datos del nuevo usuario y los agrega en la página.
    const titulo = document.querySelector('.popup__input_nombre');
    const aboutMe = document.querySelector('.popup__input_about-me');

    titulo.value = this._nombre;

    aboutMe.value = this._job;
  }
}
export default UserInfo;
