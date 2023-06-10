let popup = document.querySelector("#profile-popup");
let popupImage = document.querySelector("#image-popup");
let popupZoom = document.querySelector("#popup__zoom");
let profile = document.querySelector(".profile");
let profileTitle = profile.querySelector(".profile__name");
let profileJob = profile.querySelector(".profile__description");
const cards = document.querySelector("#cards-template");
const editButton = profile.querySelector(".profile__edit-button");
const closeProfile = popup.querySelector("#popup-profile-close");
const closeImageForm = popupImage.querySelector("#popup-image-close");
const addMesto = profile.querySelector(".profile__add-mesto");
const formElement = popup.querySelector("#popup-profile-form");
const imageFormElement = popupImage.querySelector("#popup-image-submit");
const nameInput = formElement.querySelector("#username-input");
const jobInput = formElement.querySelector("#description-input");
const imageDescription = popupImage.querySelector("#popup-image-name");
const imageLink = popupImage.querySelector("#popup-image-link");
let zoom = popup.querySelector(".popup__zoom");
let zoomContainer = popup.querySelector(".popup__zoom-container");
// открытие попапа с изменение персональных данных
function popupProfile() {
  popup.classList.add("popup_opened");
}
function popupProfileClose() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupProfile);
closeProfile.addEventListener("click", popupProfileClose);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose();
}
// открытие попапа с addMesto
function popupImageForm() {
  popupImage.classList.add("popup_opened");
}

function popupImageFormClose() {
  popupImage.classList.remove("popup_opened");
}

addMesto.addEventListener("click", popupImageForm);

closeImageForm.addEventListener("click", popupImageFormClose);

formElement.addEventListener("submit", handleFormSubmit);

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
  this.cardImage = cardsItem.querySelector(".cards__image");
  this.cardName = cardsItem.querySelector(".cards__description");
  this.delCard = cardsItem.querySelector(".cards__trash");
  this.like = cardsItem.querySelector(".cards__like");
  this.cardName.textContent = name;
  this.cardImage.alt = `На картинке ${name}`;
  this.cardImage.src = link;
  this.like.addEventListener("click", liked);
  this.delCard.addEventListener("click", deleteCard);
  this.cardImage.addEventListener("click", openZoom);
  cards.prepend(cardsItem);
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
  cards.prepend(formCard);
  popupImageFormClose();
}
// удаление карточки
function deleteCard() {
  const revCard = delCard.closest(".cards__item");
  revCard.remove();
}
// открытие зума
function openPopupZoom() {
  zoomContainer.classList.add("popup_opened");
}
function closePopupZoom() {
  zoomContainer.classList.remove("popup_opened");
}
// функция замены значений карточки
function openZoom(evt) {
  const clickedCard = evt.target.closest(".cards__item");
  const clickedCardImage = clickedCard.querySelector(".cards__image");
  const clickedCardName = clickedCard.querySelector(".cards__description");
  cardImage.src = clickedCardImage.src;
  cardImage.alt = clickedCardImage.alt;
  cardName.textContent = clickedCardName.textContent;
  openPopupZoom(zoomContainer);
}
