import express from "express";
import { WebSocketServer } from "ws";
import { RoomManager } from "./roomManager.js";
import { ClientManager } from "./clientManager.js";
import { MessageHandler } from "./messageHandler.js";
import { MessageTypes } from "../utils/constants.js";

export class WhiteboardServer {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.roomManager = new RoomManager();
    this.clientManager = new ClientManager();
    this.setupServer();
    this.setupWebSocket();
    this.setupRoutes();
  }

  setupServer() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server is running on https://localhost:${this.port}`);
    });
  }

  setupWebSocket() {
    this.wss = new WebSocketServer({ server: this.server });
    this.messageHandler = new MessageHandler(
      this.wss,
      this.roomManager,
      this.clientManager
    );

    this.wss.on("connection", this.handleConnection.bind(this));
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Whiteboard Server");
    });
  }

  handleConnection(ws) {
    const clientId = this.clientManager.addClient(ws);

    ws.on("error", this.handleError);
    ws.on("message", (rawData) => this.handleMessage(ws, rawData));

    // Send client their ID
    ws.send(
      JSON.stringify({
        type: MessageTypes.CLIENT_ID,
        clientId,
      })
    );
  }

  handleError(error) {
    console.error("WebSocket error:", error);
  }

  handleMessage(ws, rawData) {
    try {
      const data = JSON.parse(rawData.toString());
      this.messageHandler.handle(ws, data);
    } catch (error) {
      console.error("Message handling error:", error);
    }
  }
}
