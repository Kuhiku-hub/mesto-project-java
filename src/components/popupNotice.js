import { Popup } from "./popup.js";

class PopupNotice extends Popup {
  constructor(popupSelector, { callbackNotice }) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(".popup__form");
    this._callbackNotice = callbackNotice;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._callbackNotice(this._cardObject, this._cardId);
  }

  setEventListeners() {
    this._submitButton.addEventListeners("submit", this._handleSubmit);
    super.setEventListeners();
  }

  removeEventListeners() {
    this._submitButton.removeEventListeners("submit", this._handleSubmit);
    super.removeEventListeners();
  }
}

export { PopupNotice };
