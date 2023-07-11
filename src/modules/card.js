import { cards , cardsContainer , popupZoom , zoom , zoomContext} from "./utils.js";
import { openPopup , } from "./popup.js";

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

// удаление карточки
function deleteCard(evt) {
  const revCard = evt.target.closest('.cards__item')
  revCard.remove();
}

export {createCard}
