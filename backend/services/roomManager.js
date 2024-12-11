export class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomId) {
    const room = {
      id: roomId,
      clients: new Set(),
    };
    this.rooms.set(roomId, room);
    return room;
  }

  addClientToRoom(roomId, clientId) {
    let room = this.rooms.get(roomId);
    if (!room) {
      room = this.createRoom(roomId);
    }
    room.clients.add(clientId);
    return room;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getRoomByClientId(clientId) {
    return Array.from(this.rooms.values()).find((room) =>
      room.clients.has(clientId)
    );
  }
}
