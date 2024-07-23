import GamePiece from "./GamePiece";

class Game {
  constructor() {
    this.seed = Math.floor(Math.random() * 1000000);
  }
  players: any;
  seed: number;
  pieces: GamePiece[] = [];
}

export default Game;
