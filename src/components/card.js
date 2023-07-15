import { cards, popupZoom, zoom, zoomContext } from "./utils.js";

import { openPopup } from "./popup.js";

import { deleteCard, dislikeCard, likeCard } from "./api";

function openZoomPopup() {
  openPopup(popupZoom);
}

function showLikes(cardElementProvided, cardInfo) {
  let cardElement = document.querySelector(`[data-id="${cardInfo._id}"]`);
  if (!cardElement) {
    cardElement = cardElementProvided;
  }
  const likesAmountElement = cardElement.querySelector(".cards__like-amount");
  if (cardInfo.likes.length > 0) {
    likesAmountElement.classList.add("cards__like-amount_active");
    likesAmountElement.textContent = cardInfo.likes.length;
  } else {
    likesAmountElement.classList.remove("cards__like-amount_active");
  }
}

function isLikedByUser(cardElement, cardInfo, userID) {
  const cardHeartElement = cardElement.querySelector(".cards__like");
  if (cardHeartElement) {
    const isLiked = cardInfo.likes.some((user) => user._id === userID);
    if (isLiked) {
      cardHeartElement.classList.add("cards__like_active");
    }
  }
}
function showTrashIcon(cardElement, cardInfo, userId) {
  if (cardInfo.owner._id === userId) {
    const trashBinElement = cardElement.querySelector(".cards__trash");
    trashBinElement.classList.add("cards__trash_active");
  }
}

function searchCardId(evt) {
  const cardElement = evt.target.closest(".cards__item");
  return cardElement.dataset.id;
}

function handleLikesUpdate(cardId, likesNumber) {
  const cardElement = document.querySelector(`[data-id="${cardId}"]`);
  const likesAmount = cardElement.querySelector(".cards__like-amount");
  likesAmount.textContent = likesNumber;
}

function handleLike(cardInfo) {
  handleLikesUpdate(cardInfo._id, cardInfo.likes.length);
  showLikes(null, cardInfo);
}

function handleLikeIcon(evt) {
  if (evt.target.classList.contains("cards__like_active")) {
    const cardId = searchCardId(evt);
    evt.target.classList.toggle("cards__like_active");
    return dislikeCard(cardId)
      .then((data) => handleLike(data))
      .catch((err) => console.log(err));
  }
  if (evt.target.classList.contains("cards__like")) {
    const cardId = searchCardId(evt);
    evt.target.classList.toggle("cards__like_active");
    return likeCard(cardId)
      .then((data) => handleLike(data))
      .catch((err) => console.log(err));
  }
}

function handleDeleteCard(evt) {
  const clickedCard = evt.target.closest(".cards__item");
  const cardId = clickedCard.dataset.id;
  deleteCard(cardId)
    .then(() => {
      clickedCard.remove();
    })
    .catch((err) => console.log(err));
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
function createCard(cardInfo, userID) {
  const cardElement = cards.querySelector(".cards__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardName = cardElement.querySelector(".cards__description");
  const cardLike = cardElement.querySelector(".cards__like");
  const cardTrash = cardElement.querySelector(".cards__trash");

  cardElement.setAttribute("data-id", cardInfo._id);
  cardImage.src = cardInfo.link;
  cardName.textContent = cardInfo.name;

  isLikedByUser(cardElement, cardInfo, userID);
  showLikes(cardElement, cardInfo);
  showTrashIcon(cardElement, cardInfo, userID);

  cardLike.addEventListener("click", handleLikeIcon);
  cardTrash.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", openZoomImage);

  return cardElement;
}

export { createCard };
