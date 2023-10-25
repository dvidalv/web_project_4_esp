import Popup from './Popup.js';
import { divTemp, overlay, body } from '../utils/consts.js';
import btn from '../images/Close-icon.svg';

const CLASSES = {
  OVERLAY_DIV_TEMP: ['overlay__divTemp', 'popup_opened'],
  OVERLAY_IMAGE: 'overlay-image__image',
  BTN_CERRAR: ['btnCerrar', 'btnCerrar_overlay'],
  OVERLAY: 'overlay',
  FIX: 'fix',
  TITULO_IMAGEN: 'titulo_imagen'
};

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _createImageElement(src, alt, classes) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add(...classes);
    return img;
  }

  _selectImagen() {
    divTemp.classList.add(...CLASSES.OVERLAY_DIV_TEMP);

    const img = this._createImageElement(this._src, this._alt, [CLASSES.OVERLAY_IMAGE]);
    divTemp.append(img);

    const btnCerrar = this._createImageElement(btn, '', CLASSES.BTN_CERRAR);
    divTemp.insertAdjacentElement('beforeend', btnCerrar);

    const titulo = document.createElement('p');
    titulo.textContent = this._alt;
    titulo.classList.add(CLASSES.TITULO_IMAGEN);
    divTemp.append(titulo);

    divTemp.style.animation = 'zoomIn 1s forwards';

    overlay.appendChild(divTemp);
    overlay.classList.add(CLASSES.OVERLAY);
    body.append(overlay);

    body.classList.add(CLASSES.FIX);
  }

  _closeImageByClick = (e) => {
    if (e.target.classList.contains('btnCerrar') || e.target.classList.contains('overlay')) {
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
    document.removeEventListener('click', this._closeImageByClick);
  };

  open(callBack) {
    const { src, alt } = callBack();
    this._src = src;
    this._alt = alt;
    super.open();
    this._selectImagen();
  }
}

export default PopupWithImage;
