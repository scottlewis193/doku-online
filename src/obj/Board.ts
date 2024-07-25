import Cell from "./Cell";
import * as BoardComponent from "../components/Board";

class Board {
  cells: any;
  constructor() {
    this.cells = this.createCells();
  }

  createCells() {
    const cells: Cell[] = [];
    let cellCount = 0;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        cells[cellCount] = new Cell({ x, y });
        if (cellCount == 2) {
          cells[cellCount].occupied = true;
        }
        cellCount += 1;
      }
    }
    return cells;
  }
}

export default Board;
