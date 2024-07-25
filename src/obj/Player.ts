import Board from "./Board";
import GamePiece from "./GamePiece";
import { GAME } from "../globals";

class Player {
  name: string;
  board: Board;
  gamePieces: GamePiece[];
  gamePieceGroupIndex: number;
  constructor(name: string) {
    this.name = name;
    this.board = new Board();
    this.gamePieces = [];
    this.gamePieceGroupIndex = -1;

    this.getNextGamePieceGroup();
  }

  getNextGamePieceGroup() {
    this.gamePieceGroupIndex += 1;

    //if player has placed all pieces then tell game object to create new group of pieces
    if (this.gamePieceGroupIndex > GAME.pieceGroups || GAME.pieceGroups == 0) {
      GAME.getNextPieces();
    }

    //add game pieces to player obj
    for (let i = 0; i < 3; i++) {
      const piece = GAME.pieces[this.gamePieceGroupIndex * 3 + i];
      this.gamePieces.push(piece);
    }
  }
}
export default Player;
