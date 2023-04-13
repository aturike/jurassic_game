import { ctx, canvasHeight, canvasWidth } from "../canvas.js";
import { sitdriver, sitshooter } from "./characters.js";
import { scoreRaptor } from "./raptor.js";

let intro = true;
const jeepImg = new Image();
jeepImg.src = "img/jeep_1.png";
jeepImg.onload = function () {
  drawJeep();
};

const jeepWidth = jeepImg.width / 20;
const jeepHeigth = jeepImg.height / 20;
const jeepSpeed = 3;
let jeepX = canvasWidth / 2 - jeepWidth;
const jeepY = canvasHeight - jeepHeigth - 30;
let jeepYintro = canvasHeight / 3;

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

  if (
    scoreRaptor % 15 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvasWidth * 0.65
  ) {
    jeepX += 1;
  } else if (
    scoreRaptor % 25 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvasWidth / 2 - jeepWidth
  ) {
    jeepX -= 1;
  } else if (
    scoreRaptor % 35 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvasWidth * 0.35
  ) {
    jeepX -= 1;
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
