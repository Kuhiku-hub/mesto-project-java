class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    this._addEventListeners();
  }

  handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  handleOverlayClose(event) {
    if (event.target === this._popupElement) {
      this.closePopup();
    }
  }

  addEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("mousedown", this._handleOverlayClose);
  }
}

export {Popup};
