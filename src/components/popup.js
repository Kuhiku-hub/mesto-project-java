class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    this._addEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  _handleOverlayClose(event) {
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
