const canvas = document.querySelector("#canvas");
import { jeepSpeed } from "./Assets/jeep.js";

const canvasWidth = 650;
const canvasHeight = 680;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "img/Background.png";

bgImg.onload = function () {
  drawBg();
};

let bg1Y = 0;
let bg2Y = bgImg.height;

function drawBg() {
  ctx.drawImage(bgImg, 0, bg1Y, canvas.width, bgImg.height);
  ctx.drawImage(bgImg, 0, bg2Y, canvas.width, bgImg.height);
  moveBg();
}

function moveBg() {
  bg1Y -= jeepSpeed;
  bg2Y -= jeepSpeed;

  if (bg1Y + bgImg.height < 0) {
    bg1Y = bg2Y + bgImg.height;
  }

  if (bg2Y + bgImg.height < 0) {
    bg2Y = bg1Y + bgImg.height;
  }
}

export { ctx, canvasWidth, canvasHeight, canvas, drawBg };
