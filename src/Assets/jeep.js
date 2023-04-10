import { ctx, canvasHeight, canvasWidth } from "../canvas.js";

const jeepImg = new Image();
jeepImg.src = "../img/jeep_1.png";
const jeepWidth = jeepImg.width / 20;
const jeepHeigth = jeepImg.height / 20;
const jeepSpeed = 3;
let jeepX = canvasWidth / 2 - jeepWidth;
const jeepY = canvasHeight - jeepHeigth - 10;
jeepImg.onload = drawJeep();

function drawJeep() {
  ctx.drawImage(jeepImg, jeepX, jeepY, jeepWidth, jeepHeigth);
}

export { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed, drawJeep };
