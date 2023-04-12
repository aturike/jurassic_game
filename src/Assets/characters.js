import { jeepX, jeepYintro, jeepHeigth, jeepWidth } from "./jeep.js";
import { ctx } from "../canvas.js";

const driverArr = [];
const shooterArr = [];
let characterframe = 0;
let shootercharacterframe = 0;

let driverX = -10;
let shooterX = -50;
let sitdriver = false;
let sitshooter = false;

const driverW1 = new Image();
driverW1.src = "img/Character/driverw1.png";
const driverWidth = driverW1.width * 1.5;
const driverHeight = driverW1.height * 1.5;

const driverW2 = new Image();
driverW2.src = "img/Character/driverw2.png";

const driverF = new Image();
driverF.src = "img/Character/driverfront.png";

driverW1.onload = function () {
  driverArr.push(driverW1);
  drawDriver();
};
driverW2.onload = function () {
  driverArr.push(driverW2);
  drawDriver();
};

driverF.onload = function () {
  drawDriver();
};

const shooter1 = new Image();
shooter1.src = "img/Character/shooterw1.png";

const shooter2 = new Image();
shooter2.src = "img/Character/shooterw2.png";

const shooterB = new Image();
shooterB.src = "img/Character/shooter-back.png";

shooter1.onload = function () {
  shooterArr.push(shooter1);
  drawShooter();
};

shooter2.onload = function () {
  shooterArr.push(shooter2);
  drawShooter();
};

shooterB.onload = function () {
  drawShooter();
};

function drawDriver() {
  if (driverW1.complete && driverW2.complete && driverF.complete) {
    const frameLogic = Math.floor(characterframe / 10);
    if (sitdriver) {
      ctx.drawImage(
        driverF,
        jeepX + 28,
        jeepYintro + jeepHeigth / 2 - 20,
        driverWidth,
        driverHeight
      );
    } else {
      ctx.drawImage(
        driverArr[frameLogic % 2],
        driverX,
        jeepYintro + jeepWidth / 2 + 13,
        driverWidth,
        driverHeight
      );
      moveDriver();
      characterframe++;
    }
  }
}

function moveDriver() {
  if (driverX + driverWidth <= jeepX) {
    driverX += 1;
  } else {
    sitdriver = true;
  }
}

function drawShooter() {
  if (shooter1.complete && shooter2.complete && shooterB.complete) {
    const frameLogic2 = Math.floor(shootercharacterframe / 10);
    if (sitshooter) {
      ctx.drawImage(
        shooterB,
        jeepX + jeepWidth / 2 - driverWidth / 2,
        jeepYintro + 5,
        driverWidth,
        driverHeight
      );
    } else {
      ctx.drawImage(
        shooterArr[frameLogic2 % 2],
        shooterX,
        jeepYintro + jeepWidth / 2 - 13,
        driverWidth,
        driverHeight
      );
      moveShooter();
      shootercharacterframe++;
    }
  }
}

function moveShooter() {
  if (shooterX + driverWidth <= jeepX) {
    shooterX += 1;
  } else {
    sitshooter = true;
  }
}

export { drawDriver, sitdriver, drawShooter, sitshooter };
