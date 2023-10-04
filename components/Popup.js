class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.closePopup();
    }
  }

  _handleOutsideClick(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('btnCerrar')
    ) {
      this.closePopup();
    }
  }

  _getPopup() {
    this._popup = document.querySelector(this._popupSelector);
    return this._popup;
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOutsideClick);
  }
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOutsideClick);
  }

  open() {
    this._getPopup();
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}

export default Popup;
