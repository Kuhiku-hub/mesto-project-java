
class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(item) {
    item.forEach(this._renderer);
  }
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
export { Section };
