import { ExpressServer } from "./services/expressServer.js";
import { WebSocketHandler } from "./services/websocketServer.js";
import { RoomManager } from "./services/roomManager.js";
import { ClientManager } from "./services/clientManager.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

export class WhiteboardServer {
  constructor(port) {
    this.port = port;
    this.roomManager = new RoomManager();
    this.clientManager = new ClientManager();
    this.initializeServer();
  }

  async initializeServer() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      const expressServer = new ExpressServer(this.port);
      const httpServer = expressServer.start();
      new WebSocketHandler(httpServer, this.roomManager, this.clientManager);
    } catch (error) {
      console.error;
    }
  }
}

export default function createServer() {
  const server = new WhiteboardServer(process.env.PORT);
  return server;
}

// import { WhiteboardServer } from "./services/websocketServer.js";

// const server = new WhiteboardServer(3000);

/* draft - 1 */

// import express from "express";
// import { nanoid } from "nanoid";
// import { WebSocketServer } from "ws";

// const rooms = [];

// const app = express();

// const server = app.listen(3000, () => {
//   console.log("Server is running on https://localhost:3000");
// });

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   const clientUID = `c-${nanoid(6)}`;
//   ws.id = clientUID;
//   ws.on("error", (error) => {
//     console.log(error);
//   });

//   ws.on("message", (rawData) => {
//     const data = JSON.parse(rawData.toString());
//     console.log(data);
//     if (data.type == "room-connection") {
//       const [room] = rooms.filter((room) => {
//         return room.id == data.roomId;
//       });
//       if (!room) {
//         const newRoom = {
//           id: "123",
//           clients: [ws.id],
//         };
//         rooms.push(newRoom);
//       } else {
//         room.id = data.roomId;
//         if (Object.hasOwn(room, "clients")) {
//           room.clients.push(ws.id);
//         } else {
//           room.clients = [ws.id];
//         }
//       }
//     } else if (data.type == "mouse-event") {
//       const [clientRoom] = rooms.filter((room) => {
//         return room.clients.includes(data.clientId);
//       });
//       console.log(clientRoom);
//       if (data.eventType == "mouse-down") {
//         wss.clients.forEach((client) => {
//           if (client.id == data.clientId) {
//           } else if (clientRoom.clients.includes(client.id)) {
//             const eventData = {
//               type: "mouse-event",
//               eventType: "mouse-down",
//               x: data.x,
//               y: data.y,
//             };
//             client.send(JSON.stringify(eventData));
//           }
//         });
//       } else if (data.eventType == "mouse-move") {
//         wss.clients.forEach((client) => {
//           if (client.id == data.clientId) {
//           } else if (clientRoom.clients.includes(client.id)) {
//             const eventData = {
//               type: "mouse-event",
//               eventType: "mouse-move",
//               x: data.x,
//               y: data.y,
//             };
//             client.send(JSON.stringify(eventData));
//           }
//         });
//       } else if (data.eventType == "mouse-up") {
//         wss.clients.forEach((client) => {
//           if (client.id == data.clientId) {
//           } else if (clientRoom.clients.includes(client.id)) {
//             const eventData = {
//               type: "mouse-event",
//               eventType: "mouse-up",
//             };
//             client.send(JSON.stringify(eventData));
//           }
//         });
//       }
//     } else if (data.type == "tool-event") {
//       const [clientRoom] = rooms.filter((room) => {
//         return room.clients.includes(data.clientId);
//       });
//       wss.clients.forEach((client) => {
//         if (client.id == data.clientId) {
//         } else if (clientRoom.clients.includes(client.id)) {
//           const eventData = {
//             type: "tool-event",
//             eventType: "",
//             tool: data.tool,
//           };
//           client.send(JSON.stringify(eventData));
//         }
//       });
//     }
//     return console.log(rooms);
//     // console.log(data.toString());
//   });

//   ws.send(JSON.stringify({ type: "clientId", clientId: clientUID }));
// });

// app.get("/", (req, res) => {
//   res.send("Server");
// });
