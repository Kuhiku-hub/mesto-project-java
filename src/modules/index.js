import '../pages/index.css';

import {createCard , addCard} from './card.js'

import {enableValidation , inputCheckEmpty} from './validate.js'

import {setEscButtonClose , setOverlayClickClose} from './popup.js'

import {profile,
  profileTitle,
  profileJob,
  popupProfileOpenButton,
  addMesto,
  popupForm,
  popupInput,
  popupProfile,
  popupOpened,
  profileForm,
  nameInput,
  jobInput,
  popupImage,
  imageFormSubmit,
  imageDescription,
  imageLink,
  cards,
  cardsContainer,
  popupZoom ,
  zoom,
  zoomContext,
  zoomContainer,
  closeButtons , initialCards , validationSelectors } from './utils.js'

  export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', setEscButtonClose);
    popup.addEventListener('mousedown', setOverlayClickClose);
  }

  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', setEscButtonClose);
    popup.removeEventListener('mousedown', setOverlayClickClose);
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

  initialCards.forEach((item) => {
    addCard(item, cardsContainer);
  });

  enableValidation(validationSelectors)

  imageFormSubmit.addEventListener("submit", submitCreateCardForm);

  addMesto.addEventListener("click", openImageForm);

  profileForm.addEventListener("submit", submitProfileForm);

  popupProfileOpenButton.addEventListener("click", openProfilePopup);
