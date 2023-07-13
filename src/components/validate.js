
import {profileForm} from "./utils";

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
}

function enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
}

export const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
};


const setEventListeners = (formElement,
  popupSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('reset', () => {
        disableButton(buttonElement, inactiveButtonClass);
    });

    inputList.forEach((inputElement) => {
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};


export const enableValidation = (formsDataSet) => {
    const formList = Array.from(document.querySelectorAll(formsDataSet.popupSelector));

    formList.forEach((formElement) => {
        setEventListeners(
            formElement,
            formsDataSet.popupSelector,
            formsDataSet.inputSelector,
            formsDataSet.submitButtonSelector,
            formsDataSet.inactiveButtonClass,
            formsDataSet.inputErrorClass,
            formsDataSet.errorClass
        );
    });
};

export function validateInputs(inputList, select) {
    inputList.forEach((inputElement) => {
        const buttonElement = inputElement.closest(select.formSelector).querySelector(select.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, select.inactiveButtonClass);
        isValid(profileForm, inputElement, select.inputErrorClass, select.errorClass);
    })
}
