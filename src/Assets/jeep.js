import { ctx, canvasHeight, canvasWidth } from "../canvas.js";

const jeepWidth = 20;
const jeepHeigth = 15;
const jeepSpeed = 3;
let jeepX = canvasWidth / 2 - jeepWidth;
const jeepY = canvasHeight - jeepHeigth;

function drawJeep() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(jeepX, jeepY, jeepWidth, jeepHeigth);
  ctx.closePath();
}

export { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed, drawJeep };
