import GamePiece, { PieceCodes } from "./GamePiece";
// @ts-ignore
import { prng_alea } from "esm-seedrandom";

class Game {
  constructor() {
    this.seed = Math.floor(Math.random() * 1000000);
    this.getNextRandom = prng_alea(this.seed);
    this.pieceGroups = 0;
  }
  players: any;
  seed: number;
  pieces: GamePiece[] = [];
  pieceGroups: number;
  getNextRandom: any;

  getNextPieces() {
    //push three new pieces into the pieces array
    const index = this.getRandomPieceIndex();
    console.log(index);
    const newPiece = new GamePiece(this.getRandomPieceIndex());
    this.pieces.push(newPiece);
    this.pieces.push(new GamePiece(this.getRandomPieceIndex()));
    this.pieces.push(new GamePiece(this.getRandomPieceIndex()));
    this.pieceGroups += 1;
  }

  getRandomPieceIndex() {
    const pieceIndex = Math.floor(
      Object.keys(PieceCodes).length * this.getNextRandom(),
    );
    return pieceIndex;
  }
}

export default Game;
