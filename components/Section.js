class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  clear() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this.clear(); // limpiamos el contenedor de tarjetas antes de imprimirlas
    this._initialArray.forEach((item) => {
      //Iteramos los datos
      this._renderer(item); //ejecutamos el callback, pasandole un objeto del array
    });
  }
}
export default Section;
