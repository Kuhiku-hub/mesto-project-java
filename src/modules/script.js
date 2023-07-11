
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


const showInputError = (element) => {
  element.classList.add('form__input_type_error');
};

const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
};

const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
};

formInput.addEventListener('input', isValid);
