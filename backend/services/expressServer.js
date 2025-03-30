import express from "express";
export class ExpressServer {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = null;
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Whiteboard Server");
    });
    // this.app.use("/auth", authRouter);
    // this.app.use("/room", roomRouter);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Express server is running on http://localhost:${this.port}`);
    });
    return this.server;
  }
}
