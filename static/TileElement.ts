class TileElement extends HTMLElement {
  _isHovering: boolean;
  _isHighlighting: boolean;

  constructor() {
    super();
    this._isHovering = false;
    this._isHighlighting = false;
  }

  get isHovering() {
    return this._isHovering;
  }

  set isHovering(value) {
    this._isHovering = value;
    this.classList.toggle("hovered", value);
  }

  get isHighlighting() {
    return this._isHighlighting;
  }

  set isHighlighting(value) {
    this._isHighlighting = value;
    this.classList.toggle("highlighted", value);
  }
}
