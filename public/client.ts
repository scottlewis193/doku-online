import { BACKENDPLAYERS } from "../src/globals";

const FRONTENDPLAYERS: any = {};
const FRONTENDGAME: any = {};
let SESSIONID: number = 0;
let socket: WebSocket;

connectWebSocket();

async function connectWebSocket(username: string = "") {
  //websocket listeners
  socket = new WebSocket("ws://localhost:3000/ws", "echo-protocol");

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
