import { Tools } from "./constants";

export class CanvasManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 64;
  }

  draw(x, y, tool) {
    this.ctx.strokeStyle = tool === Tools.ERASER ? "black" : "white";
    this.ctx.lineWidth = tool === Tools.ERASER ? 20 : 2;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  startPath(x, y) {
    this.ctx.moveTo(x, y);
    this.ctx.beginPath();
  }

  endPath() {
    this.ctx.closePath();
  }
}
