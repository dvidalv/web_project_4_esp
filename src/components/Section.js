class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  _clear() {
    this._container.innerHTML = '';
  }

  addItem(element, orientation = 'append') {
    this._container[orientation](element);
  }

  renderItems() {
    this._clear(); // limpiamos el contenedor de tarjetas antes de imprimirlas
    this._initialArray.forEach((item) => {
      //Iteramos los datos
      this._renderer(item); //ejecutamos el callback, pasandole un objeto del array
    });
  }
}
export default Section;
