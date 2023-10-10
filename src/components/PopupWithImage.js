import Popup from './Popup.js';
import { divTemp, overlay, body } from '../utils/consts.js';
import btn from '../images/Close-icon.svg';

const OVERLAY_DIV_TEMP_CLASS = ['overlay__divTemp', 'popup_opened'];
const OVERLAY_IMAGE_CLASS = 'overlay-image__image';
const BTN_CERRAR_CLASSES = ['btnCerrar', 'btnCerrar_overlay'];
const OVERLAY_CLASS = 'overlay';
const FIX_CLASS = 'fix';

class PopupWithImage extends Popup {
  constructor({ src, alt }, popupSelector) {
    super(popupSelector);
    this._src = src;
    this._alt = alt;
  }
  _createImageElement(src, alt, classes) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add(...classes);
    return img;
  }

  _selectImagen() {
    divTemp.classList.add(OVERLAY_DIV_TEMP_CLASS);

    const img = this._createImageElement(this._src, this._alt, [
      OVERLAY_IMAGE_CLASS,
    ]);
    divTemp.append(img);

    const btnCerrar = this._createImageElement(btn, '', BTN_CERRAR_CLASSES);
    divTemp.insertAdjacentElement('beforeend', btnCerrar);

    const titulo = document.createElement('p');
    titulo.textContent = this._alt;
    titulo.classList.add('titulo_imagen');
    divTemp.append(titulo);

    divTemp.style.animation = 'zoomIn 1s forwards';

    overlay.appendChild(divTemp);
    overlay.classList.add(OVERLAY_CLASS);
    body.append(overlay);

    body.classList.add(FIX_CLASS);
  }

  _closeImageByClick = (e) => {
    if (
      e.target.classList.contains('btnCerrar') ||
      e.target.classList.contains('overlay')
    ) {
      this._cerrarImagenGallery();
    }
  };

  _closeImageByScape = (e) => {
    if (e.key === 'Escape') {
      this._cerrarImagenGallery();
    }
  };

  _cerrarImagenGallery() {
    const img = divTemp.querySelector('.overlay-image__image');
    const btn = divTemp.querySelector('.btnCerrar');
    const titulo = document.querySelector('.titulo_imagen');

    setTimeout(() => {
      overlay.classList.remove('overlay');
      img.remove();
      btn.remove();
      titulo.remove();
    }, '1000');
    body.classList.remove('fix');
    document.removeEventListener('keydown', this._closeImageByScape);
    this.close();
  }

  _setEventListeners() {
    super._setEventListeners();
    document.addEventListener('click', this._closeImageByClick);
    document.addEventListener('keydown', this._closeImageByScape);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
  };
  open() {
    super.open();
    this._selectImagen();
  }
}

export default PopupWithImage;
