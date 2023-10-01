import Popup from './Popup.js';
import { divTemp, overlay, body } from '../utils/consts.js';
import { closeImageByClick, closeImageByScape } from '../utils/utils.js';

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
    overlay.addEventListener('click', closeImageByClick);
    document.addEventListener('keydown', closeImageByScape);

    //Agrefgando la clase de fix al body
    body.classList.add('fix');
  }
  open() {
    divTemp.innerHTML = '';
    super.open();
    this._selectImagen();
  }
}

export default PopupWithImage;
