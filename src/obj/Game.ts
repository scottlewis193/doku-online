import GamePiece from "./GamePiece";

class Game {
  constructor() {
    this.seed = Math.random() * 1000000;
    console.log(this.seed);
  }
  seed: number;
  pieces: GamePiece[] = [];
}

export default Game;
