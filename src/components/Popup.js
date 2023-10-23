class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.firstElementChild;
    this.BtnClose = this._popup.querySelector('.btnCerrar');
    this._eraseBtn = this;
  }

  _handleEscClose(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.close();
    }
  }

  _handleOutsideClick(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('btnCerrar')
    ) {
      this.close();
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
  }
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened', 'popup-animation');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.add('popup-cierre');
    // Espera a que termine la animación antes de eliminar la clase y ocultar el popup
    const animationDuration = 1000; // Duración de la animación en milisegundos
    setTimeout(() => {
      this._popup.classList.remove('popup-cierre', 'popup_opened');
    }, animationDuration);
    this._removeEventListeners();
  }
}

export default Popup;
