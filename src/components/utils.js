// ELEM
// profile
export const profile = document.querySelector(".profile");
export const profileTitle = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__description");
export const popupProfileOpenButton = profile.querySelector(
  ".profile__edit-button"
);
export const addMesto = profile.querySelector(".profile__add-mesto");
export const profileAvatar = profile.querySelector(".profile__avatar");
export const avatarOverlay = profile.querySelector(".profile__overlay");
export const avatarPencil = profile.querySelector(".profile__pencil");
// popup - form
export const popupForm = document.querySelector(".popup__form");
export const popupInput = popupForm.querySelector(".popup__input");
export const popupSubmit = popupForm.querySelector(".popup__submit");
export const inactiveButtonClass = popupForm.querySelector(
  ".popup__submit_inactive"
);
// popup - profile
export const popupProfile = document.querySelector("#profile-popup");
export const popupOpened = document.querySelector(".popup_opened");
export const profileForm = document.forms["profileForm"];
export const nameInput = profileForm.querySelector("#username-input");
export const jobInput = profileForm.querySelector("#description-input");
//popup - image
export const popupImage = document.querySelector("#image-popup");
export const imageFormSubmit = document.forms["imageForm"];
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
// popup - avatar
export const popupAvatar = document.querySelector("#avatar-popup");
export const avatarForm = document.forms["avatar"];
export const popupAvatarInput = avatarForm.querySelector("#popup-avatar-link");
export const popupAvatarSubmit = avatarForm.querySelector('#popup-avatar-submit')
// general
export const closeButtons = document.querySelectorAll(".popup__close");
// validation
export const validationSelectors = {
  popupSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: ".popup__input_error"
};
// array
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
