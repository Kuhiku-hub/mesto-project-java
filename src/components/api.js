import { profileTitle, profileJob } from "./utils.js";

function serverCheck(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`код ошибки: ${res.status}`);
  }
}

export const userInfo = () => {
  fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me", {
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json",
    },
  })
    .then(serverCheck)
    .then((data) => {
      data;
    });
};

export const getServerCards = (createCard, fragment) => {
  fetch("https://nomoreparties.co/v1/plus-cohort-26/cards ", {
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json",
    },
  })
    .then(serverCheck)
    .then((cards) => item);
};

export const profileDataDefault = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me", {
    method: "PATCH",
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: profileTitle.value,
      about: profileJob.value,
    }),
  })
    .then(serverCheck)
    .then((data) => data)
};

export const avatarPictureDefault = (link) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-26/users/me", {
    method: "PATCH",
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(serverCheck)
    .then((data) => data);
};

export const postCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-26/cards ", {
    method: "POST",
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(serverCheck)
    .then((data) => data);
};

export const likeCard = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
        "Content-Type": "application/json",
      },
    }
  )
    .then(serverCheck)
    .then((data) => data);
};

export const dislikeCard = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
        "Content-Type": "application/json",
      },
    }
  )
    .then(serverCheck)
    .then((data) => data);
};

export const deleteCard = (cardId, cardElement) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b8fdb423-3271-491f-87f9-a27da13635fd",
      "Content-Type": "application/json",
    },
  })
    .then(serverCheck)
    .then((data) => data);
};
