import { Hono, Context } from "hono";
import App from "./components/App";
import { ServerWebSocket } from "bun";
import { generateSessionId } from "./utils";
import { BACKENDPLAYERS } from "./globals";
import Player from "./obj/Player";
import Game from "./components/Game";

//Bun web socket
export const server = Bun.serve({
  port: 0,
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

      //send id
      ws.send(JSON.stringify({ sessionId: data.sessionId }));

      //send log
      ws.send(JSON.stringify({ log: data.sessionId + " connected" }));

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

//gameloop
// setInterval(() => {
//   server.publish("doku", JSON.stringify({ backEndPlayers: BACKENDPLAYERS })),
//     30;
// });

//HONO
const app = new Hono();

app.get("/", (c: Context) => {
  return c.html(<App />);
});

app.post("/joingame", async (c: Context) => {
  const body = await c.req.parseBody();
  const sessionId = Number(body.sessionId);
  const player: Player = BACKENDPLAYERS[sessionId];
  return c.html(<Game player={player} />);
});

export default app;
