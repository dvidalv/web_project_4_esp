class Section {
  constructor({ items, renderer }, containerSelector) {
    this.renderer = renderer;
    this._items = items;
    this.containerSelector = containerSelector;
  }

  renderer() {}

  addItem() {}
}
