import { ctx, canvasHeight } from "../canvas.js";
import { jeepHeigth, jeepX, jeepWidth } from "./jeep.js";

const aimscope = Math.PI / 12;
let aimEnd = -Math.PI / 2 - aimscope;
let aimBegin = aimEnd + 2 * aimscope;

function drawAim() {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 5;
  ctx.arc(
    jeepX + jeepWidth / 2,
    canvasHeight - jeepHeigth,
    30,
    aimBegin,
    aimEnd,
    true
  );
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

export { drawAim, moveAim, aimEnd, aimscope };
