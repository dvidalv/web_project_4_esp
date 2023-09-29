import { initialCards, editButton, addButton } from '../../utils/consts.js';
import * as utils from '../../utils/utils.js';

editButton.addEventListener('click', utils.openPopPerfil);
addButton.addEventListener('click', utils.openPopPlaces);

utils.renderElements(initialCards);
// utils.init();
