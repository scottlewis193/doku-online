class CellElement extends HTMLElement {
  _isOccupied: boolean;

  constructor() {
    super();
    this._isOccupied = false;
  }

  get isOccupied() {
    return this._isOccupied;
  }

  set isOccupied(value) {
    this._isOccupied = value;
    this.classList.toggle("occupied", value);
  }
}
