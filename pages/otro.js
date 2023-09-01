const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      // Llama a toggleButtonState() y pásale un array de campos y el botón
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
    // console.log(formElement);
  });
};
enableValidation();

// La función toma un array formado por los campos de entrada
// y el elemento botón, que debe cambiar su estado
const toggleButtonState = (inputList, buttonElement) => {
  // Si hay al menos una entrada que no es válida
  if (hasInvalidInput(inputList)) {
    // hace que el botón esté inactivo
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    // en caso contrario, lo hace activo
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.removeAttribute('disabled');
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
		console.log(inputElement)
    return !inputElement.validity.valid;
  });
};
