const FRONTENDPLAYERS: any = {};
const FRONTENDGAME: any = {};
let SESSIONID: number = 0;
let socket: WebSocket;
let mouseOrTouchPressed: boolean = false;

connectWebSocket();

async function connectWebSocket(username: string = "") {
  //websocket listeners
  const wsport = document.getElementById("ws-port");
  socket = new WebSocket(
    "ws://localhost:" + wsport?.innerText + "/ws",
    "echo-protocol",
  );

  // message is received
  socket.addEventListener("message", onSocketMessage);

  // socket opened
  socket.addEventListener("open", onSocketOpen);

  // socket closed
  socket.addEventListener("close", onSocketClose);

  // error handler
  socket.addEventListener("error", onSocketError);
}

function onSocketMessage(event: MessageEvent) {
  const data: any = JSON.parse(event.data);

  //if server sends sessionId
  if (data.hasOwnProperty("sessionId")) {
    SESSIONID = data.sessionId;
    FRONTENDPLAYERS[data.sessionId] = { username: data.sessionId };
    const formElement = document.querySelector("form");
    formElement?.setAttribute("hx-vals", `{"sessionId": ${data.sessionId}}`);
  }

  //if server sends backEndPlayers
  if (data.hasOwnProperty("backEndPlayers")) {
    //iterate over backendplayers
    for (const id in data.backEndPlayers) {
      //if player doesn't exist on frontend, add them
      if (!FRONTENDPLAYERS[id]) {
        FRONTENDPLAYERS[id] = {
          username: data.backEndPlayers[id],
        };
      }
    }

    // remove player if they don't exist on the backend
    for (const id in FRONTENDPLAYERS) {
      if (!data.backEndPlayers[id]) {
        console.log("removed player: " + id);
        delete FRONTENDPLAYERS[id];
      }
    }
  }

  if (data.hasOwnProperty("log")) {
    console.log(data.log);
  }
}

function onSocketOpen(event: Event) {
  console.log("socket opened");
}

function onSocketClose(event: CloseEvent) {
  console.log("socket closed");
}

function onSocketError(event: Event) {
  console.log("socket error");
}

function joinGame(sessionId: number) {
  //add event listeners based on if device supports touch or not
  if ("ontouchstart" in window) {
    document
      .querySelector("body")
      ?.addEventListener("touchstart", onTouchStart);
    document.querySelector("body")?.addEventListener("touchend", onTouchEnd);
    document.querySelector("body")?.addEventListener("touchmove", onTouchMove);
  } else {
    document.querySelector("body")?.addEventListener("mousedown", onMouseDown);
    document.querySelector("body")?.addEventListener("mouseup", onMouseUp);
    document.querySelector("body")?.addEventListener("mousemove", onMouseMove);
  }
}

function onTouchStart(event: TouchEvent) {
  mouseOrTouchPressed = true;

  const touch = event.changedTouches[0];
  const cell = document.elementFromPoint(touch.clientX, touch.clientY);
  if (cell) {
    cell.classList.add("hovered");
  }
}

function onTouchEnd(event: TouchEvent) {
  mouseOrTouchPressed = false;
  const touch = event.changedTouches[0];
  const cell = document.elementFromPoint(touch.clientX, touch.clientY);
  if (cell) {
    cell.classList.remove("hovered");
  }
}

function onTouchMove(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (mouseOrTouchPressed) {
  }

  const cell = document.elementFromPoint(touch.clientX, touch.clientY);
  if (cell) {
    cell.classList.add("hovered");
  }
}

//if mouse is clicked
function onMouseDown(event: MouseEvent) {
  mouseOrTouchPressed = true;
  const cell = document.elementFromPoint(event.clientX, event.clientY);
  if (cell) {
    cell.classList.add("hovered");
  }
}

// if mouse is released
function onMouseUp(event: MouseEvent) {
  mouseOrTouchPressed = false;
  const cell = document.elementFromPoint(event.clientX, event.clientY);
  if (cell) {
    cell.classList.remove("hovered");
  }
}
