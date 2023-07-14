import "../pages/index.css";

import {
  userInfo,
  getServerCards,
  avatarPictureDefault,
  profileDataDefault,
  postCard,
} from "./api.js";

import { createCard} from "./card.js";

import {enableValidation , validateInputs} from "./validate.js";

import { openPopup , closePopup} from "./popup.js";

import {
  profile,
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
  popupZoom,
  zoom,
  zoomContext,
  zoomContainer,
  closeButtons,
  initialCards,
  validationSelectors,
  popupAvatar,
  popupAvatarInput,
  avatarOverlay,
  avatarPencil,
  profileAvatar,
  popupSubmit,
  popupAvatarSubmit
} from "./utils.js";

let userId = null;

function setDefaultValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}


function updateProfileInfo(data) {
  profileTitle.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
}

function createCards(cards) {
  const fragment = document.createDocumentFragment();
  cards.forEach((card) => {
    const cardElement = createCard(card, userId);
    fragment.append(cardElement);
  });
  cardsContainer.append(fragment);
}

function renderPage() {
  const profile = userInfo();
  const cards = getServerCards();
  Promise.all([profile, cards])
    .then((results) => {
      const [profileData, cardsData] = results;
      userId = profileData._id;
      updateProfileInfo(profileData);
      createCards(cardsData);
    })
    .catch((err) => console.log(err));
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileForm.textContent = 'Сохранение...';
  profileDataDefault()
      .then(data => {
          profileTitle.textContent = (data.name === '') ? profileTitle.textContent : data.name;
          profileJob.textContent = (data.about === '') ? profileJob.textContent : data.about;
          closePopupProfile(evt.target.closest('.popup'));
      })
      .catch(err => console.log(err))
      .finally(() => {
          profileForm.textContent = 'Сохранить';
      })
}


function handleSubmitAvatarProfileForm(evt) {
  evt.preventDefault();
  popupAvatarSubmit.textContent = "Сохранение...";
  const avatarLink = popupAvatarInput.value;
  avatarPictureDefault(avatarLink)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url("${data.avatar}")`;
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatarSubmit.textContent = "Сохранить";
    });
}

function handleSubmitPlaceForm(evt) {
  evt.preventDefault();
  imageFormSubmit.textContent = "Сохранение...";
  postCard(imageDescription.value, imageLink.value)
    .then((data) => {
      const card = createCard(data, userId);
      cardsContainer.prepend(card);
      closePopup(evt.target.closest(".popup"));
      evt.target.reset()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      imageFormSubmit.textContent = "Сохранить";
    });
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function openProfilePopup() {
  openPopup(popupProfile);
  setDefaultValues();
}

function openImageForm() {
  openPopup(popupImage);
}

function closeImageForm() {
  closePopup(popupImage);
}

function openAvatarForm() {
  openPopup(popupAvatar);
}

function closeAvatarForm() {
  closePopup(popupAvatar);
}

function addCard(item) {
  const card = createCard(item);
  cardsContainer.prepend(card)
}

initialCards.forEach((item) => {
  addCard(item, cardsContainer);
});

renderPage();


enableValidation(validationSelectors);

avatarPencil.addEventListener("click", openAvatarForm);

popupAvatarSubmit.addEventListener('submit' , handleSubmitAvatarProfileForm)

imageFormSubmit.addEventListener("submit", handleSubmitPlaceForm);

addMesto.addEventListener("click", openImageForm);

profileForm.addEventListener("submit", handleSubmitProfileForm);

popupProfileOpenButton.addEventListener("click", openProfilePopup);
