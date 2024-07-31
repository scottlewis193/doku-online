import GamePiece from "../obj/GamePiece";
function PieceContainer(props: { pieces: GamePiece[] }) {
  //translate piece code to component
  const pieceComponents = props.pieces.map((piece: GamePiece) => {
    return pieceCodeToComponent(piece.code);
  });

  return (
    <piececontainer className="flex-row">
      <slot>
        <piece className="draggable">{pieceComponents[0]}</piece>
      </slot>
      <slot>
        <piece className="draggable">{pieceComponents[1]}</piece>
      </slot>
      <slot>
        <piece className="draggable">{pieceComponents[2]}</piece>
      </slot>
    </piececontainer>
  );
}

function pieceCodeToComponent(pieceCode: string) {
  const pieceComponent = [];

  for (let i = 0; i < pieceCode.length; i++) {
    switch (pieceCode.charAt(i)) {
      case "1":
        pieceComponent.push(<tile></tile>);
        break;
      case "B":
        pieceComponent.push(<break></break>);
        break;
      case "0":
        pieceComponent.push(<tile empty></tile>);
        break;
    }
  }

  return pieceComponent;
}

export default PieceContainer;
