function Cell(props: { isOccupied: boolean }) {
  return <cell className={`${props.isOccupied ? "occupied" : ""}`}></cell>;
}

export default Cell;
