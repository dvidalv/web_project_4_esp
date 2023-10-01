import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ data, getUser }, popupSelector) {
    super(popupSelector);
    this.getUser = getUser;
    this.data = data;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _getInputValues(data) {
    //recopila datos de todos los campos de entrada.
    // Obtiene los elementos de todos los campos
    this._inputList = this._popup.querySelectorAll('.form__input');

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
