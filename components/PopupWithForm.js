import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(callBack, popupSelector) {
    super(popupSelector);
    this._submitCallback = callBack;
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

  _newUser() {
    this._submitCallback(this._getInputValues());
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._newUser()
    this.close();
    this._popup.classList.remove('popup_opened');
  };

  _setEventListeners() {
    //Modifica el método padre
    super._setEventListeners();
    this._popup.addEventListener('click', this._handleOutsideClick);
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }
  
  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._handleFormSubmit);
  }

  open() {
    super.open();
    document.querySelector('body').classList.add('fix');
  }

  close() {
    super.close();
    const newObj = this._getInputValues(); //get Data

    //this.getObget(newObj); //ejecutamos el callback y le pasamos data
    const form = this._popup.firstElementChild;
    form.reset();
    document.querySelector('body').classList.remove('fix');

    this._removeEventListeners();
  }


}

export default PopupWithForm;
