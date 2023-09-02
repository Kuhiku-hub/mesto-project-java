import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { onFormSubmit }) {
    super(popupSelector);
    this._onFormSubmit = onFormSubmit;
    this._popupForm = this._popupItem.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._submitButton = this._popupItem.querySelector(".popup__submit");
    this._submitButtonText = this._submitButton.textContent;

  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputItem) => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._onFormSubmit(this._getInputValues());
  }

  addEventListeners() {
    super.addEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  showSavingText() {
    this._submitButton.textContent = "Сохранение...";
  }

  restoreSubmitButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  closeAndReset() {
    super.close();
    this._popupForm.reset();
  }
}

export { PopupWithForm };
