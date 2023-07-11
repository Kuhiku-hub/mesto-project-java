import {popupSubmit , popupInput} from './utils.js'

export function inputCheckEmpty() {
  if (popupInput.value === '' || !popupInput.checkValidity()) {
    popupSubmit.classList.add('popup__submit_inactive')
    popupSubmit.disabled = true
  } else {
    popupSubmit.classList.remove('popup__submit_inactive')
    popupSubmit.disabled = false
  }
}

popupInput.addEventListener('input' , inputCheckEmpty)

const showInputError = (popupSelector, inputSelector, inputErrorClass) => {
  const inputElement = popupSelector.querySelector(inputSelector);
  const errorElement = popupSelector.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(inputErrorClass);
};

const hideInputError = (popupSelector, inputSelector, inputErrorClass) => {
  const inputElement = popupSelector.querySelector(inputSelector);
  const errorElement = popupSelector.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = ''; // Clear the error message
  errorElement.classList.remove(inputErrorClass);
};

const disableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.classList.add(inactiveButtonClass);
  submitButtonSelector.disabled = true;
};

const enableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.classList.remove(inactiveButtonClass);
  submitButtonSelector.disabled = false;
};

const isValid = (popupSelector, inputSelector, inputErrorClass, errorClass) => {
  const inputElement = popupSelector.querySelector(inputSelector);
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
  if (!pattern.test(inputElement.value)) {
  showInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
  } else {
    hideInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
}
};

const hasInvalidInput = (inputList ) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
};

const toggleButtonState = (popupSelector, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(popupSelector.querySelectorAll(inputSelector));
  if (hasInvalidInput(inputList)) {
    disableButton(submitButtonSelector, inactiveButtonClass);
  } else {
    enableButton(submitButtonSelector, inactiveButtonClass);
  }
};

const setEventListeners = (popupSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(popupSelector.querySelectorAll(inputSelector));
  const buttonElement = popupSelector.querySelector(submitButtonSelector);

  popupSelector.addEventListener('reset', () => {
    disableButton(buttonElement, inactiveButtonClass);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      if (inputElement.id === 'username-input') {
        validateField(inputElement, popupSelector.querySelector(`#${inputElement.id}-error`), {
          required: true,
          pattern: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/,
          customErrorMessage: 'Имя должно содержать от 2 до 40 символов и может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.'
        });
      } else if (inputElement.id === 'description-input') {
        validateField(inputElement, popupSelector.querySelector(`#${inputElement.id}-error`), {
          required: true,
          minLength: 2,
          maxLength: 200,
          customErrorMessage: 'О себе должно содержать от 2 до 200 символов.'
        });
      } else if (inputElement.id === 'popup-image-name') {
        validateField(inputElement, popupSelector.querySelector(`#${inputElement.id}-error`), {
          required: true,
          pattern: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/,
          customErrorMessage: 'Название должно содержать от 2 до 30 символов и может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.'
        });
      } else if (inputElement.id === 'popup-image-link') {
        validateField(inputElement, popupSelector.querySelector(`#${inputElement.id}-error`), {
          required: true,
          pattern: /^(ftp|http|https):\/\/[^ "]+$/,
          customErrorMessage: 'Пожалуйста , введите ссылку.'
        });
      }
      toggleButtonState(popupSelector, inputSelector, submitButtonSelector, inactiveButtonClass);
    });
  });
};

export const enableValidation = (formsDataSet) => {
  const formList = Array.from(document.querySelectorAll(formsDataSet.popupSelector));

    formList.forEach((popupForm) => {
        setEventListeners(
          popupForm,
          formsDataSet.popupSelector,
          formsDataSet.inputSelector,
          formsDataSet.submitButtonSelector,
          formsDataSet.inactiveButtonClass,
          formsDataSet.inputErrorClass,
          formsDataSet.errorClass
        );
    });
};

export const validateInputs = (popupSelector, inputSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(popupSelector.querySelectorAll(inputSelector));

  inputList.forEach((inputSelector) => {
    if (!inputSelector.validity.valid) {
      showInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
    } else {
      hideInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
    }
  });
};


