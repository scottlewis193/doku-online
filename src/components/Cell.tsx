function Cell(props: { isOccupied: boolean }) {
  return <div className={`cell ${props.isOccupied ? "occupied" : ""}`}></div>;
}

export default Cell;
