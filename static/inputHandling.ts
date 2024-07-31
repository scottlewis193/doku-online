import { setPieceSize } from "./utils";

const d: HTMLElement[] = document.getElementsByClassName("draggable") as any;

for (let i = 0; i < d.length; i++) {
  d[i].style.position = "relative";
}

//this is the function used filter out the draggable elements
function startDrag(e: MouseEvent | TouchEvent) {
  //this will get the correct target element
  let target: PieceElement = e.target as PieceElement;
  if (!target) {
    return;
  }
  if (target.parentElement?.classList.contains("draggable")) {
    target = target.parentElement as PieceElement;
  }

  if (!target.classList.contains("draggable")) {
    return;
  }

  //set the element to moving so that we can check if the user is dragging the element
  target.moving = true;

  //this determines if the user is using a mouse or a touch device and sets the correct values for the oldX and oldY variables
  if (e instanceof MouseEvent) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }

  //this sets the oldLeft and oldTop values to the current left and top values of the element
  target.oldLeft =
    Number(
      window.getComputedStyle(target).getPropertyValue("left").split("px")[0],
    ) * 1;
  target.oldTop =
    Number(
      window.getComputedStyle(target).getPropertyValue("top").split("px")[0],
    ) * 1;

  //this sets the event listeners for the mousemove and touchmove events
  document.onmousemove = drag;
  document.ontouchmove = drag;

  setPieceSize(target, "standard");

  //this is the function that is called when the user moves the mouse or touches the screen specifically for dragging the pieces on the board
  function drag(e: MouseEvent | TouchEvent) {
    e.preventDefault();

    if (!target.moving) {
      return;
    }

    //this determines if the user is using a mouse or a touch device and sets the correct values for the distX and distY variables
    if (e instanceof MouseEvent) {
      target.distX = e.clientX - target.oldX;
      target.distY = e.clientY - target.oldY;
    } else {
      target.distX = e.touches[0].clientX - target.oldX;
      target.distY = e.touches[0].clientY - target.oldY;
    }

    // this is used to move the piece on the board
    target.style.left = target.oldLeft + target.distX + "px";
    target.style.top = target.oldTop + target.distY + "px";

    //this is used to set the original position of the piece so that we can move it back to its original position when the user releases the mouse
    if (!target.origX && !target.origY) {
      target.origX = Number(target.style.left.split("px")[0]);
      target.origY = Number(target.style.top.split("px")[0]);
    }
  }

  function endDrag() {
    //this is used to set the element to not be moving
    target.moving = false;

    //this is used to move the piece back to its original position
    target.style.left = target.origX + "px";
    target.style.top = target.origY + "px";

    setPieceSize(target, "small");
  }

  //this is used to set the event listeners for the mouseup and touchend events
  target.onmouseup = endDrag;
  target.ontouchend = endDrag;
}

//this is used to set the event listeners for the mousedown and touchstart events
document.onmousedown = startDrag;
document.ontouchstart = startDrag;
