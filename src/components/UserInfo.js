class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getData() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setData({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }

  setAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}

export { UserInfo };
