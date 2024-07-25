class Cell {
  x: number;
  y: number;
  occupied: boolean;
  highlighted: boolean;
  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
    this.occupied = false;
    this.highlighted = false;
  }
}

export default Cell;
