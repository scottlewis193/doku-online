//this is used to allow us to add additional properties to the custom elements

class PieceElement extends HTMLElement {
  constructor() {
    super();
  }
  oldX: number = 0;
  oldY: number = 0;
  oldLeft: number = 0;
  oldTop: number = 0;
  distX: number = 0;
  distY: number = 0;
  moving: boolean = false;
  origX: number = 0;
  origY: number = 0;
  origWidth: number = 0;
  origHeight: number = 0;
}
