class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(cardElement) {
    this._containerElement.prepend(cardElement);
  }
}

export { Section };
