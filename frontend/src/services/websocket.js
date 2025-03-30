import { MessageTypes, RoomConnectionTypes } from "../utils/constants";
import roomIdGenerator from "../utils/roomIdGenerator.js";
export class WhiteboardSocket {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.clientId = null;
    this.roomId = roomIdGenerator();
    this.currentRoomId = roomIdGenerator();
  }

  connect(onMessage) {
    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === MessageTypes.CLIENT_ID) {
        this.clientId = data.clientId;
      }
      onMessage(data);
    };
  }

  sendRoomConnection(roomId, type) {
    this.socket.send(
      JSON.stringify({
        type: MessageTypes.ROOM_CONNECTION,
        connectionType: type,
        roomId: type == RoomConnectionTypes.JOIN ? roomId : this.roomId,
        clientId: this.clientId,
      })
    );
  }

  sendMouseEvent(eventType, x, y) {
    this.socket.send(
      JSON.stringify({
        type: MessageTypes.MOUSE_EVENT,
        eventType,
        clientId: this.clientId,
        x,
        y,
      })
    );
  }

  sendToolEvent(tool) {
    this.socket.send(
      JSON.stringify({
        type: MessageTypes.TOOL_EVENT,
        tool,
        clientId: this.clientId,
      })
    );
  }
}
