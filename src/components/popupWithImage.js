import { Popup } from "./popup.js";

class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._descriptionElement = this._popupElement.querySelector(".popup__context");
    this._imageElement = this._popupElement.querySelector(".popup__zoom");
  }

  openWithImage(description, imageUrl) {
    this._descriptionElement.textContent = description;
    this._imageElement.src = imageUrl;
    this._imageElement.alt = description;
    super.open();
  }
}

export { PopupWithImage };
