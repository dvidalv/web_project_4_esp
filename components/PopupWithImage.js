import Popup from './Popup.js';
import { divTemp, overlay, body } from '../utils/consts.js';
class PopupWithImage extends Popup {
  constructor({ src, alt }, popupSelector) {
    super(popupSelector);
    this._src = src;
    this._alt = alt;
  }
  _selectImagen() {
    divTemp.classList.add('overlay__divTemp');
    const img = document.createElement('img');
    img.src = this._src;
    img.alt = this._alt;
    img.classList.add('overlay-image__image');

    //Agregando la imagen al divTemp
    divTemp.append(img);

    //Creando el boton de cerrar popup
    const btnCerrar = document.createElement('img');
    btnCerrar.src = '../imagenes/Close-Icon.svg';
    btnCerrar.classList.add('btnCerrar', 'btnCerrar_overlay');
    //Insertando el boton cerrar al divTemp
    divTemp.insertAdjacentElement('beforeend', btnCerrar);
    divTemp.style.animation = 'zoomIn 1s forwards';

    //Creando el overlay
    overlay.appendChild(divTemp);
    overlay.classList.add('overlay');
    body.append(overlay);
    // overlay.addEventListener('click', closeImageByClick);
    document.addEventListener('keydown', this._closeImageByScape);

    //Agrefgando la clase de fix al body
    body.classList.add('fix');
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

    divTemp.style.animation = 'zoomOut .7s forwards';
    setTimeout(() => {
      overlay.classList.remove('overlay');
      img.remove();
      btn.remove();
    }, '1000');
    body.classList.remove('fix');
    document.removeEventListener('keydown', this._closeImageByScape);
    this.close();
  }

  _setEventListeners() {
    super._setEventListeners();
    document.addEventListener('click', this._closeImageByClick);
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

// const closeImageByScape = (e) => {
//   if (e.key === 'Escape') {
//     cerrarImagenGallery();
//   }
