import { MessageTypes } from "../utils/constants";

export class WhiteboardSocket {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.clientId = null;
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

  sendRoomConnection(roomId) {
    this.socket.send(
      JSON.stringify({
        type: MessageTypes.ROOM_CONNECTION,
        roomId,
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
