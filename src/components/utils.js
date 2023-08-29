// validation
export const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: ".popup__input_error",
};
// Api
export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-26",
  headers: {
    authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
    "Content-Type": "application/json",
  },
};
// General
export const profileEditingButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-mesto");
export const popupProfile = document.querySelector("#popup-profile");
export const profileForm = popupProfile.querySelector("#popup-profile-form");
export const popupAddCard = document.querySelector("#popup-image");
export const formAddCard = popupAddCard.querySelector("#popup-image-form");
export const profileFormNameInput =
  popupProfile.querySelector("#username-input");
export const profileFormAboutInput =
  popupProfile.querySelector("#description-input");
export const popupAvatar = document.querySelector("#popup-avatar");
export const popupAvatarEditForm =
  popupAvatar.querySelector("#popup-avatar-form");
export const iconAvatarEdit = document.querySelector(".profile__pencil");
