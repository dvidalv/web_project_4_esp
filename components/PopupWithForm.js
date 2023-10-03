import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
class PopupWithForm extends Popup {
  constructor({ data, handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.nombre = data.nombre;
    this.job = data.job;
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

    const nombre = document.querySelector(this.nombre);
    const job = document.querySelector(this.job);

    nombre.textContent = objValues.nombre;
    job.textContent = objValues.job;

    this._popup.classList.remove('popup_opened');
  }
  open() {
    const titulo = document.querySelector('.popup__input_nombre');
    titulo.setAttribute('autofocus', true);
    super.open();
    this.handleFormSubmit();
    document.querySelector('body').classList.add('fix');
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this.handleFormSubmit);
  }

  setEventListeners() {
    //Modifica el método padre
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }
}
export default PopupWithForm;
