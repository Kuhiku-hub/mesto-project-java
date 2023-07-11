import {profileForm , imageFormSubmit , nameInput , jobInput , imageDescription , imageLink , popupProfile , popupImage , zoom , zoomContext , zoomContainer , popupZoom } from "./utils.js"

import {addMesto , editButton , closeButtons , profileTitle , profileJob , cardsContainer } from './utils.js'

import {createCard} from './card.js'

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', setEscButtonClose);
  popup.addEventListener('click', setOverlayClickClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscButtonClose);
  popup.removeEventListener('click', setOverlayClickClose);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openProfilePopup() {
  openPopup(popupProfile)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopupProfile() {
  closePopup(popupProfile)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

// функция изменения персональных данных
function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupProfile();
}

function openImageForm() {
  openPopup(popupImage)
}

function closeImageForm() {
  closePopup(popupImage);
}

function submitCreateCardForm(evt) {
  evt.preventDefault();
  const newCardDefault = {
    link: imageLink.value,
    name: imageDescription.value,
    alt: imageDescription.value,
  };
  const formCard = createCard(newCardDefault);
  cardsContainer.prepend(formCard)
  imageLink.value = "";
  imageDescription.value = "";
  closeImageForm();
}

function setEscButtonClose(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
      closePopup(popupOpened);
  }
}

function setOverlayClickClose(event) {
  if (event.target.classList.contains('popup_opened')) {
      closePopup(event.target);
  }
}

imageFormSubmit.addEventListener("submit", submitCreateCardForm);

addMesto.addEventListener("click", openImageForm);

profileForm.addEventListener("submit", submitProfileForm);

editButton.addEventListener("click", openProfilePopup);

export {openPopup , closePopup , submitCreateCardForm}
