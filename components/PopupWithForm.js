import Popup from './Popup.js';
import UserInfo from './UserInfo.js';

class PopupWithForm extends Popup {
  constructor({ getObget }, popupSelector) {
    super(popupSelector);
    this.getObget = getObget;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();

    this._close();
    this._popup.classList.remove('popup_opened');
  };

  _setEventListeners() {
    //Modifica el método padre
    super._setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  open() {
    super.open();
    this._setEventListeners();
    document.querySelector('body').classList.add('fix');
  }

  _close() {
    super._close();
    const newObj = this._getInputValues(); //get Data
    console.log(newObj)
    this.getObget(newObj); //ejecutamos el callback y le pasamos data
    const form = this._popup.firstElementChild;
    form.reset();
    document.querySelector('body').classList.remove('fix');
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._handleFormSubmit);
  }
}

export default PopupWithForm;
