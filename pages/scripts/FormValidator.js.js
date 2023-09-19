
class FormValidator {
  constructor(objConfig, formElement){

  }
  validando(){
    console.log('validando')
  }
  
}



function enableValidation(objConf, formElement) {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  setEventListeners(objConf, formElement);
}

const setEventListeners = (
  { inputSelector, submitButtonSelector },
  formElement
) => {
  const spanError = document.querySelectorAll('.form-input-error');
  if (spanError) {
    spanError.forEach((error) => error.remove());
  }
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    //Creamos el spanError y lo agregamos al DOM
    const spanErron = document.createElement('span');
    spanErron.classList.add(`${inputElement.id}-error`, 'form-input-error');
    inputElement.after(spanErron);
    inputElement.addEventListener('input', () => {
      isValid(spanErron, inputElement);
      // Llama a toggleButtonState() y pásale un array de campos y el botón
      toggleButtonState(inputList, submitButton);
    });
  });
};

const isValid = (spanErron, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(spanErron, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(spanErron, inputElement);
  }
};

const showInputError = (spanErron, inputElement, errorMessage) => {
  const errorElement = spanErron;
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};
const hideInputError = (spanErron, inputElement) => {
  const errorElement = spanErron;
  // console.log(errorElement)
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};
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
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

export {enableValidation, FormValidator}
