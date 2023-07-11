import {profileForm , validationSelectors } from './utils.js'

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
  errorElement.textContent = 'Чувак это бебра';
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
  if (hasInvalidInput(popupSelector, inputSelector)) {
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

  inputList.forEach((inputSelector) => {
    const pattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
    if (!pattern.test(inputSelector.value)) {
    showInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
    } else {
    hideInputError(popupSelector, inputSelector, inputErrorClass, errorClass);
    }
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


