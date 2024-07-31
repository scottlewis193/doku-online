//this function is used to set the size of the piece by individually setting the width and height of all the child tile elements
export function setPieceSize(
  pieceElement: PieceElement,
  sizeType: string = "small",
) {
  const childElements = pieceElement.children;
  const standardWidth: number = Number(
    getComputedStyle(document.body).getPropertyValue("--width").split("px")[0],
  );
  const standardHeight: number = Number(
    getComputedStyle(document.body).getPropertyValue("--height").split("px")[0],
  );

  for (let i = 0; i < childElements.length; i++) {
    const tileElement: HTMLElement = childElements[i] as HTMLElement;

    if (tileElement.tagName !== "TILE") {
      continue;
    }

    const currentWidth: number = Number(tileElement.style.width.split("px")[0]);
    const currentHeight: number = Number(
      tileElement.style.height.split("px")[0],
    );

    tileElement.style.width =
      sizeType == "standard" ? standardWidth + "px" : standardWidth / 2 + "px";
    tileElement.style.height =
      sizeType == "standard"
        ? standardHeight + "px"
        : standardHeight / 2 + "px";
  }
}
