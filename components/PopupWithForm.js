import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
class PopupWithForm extends Popup {
  constructor({ data, info }, popupSelector) {
    super(popupSelector);
    this._info = info;
    this._nombre = data.nombre;
    this._job = data.job;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _getInputValues() {
    //recopila datos de todos los campos de entrada.
    // Obtiene los elementos de todos los campos
    this._inputList = this._popup.querySelectorAll('.popup__input');

    // Crea un objeto vacío
    this._formValues = {};

    // Agrega los valores de los campos a este objeto
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Devuelve el objeto values
    return this._formValues;
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const objValues = this._getInputValues();


    const nombre = document.querySelector(this._nombre);
    const job = document.querySelector(this._job);

    nombre.textContent = objValues.nombre;
    job.textContent = objValues.job;

    this._popup.classList.remove('popup_opened');
  }
  open() {
    super.open();
    // this._handleFormSubmit();
    this._setEventListeners();
    document.querySelector('body').classList.add('fix');
    this._info();
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._handleFormSubmit);
  }

  _setEventListeners() {
    //Modifica el método padre
    super._setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      this._handleFormSubmit(e);
    });
  }
  addImage(){
    this._getPopup();
    this._popup.classList.add('popup_opened');
    console.log(this._popup)
  }
}

export default PopupWithForm;
