class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._checkResponse = this._checkResponse.bind(this);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`код ошибки: ${res.status}`);
  }

  getUserInfo = () =>
     fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._checkResponse
    );

  getCards = () =>
    fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);

  updateProfileData = (profileData) =>
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: profileData.username, about: profileData.description }),
    }).then(this._checkResponse);

  updateAvatar = (avatarUrl) =>
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl.avatar }),
    }).then(this._checkResponse);

  createCard = (name, link) =>
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);

  likeCard = (cardId) =>
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);

  dislikeCard = (cardId) =>
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);

  removeCard = (cardId) =>
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
}

export {Api};
