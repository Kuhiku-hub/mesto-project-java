import '../pages/index.css';

import { createCard } from './card.js'
import { enableValidation , validateInputs} from './validate.js'
import {closePopup , openPopup  } from './popup.js'
import {profile,
  profileTitle,
  profileJob,
  editButton,
  addMesto,
  popupForm,
  popupInput,
  popupProfile,
  popupOpened,
  profileForm,
  nameInput,
  jobInput,
  popupImage,
  imageFormSubmit,
  imageDescription,
  imageLink,
  cards,
  cardsContainer,
  popupZoom ,
  zoom,
  zoomContext,
  zoomContainer,
  closeButtons} from './utils.js'

  enableValidation(validateInputs)

  inputSelector.addEventListener('input', enableValidation)
