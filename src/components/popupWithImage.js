import { Popup } from "./popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._descriptionElement = this._popupItem.querySelector(".popup__context");
    this._imageElement = this._popupItem.querySelector(".popup__zoom");
  }

  openWithImage(description, imageUrl) {
    this._descriptionElement.textContent = description;
    this._imageElement.src = imageUrl;
    this._imageElement.alt = description;
    super.open();
  }
}

export { PopupWithImage };
