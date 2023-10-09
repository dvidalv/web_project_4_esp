class UserInfo {
  constructor({ nombre, job }) {
    this._nombre = document.querySelector(nombre);
    this._job = document.querySelector(job);
    this._inputTitle  = document.querySelector('.popup__input_nombre');
    this._inputStittle = document.querySelector('.popup__input_about-me');
  }
  getUserInfo() {
    const data = {
      nombre: this._nombre.textContent,
      job: this._job.textContent,
    };
    return data;
  }
  
  setUserInfo({nombre, job}) {
    this._nombre.textContent = nombre;
    this._job.textContent = job;
  }
}
export default UserInfo;
