import { ctx, canvasHeight } from "../canvas.js";
import { jeepHeigth, jeepX, jeepWidth, jeepY } from "./jeep.js";

const aimscope = Math.PI / 12;
let aimEnd = -Math.PI / 2 - aimscope;
let aimBegin = aimEnd + 2 * aimscope;
const aimY = jeepY + 10;

function drawAim() {
  ctx.beginPath();
  ctx.strokeStyle = "#e6d840";
  ctx.lineWidth = 5;
  ctx.arc(jeepX + jeepWidth / 2, aimY, 30, aimBegin, aimEnd, true);
  ctx.stroke();
  ctx.closePath();
}

function moveAim(aimspeed, isAimLeft, isAimRight) {
  if (isAimLeft && aimEnd >= -Math.PI) {
    aimEnd -= (Math.PI / 360) * aimspeed;
    aimBegin = aimEnd + 2 * aimscope;
  } else if (isAimRight && aimBegin <= 0) {
    aimEnd += (Math.PI / 360) * aimspeed;
    aimBegin = aimEnd + 2 * aimscope;
  }
}

export { drawAim, moveAim, aimEnd, aimscope, aimY };
