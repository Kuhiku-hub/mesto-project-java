import { cards , cardsContainer , popupZoom , zoom , zoomContext } from "./utils.js";

import { openPopup  } from "./popup.js";

import {dislikeCard , likeCard} from './api.js'

function toggleLike(event) {
  event.target.classList.toggle("cards__like_active");
}

function openZoomPopup() {
  openPopup(popupZoom);
}

function showLikes(cardElementProvided, cardInfo) {
  let cardElement = document.querySelector(`[data-id="${cardInfo._id}"]`);
  if (!cardElement) {
      cardElement = cardElementProvided;
  }
  const likesAmountElement = cardElement.querySelector('.cards__like-amount');
  if (cardInfo.likes.length > 0) {
      likesAmountElement.classList.add('cards__like-amount_active');
      likesAmountElement.textContent = cardInfo.likes.length;
  } else {
      likesAmountElement.classList.remove('cards__like-amount_active');
  }
}

function isLikedByUser(cardElement, cardInfo, userID) {
  const cardHeartElement = cardElement.querySelector('.cards__like');
  if (cardHeartElement) {
      const isLiked = cardInfo.likes.some(user => user._id === userID)
      if (isLiked) {
          cardHeartElement.classList.add('cards__like_active')
      }
  }
}


function showTrashIcon(cardElement, cardInfo, userId) {
  if (cardInfo.owner._id === userId) {
      const trashBinElement = cardElement.querySelector('.cards__trash');
      trashBinElement.classList.add('cards__trash_active');
  }
}

function searchCardId(evt) {
  const cardElement = evt.target.closest('.cards__item');
  return cardElement.dataset.id;
}

function handleLikesUpdate(cardId, likesNumber) {
  const cardElement = document.querySelector(`[data-id="${cardId}"]`);
  const likesAmount = cardElement.querySelector('.cards__like-amount');
  likesAmount.textContent = likesNumber;
}

function handleLike(cardInfo) {
  handleLikesUpdate(cardInfo._id, cardInfo.likes.length);
  showLikes(null, cardInfo);
}

function handleLikeIcon(evt) {
  if (evt.target.classList.contains('cards__like_active')) {
      const cardId = searchCardId(evt);
      evt.target.classList.toggle('cards__like_active');
      return dislikeCard(cardId)
          .then(data => handleLike(data))
          .catch(err => console.log(err));
  }
  if (evt.target.classList.contains('cards__like')) {
      const cardId = searchCardId(evt);
      evt.target.classList.toggle('card__like__active');
      return likeCard(cardId)
          .then(data => handleLike(data))
          .catch(err => console.log(err));
      ;
  }
}

function handleDeleteCard(evt) {
  const clickedCard = evt.target.closest('.cards__item');
  const cardId = clickedCard.dataset.id;
  deleteCard(cardId)
      .then(() => {clickedCard.remove();})
      .catch(err => console.log(err));
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

// удаление карточки
function deleteCard(evt) {
  const revCard = evt.target.closest('.cards__item')
  revCard.remove();
}

export {createCard , addCard}
