import PieceContainer from "./PieceContainer";
import GamePiece from "../obj/GamePiece";

function BottomUI(props: { pieces: GamePiece[] }) {
  return (
    <bottom>
      <PieceContainer pieces={props.pieces} />
    </bottom>
  );
}

export default BottomUI;
