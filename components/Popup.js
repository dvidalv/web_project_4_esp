class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._close();
    }
  }

  _handleOutsideClick(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('btnCerrar')
    ) {
      this._close();
    }
  }
  _handleFormSubmit(e) {
    e.preventDefault();
  }

  _getPopup() {
    this._popup = document.querySelector(this._popupSelector);
    return this._popup;
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOutsideClick);
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOutsideClick);
    this._popup.removeEventListener('submit', this._handleFormSubmit);
  }

  open() {
    this._getPopup();
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  _close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
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
}

export default Popup;
