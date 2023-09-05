function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", setEscButtonClose);
  popup.removeEventListener("mousedown", setOverlayClickClose);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", setEscButtonClose);
  popup.addEventListener("mousedown", setOverlayClickClose);
}

function setEscButtonClose(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function setOverlayClickClose(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}

export { setOverlayClickClose, setEscButtonClose, openPopup, closePopup };
