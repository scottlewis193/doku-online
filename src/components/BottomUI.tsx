import Stash from "./Stash";
import GamePiece from "../obj/GamePiece";

function BottomUI(props: { pieces: GamePiece[] }) {
  return (
    <div className="bottomUI">
      <Stash pieces={props.pieces} />
    </div>
  );
}

export default BottomUI;
