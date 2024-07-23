import { Hono } from "hono";
import App from "./components/App";
import { ServerWebSocket } from "bun";
import { generateSessionId } from "./utils";
import { BACKENDPLAYERS } from "./globals";
import Player from "./obj/Player";

//Bun web socket
const server = Bun.serve({
  port: 3000,
  fetch(req: Request, server: any) {
    const url = new URL(req.url).pathname;
    const filePath = url;

    if (url === "/ws") {
      const id = generateSessionId();
      const success = server.upgrade(req, {
        data: {
          sessionId: id,
        },
      });
      return success
        ? undefined
        : new Response("Upgrade Failed", { status: 500 });
    }

    return new Response("Not Found", { status: 404 });
  },
  websocket: {
    open(ws: ServerWebSocket) {
      const data: any = ws.data;
      console.log("client connected");

      //subscribes player to doku channel
      ws.subscribe("doku");

      //create new player
      const player = new Player(data.sessionId);
      BACKENDPLAYERS[data.sessionId] = player;

      //send backEndPlayers to clients
      server.publish(
        "doku",
        JSON.stringify({
          backEndPlayers: BACKENDPLAYERS,
        }),
      );
    },
    message(ws: ServerWebSocket, msg: string) {
      const data: any = ws.data;
    },
    close(ws: ServerWebSocket, code: any, msg: string) {
      const data: any = ws.data;

      ws.close(code, msg);
      ws.unsubscribe("doku");
      delete BACKENDPLAYERS[data.sessionId];
      console.log("client disconnected");
    },
  },
  error() {
    return new Response("Not Found", { status: 404 });
  },
});

//HONO
const app = new Hono();

app.get("/", (c) => {
  return c.html(<App />);
});

export default app;
