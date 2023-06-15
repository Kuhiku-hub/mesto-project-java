const popupProfile = document.querySelector("#profile-popup");
const popupImage = document.querySelector("#image-popup");
const popupZoom = document.querySelector("#popup-zoom");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__description");
const cards = document.querySelector("#cards-template");
const cardsContainer = document.querySelector("#cards-container");
const editButton = profile.querySelector(".profile__edit-button");
const addMesto = profile.querySelector(".profile__add-mesto");
const profileForm = popupProfile.querySelector("#popup-profile-form");
const imageFormSubmit = popupImage.querySelector("#popup-image-form");
const nameInput = profileForm.querySelector("#username-input");
const jobInput = profileForm.querySelector("#description-input");
const imageDescription = popupImage.querySelector("#popup-image-name");
const imageLink = popupImage.querySelector("#popup-image-link");
const zoom = popupZoom.querySelector(".popup__zoom");
const zoomContext = popupZoom.querySelector(".popup__context");
const zoomContainer = popupZoom.querySelector(".popup__zoom-container");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

editButton.addEventListener("click", openProfilePopup);

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

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

addMesto.addEventListener("click", openImageForm);

profileForm.addEventListener("submit", submitProfileForm);

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

function toggleLike(event) {
  event.target.classList.toggle("cards__like_active");
}

// общая функция создания карточек
function createCard(item) {
  const cardsItem = cards.querySelector(".cards__item").cloneNode(true);
  const cardName = cardsItem.querySelector(".cards__description");
  const cardImage = cardsItem.querySelector('.cards__image');

  cardName.textContent = item.name;
  cardImage.alt = `На картинке ${item.name}`;
  cardImage.src = item.link;

  cardsItem.querySelector(".cards__like").addEventListener("click", toggleLike);
  cardsItem
    .querySelector(".cards__trash")
    .addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openZoomImage);

  return cardsItem;
}

function addCard(item) {
  const card = createCard(item);
  cardsContainer.prepend(card)
}

initialCards.forEach((item) => {
  addCard(item, cardsContainer);
});

// добавление карточек через addMesto
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

imageFormSubmit.addEventListener("submit", submitCreateCardForm);

// удаление карточки
function deleteCard(evt) {
  const revCard = evt.target.closest('.cards__item')
  revCard.remove();
}

function openZoomPopup() {
  openPopup(popupZoom);
}

// функция замены значений карточки
function openZoomImage(evt) {
  const clickedCard = evt.target.closest(".cards__item");
  const clickedCardImage = clickedCard.querySelector(".cards__image");
  const clickedCardDescription = clickedCard.querySelector(
    ".cards__description"
  );
  openZoomPopup();
  zoom.src = clickedCardImage.src;
  zoom.alt = clickedCardImage.alt;
  zoomContext.textContent = clickedCardDescription.textContent;
}

