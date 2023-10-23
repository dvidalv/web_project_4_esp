class FormValidator {
  constructor(objConfig, formElement) {
    this._formElement = formElement;
    this._objConfig = objConfig;
  }

  enableValidation(objConfig, formElement) {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners(this._objConfig, this._formElement);
  }

  _setEventListeners = ({ inputSelector, submitButtonSelector }) => {
    const spanError = document.querySelectorAll('.form-input-error');
    if (spanError) {
      spanError.forEach((error) => error.remove());
    }
    const inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );

    const submitButton = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      //Creamos el spanError y lo agregamos al DOM
      const spanErron = document.createElement('span');
      spanErron.classList.add(`${inputElement.id}-error`, 'form-input-error');
      inputElement.after(spanErron);
      inputElement.addEventListener('input', () => {
        this._isValid(spanErron, inputElement);
        // Llama a toggleButtonState() y pásale un array de campos y el botón
        this._toggleButtonState(inputList, submitButton);
      });
    });
  };

  _isValid = (spanErron, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        spanErron,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(spanErron, inputElement);
    }
  };

  _showInputError = (spanErron, inputElement, errorMessage) => {
    const errorElement = spanErron;
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  _hideInputError = (spanErron, inputElement) => {
    const errorElement = spanErron;
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };
  _toggleButtonState = (inputList, buttonElement) => {
    // Si hay al menos una entrada que no es válida
    if (this._hasInvalidInput(inputList)) {
      // hace que el botón esté inactivo
      buttonElement.classList.add('form__submit_inactive');
      buttonElement.setAttribute('disabled', true);
    } else {
      // en caso contrario, lo hace activo
      buttonElement.classList.remove('form__submit_inactive');
      buttonElement.removeAttribute('disabled');
    }
  };
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
}

export default FormValidator;
