import "../pages/index.css";

import { PopupNotice } from "../components/popupNotice";
import { Api } from "../components/api.js";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/validationForm.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { UserInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import {
  profileEditingButton,
  addCardButton,
  popupProfile,
  profileForm,
  popupAddCard,
  formAddCard,
  profileFormNameInput,
  profileFormAboutInput,
  popupAvatar,
  popupAvatarEditForm,
  iconAvatarEdit,
  validationSelectors,
  apiConfig,
} from "../components/utils.js";

const api = new Api(apiConfig);

let userId;

const initialCards = new Section(
  {
    renderer: (card) => {
      const cardElement = generateCard(card);
      initialCards.addItem(cardElement);
    },
  },
  ".cards"
);

const userInfo = new UserInfo({
  profileFormNameInput,
  profileFormAboutInput,
  popupAvatarEditForm,
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userProfileData, cardObject]) => {
    userId = userProfileData._id;
    userInfo.setData({
      username: userProfileData.name,
      description: userProfileData.about,
    });
    userInfo.setAvatar(userProfileData.avatar);
    initialCards.renderItems(cardObject.reverse());
  })
  .catch((err) => console.log(`Возникли неполадки , ${err}`));

const renderCard = (cardObject) => {
  const cardItem = new Card(
    cardObject,
    "#cards-template",
    userId,
    { cardId: cardObject._id, authorId: cardObject.owner._id },
    {
      handleCardZoom: (name, image) => {
        popupZoom.open(name, image);
      },
      handleCardDelete: (cardElement, cardId) => {
        popupDeleteCard.open(cardElement, cardId);
      },
      handleCardLike: (cardId) => {
        api
          .likeCard(cardId)
          .then((res) => {
            cardItem.showLikes(res);
          })
          .catch((err) => {
            console.log(`При лайке карточки возникла ошибка, ${err}`);
          });
      },
      handleCardDeleteLike: (cardId) => {
        api
          .dislikeCard(cardId)
          .then((res) => {
            cardItem.showLikes(res);
          })
          .catch((err) => {
            console.log(`При дизлайке карточки возникла ошибка, ${err}`);
          });
      },
    }
  );
  return cardItem.generateCard();
};

const popupZoom = new PopupWithImage("#popup-zoom");
popupZoom.addEventListeners();

const popupEditAvatar = new PopupWithForm(popupAvatar, {
  onFormSubmit: (userProfileData) => {
    popupEditAvatar.showSavingText();
    api
      .updateAvatar(userProfileData)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
        popupEditAvatar.closeAndReset();
      })
      .catch((err) =>
        console.log(`При обновлении аватара возникла ошибка, ${err}`)
      )
      .finally(() => popupEditAvatar.restoreSubmitButtonText());
  },
});
popupEditAvatar.addEventListeners();

const popupDeleteCard = new PopupNotice("#popup-notice", {
  callbackNotice: (cardElement, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.removeCard();
        popupDeleteCard.closeAndReset();
      })
      .catch((err) =>
        console.log(`При удалении карточки возникла ошибка, ${err}`)
      );
  },
});
popupDeleteCard.addEventListeners();

const popupEditProfile = new PopupWithForm(popupProfile, {
  onFormSubmit: (userProfileData) => {
    popupEditProfile.showSavingText();
    api
      .updateProfileData(userProfileData)
      .then((res) => {
        userInfo.setData({ username: res.name, description: res.about });
        popupEditProfile.closeAndReset();
      })
      .catch((err) =>
        console.log(`При редактировании профиля возникла ошибка, ${err}`)
      )
      .finally(() => popupEditProfile.restoreSubmitButtonText());
  },
});
popupEditProfile.addEventListeners();

const popupNewCard = new PopupWithForm(popupAddCard, {
  onFormSubmit: (formValues) => {
    popupNewCard.showSavingText();
    api
      .createCard({ name: formValues.placename, link: formValues.placeimage })
      .then((card) => {
        initialCards.addItem(generateCard(card));
        popupNewCard.closeAndReset();
      })
      .catch((err) =>
        console.log(`При добавлении новой карточки возникла ошибка, ${err}`)
      )
      .finally(() => popupNewCard.restoreSubmitButtonText());
  },
});

popupNewCard.addEventListeners();

// Валидация popup
const cardItemValidate = new FormValidator(validationSelectors, formAddCard);
cardItemValidate.enableValidation();
const profileEditValidate = new FormValidator(validationSelectors, profileForm);
profileEditValidate.enableValidation();
const profileAvatarEditValidate = new FormValidator(
  validationSelectors,
  popupAvatarEditForm
);
profileAvatarEditValidate.enableValidation();

// События
profileEditingButton.addEventListener("click", () => {
  popupEditProfile.open();
  profileEditValidate.resetValidate();
  const actualUserInfo = userInfo.getData();
  profileFormNameInput.value = actualUserInfo.username;
  profileFormAboutInput.value = actualUserInfo.description;
});

iconAvatarEdit.addEventListener("click", () => {
  popupEditAvatar.open();
  profileAvatarEditValidate.resetValidate();
});

addCardButton.addEventListener("click", () => {
  popupNewCard.open();
  cardItemValidate.resetValidate();
});
