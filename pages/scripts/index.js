import { initialCards, editButton, addButton } from './consts.js';
import * as utils from './utils.js';

editButton.addEventListener('click', utils.openPopPerfil);
addButton.addEventListener('click', utils.openPopPlaces);

utils.cargarImagenes(initialCards);
// utils.init();
