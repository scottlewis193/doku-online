import Board from "./Board";
import TopUI from "./TopUI";
import BottomUI from "./BottomUI";
import Player from "../obj/Player";

function Game(props: { player: Player }) {
  const playerCells = props.player.board.cells;
  const playerPieces = props.player.gamePieces;
  console.log(playerPieces);
  return (
    <>
      <TopUI />
      <Board cells={playerCells} />
      <BottomUI pieces={playerPieces} />
    </>
  );
}

export default Game;
