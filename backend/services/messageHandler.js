import { MessageTypes } from "../utils/constants.js";

export class MessageHandler {
  constructor(wss, roomManager, clientManager) {
    this.wss = wss;
    this.roomManager = roomManager;
    this.clientManager = clientManager;
  }

  handle(ws, data) {
    switch (data.type) {
      case MessageTypes.ROOM_CONNECTION:
        this.handleRoomConnection(ws, data);
        break;
      case MessageTypes.MOUSE_EVENT:
        this.handleMouseEvent(ws, data);
        break;
      case MessageTypes.TOOL_EVENT:
        this.handleToolEvent(ws, data);
        break;
      default:
        console.warn("Unknown message type:", data.type);
    }
  }

  handleRoomConnection(ws, data) {
    const room = this.roomManager.addClientToRoom(data.roomId, ws.id);
    console.log(`Client ${ws.id} joined room ${data.roomId}`);
  }

  handleMouseEvent(ws, data) {
    const room = this.roomManager.getRoomByClientId(data.clientId);
    if (!room) return;

    this.broadcastToRoom(room, data, data.clientId);
  }

  handleToolEvent(ws, data) {
    const room = this.roomManager.getRoomByClientId(data.clientId);
    if (!room) return;

    this.broadcastToRoom(room, data, data.clientId);
  }

  broadcastToRoom(room, data, excludeClientId) {
    this.wss.clients.forEach((client) => {
      if (client.id !== excludeClientId && room.clients.has(client.id)) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
