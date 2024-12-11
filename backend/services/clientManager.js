import { nanoid } from "nanoid";

export class ClientManager {
  constructor() {
    this.clients = new Map();
  }

  addClient(ws) {
    const clientId = `c-${nanoid(6)}`;
    ws.id = clientId;
    this.clients.set(clientId, ws);
    return clientId;
  }

  removeClient(clientId) {
    this.clients.delete(clientId);
  }

  getClient(clientId) {
    return this.clients.get(clientId);
  }
}
