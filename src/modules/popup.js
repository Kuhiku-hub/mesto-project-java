import{closePopup} from './index.js'


function setEscButtonClose(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
      closePopup(popupOpened);
  }
}

function setOverlayClickClose(event) {
  if (event.target.classList.contains('popup_opened')) {
      closePopup(event.target);
  }
}

export {setOverlayClickClose , setEscButtonClose }
