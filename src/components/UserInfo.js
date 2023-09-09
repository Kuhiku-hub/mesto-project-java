class UserInfo {
  constructor({ usernameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(usernameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getData() {
    return {
      username: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setData({ username, description }) {
    this._nameElement.textContent = username;
    this._descriptionElement.textContent = description;
  }
  setAvatar(avatarUrl) {
    this._avatarElement.style.backgroundImage = `url(${avatarUrl})`;
  }
}

export { UserInfo };
