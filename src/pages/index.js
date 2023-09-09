import "../pages/index.css";

import { PopupNotice } from "../components/popupNotice";
import { Api } from "../components/api.js";
import { Card } from "../components/card.js";
import { ValidationForm } from "../components/validationForm.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/section.js";
import {
  profileEditingButton,
  addCardButton,
  profileForm,
  formAddCard,
  profileFormNameInput,
  profileFormAboutInput,
  popupAvatarEditForm,
  iconAvatarEdit,
  validationSelectors,
  apiConfig,
} from "../components/utils/utils.js";

const api = new Api(apiConfig);

let userId

const userInfo = new UserInfo({
  usernameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

const renderCard = function (cardObject) {
  const cardItem = new Card(
    cardObject,
    "#cards-template",
    userId,
    { cardId: cardObject._id, authorId: cardObject.owner._id },
    {
      handleCardZoom: (name, image) => {
        popupZoom.openPopup(name, image);
      },
      handleCardDelete: (cardElement, cardId) => {
        popupDeleteCard.openPopup(cardElement, cardId);
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
          .then((item) => {
            cardItem.showLikes(item);
          })
          .catch((err) => {
            console.log(`При дизлайке карточки возникла ошибка, ${err}`);
          });
      },
    }
  );
  return cardItem.generateCard();
};

const initialCards = new Section(
  {
    renderer: (cardObject) => {
      initialCards.addItem(renderCard(cardObject));
    },
  },
  ".cards"
);

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

const popupZoom = new PopupWithImage("#popup-zoom");
popupZoom.setEventListeners();

const popupEditAvatar = new PopupWithForm("#popup-avatar", {
  onFormSubmit: (userProfileData) => {
    popupEditAvatar.showSavingText();
    api
      .updateAvatar(userProfileData)
      .then((item) => {
        userInfo.setAvatar(item.avatar);
        popupEditAvatar.closeAndReset();
      })
      .catch((err) =>
        console.log(`При обновлении аватара возникла ошибка, ${err}`)
      )
      .finally(() => popupEditAvatar.restoreSubmitButtonText());
  },
});
popupEditAvatar.setEventListeners();

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
popupDeleteCard.setEventListeners();

const popupEditProfile = new PopupWithForm("#popup-profile", {
  onFormSubmit: (userProfileData) => {
    popupEditProfile.showSavingText();
    api
      .updateProfileData(userProfileData)
      .then((item) => {
        userInfo.setData({ username: item.name, description: item.about });
        popupEditProfile.closeAndReset();
      })
      .catch((err) =>
        console.log(`При редактировании профиля возникла ошибка, ${err}`)
      )
      .finally(() => popupEditProfile.restoreSubmitButtonText());
  },
});
popupEditProfile.setEventListeners();

const popupNewCard = new PopupWithForm("#popup-image", {
  onFormSubmit: (formValues) => {
    popupNewCard.showSavingText();
    api
      .createCard({ name: formValues.placename, link: formValues.placeimage })
      .then((card) => {
        initialCards.addItem(renderCard(card));
        popupNewCard.closeAndReset();
      })
      .catch((err) =>
        console.log(`При добавлении новой карточки возникла ошибка, ${err}`)
      )
      .finally(() => popupNewCard.restoreSubmitButtonText());
  },
});

popupNewCard.setEventListeners();

// Валидация popup
const cardItemValidate = new ValidationForm(validationSelectors, formAddCard);
cardItemValidate.enableValidation();
const profileEditValidate = new ValidationForm(
  validationSelectors,
  profileForm
);
profileEditValidate.enableValidation();
const profileAvatarEditValidate = new ValidationForm(
  validationSelectors,
  popupAvatarEditForm
);
profileAvatarEditValidate.enableValidation();

// События
profileEditingButton.addEventListener("click", () => {
  popupEditProfile.openPopup();
  profileEditValidate.resetValidate();
  const actualUserInfo = userInfo.getData();
  profileFormNameInput.value = actualUserInfo.username;
  profileFormAboutInput.value = actualUserInfo.description;
});

iconAvatarEdit.addEventListener("click", () => {
  popupEditAvatar.openPopup();
  profileAvatarEditValidate.resetValidate();
});

document.querySelector(".profile__pencil").addEventListener("click", () => {
  popupEditAvatar.openPopup();
  profileAvatarEditValidate.resetValidate();
});

addCardButton.addEventListener("click", () => {
  popupNewCard.openPopup();
  cardItemValidate.resetValidate();
});
