class FormValidator {
  constructor(formsDataSet) {
    this._selector = formsDataSet.popupSelector;
    this._inputSelector = formsDataSet.inputSelector;
    this._submitButtonSelector = formsDataSet.submitButtonSelector;
    this._inactiveButtonClass = formsDataSet.inactiveButtonClass;
    this._inputErrorClass = formsDataSet.inputErrorClass;
    this._errorClass = formsDataSet.errorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState(formElement, inputList) {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    buttonElement.disabled = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    buttonElement.classList.toggle(
      this._inactiveButtonClass,
      buttonElement.disabled
    );
  }

  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );

    formElement.addEventListener("reset", () => {
      inputList.forEach((inputElement) =>
        this._hideInputError(formElement, inputElement)
      );
      this._toggleButtonState(formElement, inputList);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(formElement, inputList);
      });
    });
  }

  resetValidate() {
    this._inputList.forEach((inputItem) => {
      this._hideValidationError(inputItem);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._selector));
    formList.forEach((formElement) => this._setEventListeners(formElement));
  }

  validateInputs(inputList) {
    inputList.forEach((inputElement) => {
      const formElement = inputElement.form;
      this._checkInputValidity(formElement, inputElement);
    });
    this._toggleButtonState(formElement, inputList);
  }
}

export { FormValidator };
