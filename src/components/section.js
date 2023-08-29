class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}

export { Section };
