// ELEM
// profile
export const profile = document.querySelector(".profile");
export const profileTitle = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__description");
export const editButton = profile.querySelector(".profile__edit-button");
export const addMesto = profile.querySelector(".profile__add-mesto");
// popup - form
export const popupForm = document.querySelector('.popup__form');
export const popupInput = popupForm.querySelector('.popup__input')
// popup - profile
export const popupProfile = document.querySelector("#profile-popup");
export const popupOpened = document.querySelector('.popup_opened');
export const profileForm = document.forms["profileForm"];
export const nameInput = profileForm.querySelector("#username-input");
export const jobInput = profileForm.querySelector("#description-input");
//popup - image
export const popupImage = document.querySelector("#image-popup");
export const imageFormSubmit = document.forms["imageForm"]
export const imageDescription = popupImage.querySelector("#popup-image-name");
export const imageLink = popupImage.querySelector("#popup-image-link");
// cards
export const cards = document.querySelector("#cards-template");
export const cardsContainer = document.querySelector("#cards-container");
// zoom picture
export const popupZoom = document.querySelector("#popup-zoom");
export const zoom = popupZoom.querySelector(".popup__zoom");
export const zoomContext = popupZoom.querySelector(".popup__context");
export const zoomContainer = popupZoom.querySelector(".popup__zoom-container");
// general
export const closeButtons = document.querySelectorAll('.popup__close');
// validation
export const validationSelectors = {
  popupSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__input_type-visible',
};
