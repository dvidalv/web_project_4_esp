import { data } from 'autoprefixer';

class UserInfo {
  constructor({ nombre, job }) {
    this._nombre = document.querySelector(nombre);
    this._job = document.querySelector(job);
    this._inputTitle = document.querySelector('.popup__input_nombre');
    this._inputStittle = document.querySelector('.popup__input_about-me');
    this._avatar = document.querySelector('.profile__imagen');
  }
  getUserInfo() {
    const data = {
      nombre: this._nombre.textContent,
      job: this._job.textContent,
    };
    return data;
  }
  updateAvatar(avatar, name) {
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }

  setUserInfo({ name, about, _id }) {
    this._nombre.textContent = name;
    this._job.textContent = about;
    this._id = _id;
  }
}
export default UserInfo;
