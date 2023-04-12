import { ctx, canvasHeight, canvasWidth } from "../canvas.js";
import { sitdriver, sitshooter } from "./characters.js";

const jeepWidth = jeepImg.width / 20;
const jeepHeigth = jeepImg.height / 20;
const jeepSpeed = 3;
let jeepX = canvasWidth / 2 - jeepWidth;
const jeepY = canvasHeight - jeepHeigth - 30;
let jeepYintro = canvasHeight / 3;

let intro = true;
const jeepImg = new Image();
jeepImg.src = "img/jeep_1.png";
jeepImg.onload = function () {
  drawJeep();
};

function drawJeep() {
  if (jeepImg.complete) {
    //console.log("jeep complete");
    ctx.drawImage(jeepImg, jeepX, jeepY, jeepWidth, jeepHeigth);
  } else {
    setInterval(drawJeep(), 100);
  }
}

function drawJeepIntro() {
  if (jeepImg.complete) {
    //console.log("jeep complete");
    ctx.drawImage(jeepImg, jeepX, jeepYintro, jeepWidth, jeepHeigth);
  } else {
  }
}

function moveJeep() {
  if (sitdriver && sitshooter) {
    if (jeepYintro <= jeepY) {
      jeepYintro += jeepSpeed;
    } else {
      intro = false;
    }
  }
}

export {
  jeepWidth,
  jeepHeigth,
  jeepX,
  jeepY,
  jeepYintro,
  jeepSpeed,
  drawJeep,
  drawJeepIntro,
  moveJeep,
  intro,
};
