import GamePiece from "../obj/GamePiece";
function Stash(props: { pieces: GamePiece[] }) {
  //translate piece code to component
  const pieceComponents = props.pieces.map((piece: GamePiece) => {
    return pieceCodeToComponent(piece.code);
  });

  return (
    <div className="stash flex-row">
      <div className="stash-container">{pieceComponents[0]}</div>
      <div className="stash-container">{pieceComponents[1]}</div>
      <div className="stash-container">{pieceComponents[2]}</div>
    </div>
  );
}

function pieceCodeToComponent(pieceCode: string) {
  const pieceComponent = [];

  for (let i = 0; i < pieceCode.length; i++) {
    switch (pieceCode.charAt(i)) {
      case "1":
        pieceComponent.push(<div className="piece-tile"></div>);
        break;
      case "B":
        pieceComponent.push(<div className="piece-newline"></div>);
        break;
      case "0":
        pieceComponent.push(<div className="piece-empty"></div>);
        break;
    }
  }

  return pieceComponent;
}

export default Stash;
