
class Card {
  constructor(cardInfo, userId, { handleLikeIcon, handleDeleteCard, openZoomImage }) {
    this._cardInfo = cardInfo;
    this._userId = userId;
    this._handleLikeIcon = handleLikeIcon;
    this._handleDeleteCard = handleDeleteCard;
    this._openZoomImage = openZoomImage;

    this._cardTemplate = document.querySelector("#cards-template");
  }

  showLikes(likesAmountElement) {
    likesAmountElement.textContent = this._cardInfo.likes.length;

    if (this._cardInfo.likes.length > 0) {
      likesAmountElement.classList.add("cards__like-amount_active");
    } else {
      likesAmountElement.classList.remove("cards__like-amount_active");
    }
  }

  isLikedByUser(cardHeartElement) {
    if (this._cardInfo.likes.some((user) => user._id === this._userId)) {
      cardHeartElement.classList.add("cards__like_active");
    }
  }

  showTrashIcon(trashBinElement) {
    if (this._cardInfo.owner._id === this._userId) {
      trashBinElement.classList.add("cards__trash_active");
    }
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector(".cards__like").addEventListener("click", () =>
      this._handleLikeIcon(cardElement)
    );
    cardElement.querySelector(".cards__trash").addEventListener("click", () =>
      this._handleDeleteCard(cardElement)
    );
    cardElement.querySelector(".cards__image").addEventListener("click", () =>
      this._openZoomImage(cardElement)
    );
  }

  generateCard() {
    const cardElement = this._cardTemplate.cloneNode(true);

    cardElement.setAttribute("data-id", this._cardInfo._id);
    cardElement.querySelector(".cards__image").src = this._cardInfo.link;
    cardElement.querySelector(".cards__description").textContent = this._cardInfo.name;

    this.isLikedByUser(cardElement.querySelector(".cards__like"));
    this.showLikes(cardElement.querySelector(".cards__like-amount"));
    this.showTrashIcon(cardElement.querySelector(".cards__trash"));
    this._setEventListeners(cardElement);

    return cardElement;
  }
}

export {Card};
