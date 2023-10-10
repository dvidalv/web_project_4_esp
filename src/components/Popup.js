class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.firstElementChild;
    this.BtnClose = this._popup.querySelector('.btnCerrar');
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
    // this._popup.animation = 'zoomOut 1s 2';
    
    
    return this._popup;
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

  }
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);

  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.classList.add('popup-animation');
    this._setEventListeners();
    
  }

  close() {
    this._popup.classList.add('popup-cierre');
    this._removeEventListeners();
  
    // Espera a que termine la animación antes de eliminar la clase y ocultar el popup
    setTimeout(() => {
      this._popup.classList.remove('popup-cierre');
      this._popup.classList.remove('popup_opened');
    }, 1000); // Ajusta el tiempo de espera según la duración de la animación en CSS
  }
}

export default Popup;
