class Popup {
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector)
  }

  closePopup() {
    this._popupItem.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  openPopup() {
    this._popupItem.classList.add("popup_opened");
    this._addEventListeners();
  }

  handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  handleOverlayClose(event) {
    if (event.target === this._popupItem) {
      this.closePopup();
    }
  }

  addEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupItem.addEventListener("mousedown", this._handleOverlayClose);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupItem.removeEventListener("mousedown", this._handleOverlayClose);
  }
}

export {Popup};
