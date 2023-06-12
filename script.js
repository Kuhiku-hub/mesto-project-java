let popup = document.querySelector("#profile-popup");
let popupImage = document.querySelector("#image-popup");
let popupZoom = document.querySelector("#popup-zoom");
let profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__name");
let profileJob = profile.querySelector(".profile__description");
const cards = document.querySelector("#cards-template");
const cardsContainer = document.querySelector("#cards-container");
const editButton = profile.querySelector(".profile__edit-button");
const closeProfile = popup.querySelector("#popup-profile-close");
const closeImageForm = popupImage.querySelector("#popup-image-close");
const closeZoomImage = popupZoom.querySelector("#popup-zoom-close");
const addMesto = profile.querySelector(".profile__add-mesto");
const formElement = popup.querySelector("#popup-profile-form");
const imageFormElement = popupImage.querySelector("#popup-image-submit");
let nameInput = formElement.querySelector("#username-input");
let jobInput = formElement.querySelector("#description-input");
const imageDescription = popupImage.querySelector("#popup-image-name");
const imageLink = popupImage.querySelector("#popup-image-link");
let zoom = popupZoom.querySelector(".popup__zoom");
let zoomContext = popupZoom.querySelector(".popup__context");
const zoomContainer = popupZoom.querySelector(".popup__zoom-container");

function openPopupProfile() {
  popup.classList.add("popup_opened");
}

function closePopupProfile() {
  popup.classList.remove("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener("click", openPopupProfile);
closeProfile.addEventListener("click", closePopupProfile);

// функция изменения персональных данных
function submitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupProfile();
}

function openPopupImageForm() {
  popupImage.classList.add("popup_opened");
}

function closePopupImageForm() {
  popupImage.classList.remove("popup_opened");
  imageDescription.value = "";
  imageLink.value = "";
}

addMesto.addEventListener("click", openPopupImageForm);

closeImageForm.addEventListener("click", closePopupImageForm);

formElement.addEventListener("submit", submitForm);

const initialCards = [
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

const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

function render() {
  cardsInfo.forEach(renderCard);
}

function liked(event) {
  event.target.classList.toggle("cards__like_active");
}

// общая функция создания карточек
function renderCard({ name, link }) {
  const cardsItem = cards.querySelector(".cards__item").cloneNode(true);
  cardsItem.querySelector(".cards__description").textContent = name;
  cardsItem.querySelector(".cards__image").alt = `На картинке ${name}`;
  cardsItem.querySelector(".cards__image").src = link;
  cardsItem.querySelector(".cards__like").addEventListener("click", liked);
  cardsItem
    .querySelector(".cards__trash")
    .addEventListener("click", deleteCard);
  cardsItem.querySelector(".cards__image").addEventListener("click", openZoom);
  cardsContainer.prepend(cardsItem);
  return cardsItem;
}

render();

imageFormElement.addEventListener("click", createCardSubmit);

// добавление карточек через addMesto
function createCardSubmit(evt) {
  evt.preventDefault();
  const newCardDefault = {
    link: imageLink.value,
    name: imageDescription.value,
    alt: imageDescription.value,
  };
  const formCard = renderCard(newCardDefault);
  imageLink.value = "";
  imageDescription.value = "";
  cardsContainer.prepend(formCard);
  closePopupImageForm();
}
// удаление карточки
function deleteCard() {
  const revCard = cardsContainer
    .querySelector(".cards__trash")
    .closest(".cards__item");
  revCard.remove();
}

function openPopupZoom() {
  popupZoom.classList.add("popup_opened");
}

function closePopupZoom() {
  popupZoom.classList.remove("popup_opened");
}

// функция замены значений карточки
function openZoom(evt) {
  const clickedCard = evt.target.closest(".cards__item");
  const clickedCardImage = clickedCard.querySelector(".cards__image");
  const clickedCardDescription = clickedCard.querySelector(
    ".cards__description"
  );
  openPopupZoom();
  zoom.src = clickedCardImage.src;
  zoom.alt = clickedCardImage.alt;
  zoomContext.textContent = clickedCardDescription.textContent;
}

closeZoomImage.addEventListener("click", closePopupZoom);
