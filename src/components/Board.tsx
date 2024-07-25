import Cell from "./Cell";

function Board(props: { cells: any }) {
  const cellComponents = props.cells.map((cell: any) => {
    return <Cell isOccupied={cell.occupied} />;
  });

  let rows: any = [];

  for (let y = 0; y < 9; y++) {
    rows.push(
      <div className="board-row flex-row">
        {cellComponents.slice(y * 9, y * 9 + 9)}
      </div>,
    );
  }

  return <div className="board">{rows}</div>;
}

export default Board;
