class UserInfo {
  constructor(nombre, job) {
    this._nombre = nombre;
    this._job = job;
  }
  getUserInfo() {
    //Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto
    const nombre = document.querySelector(this._nombre).textContent;
    const job = document.querySelector(this._job).textContent;
  }
  setUserInfo() {
    //toma los datos del nuevo usuario y los agrega en la página.
  }
}
