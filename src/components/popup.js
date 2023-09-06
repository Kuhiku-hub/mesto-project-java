class Popup {
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector)
  }

  closePopup() {
    this._popupItem.classList.remove("popup_opened");
    document.addEventListener('keydown', this._handleEscClose)
  }

  openPopup() {
    this._popupItem.classList.add("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }

}

export {Popup};

