import { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed } from "./jeep.js";
import { canvasWidth, ctx } from "../canvas.js";

const raptorWidth = 15;
const raptorHeigth = 20;
const raptorLife = 2;
let gameoverRaptor = false;
let scoreRaptor = 0;

class Raptor {
  constructor() {
    this.raptorX = canvasWidth * Math.random();
    this.raptorY = 0;
    this.raptorSpeed = 1;
    this.raptorLife = raptorLife;
    this.raptorAlive = true;
  }

  drawRaptor() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(this.raptorX, this.raptorY, raptorWidth, raptorHeigth);
    ctx.closePath();
  }

  moveRaptor() {
    this.raptorY += this.raptorSpeed;
    this.raptorX +=
      ((jeepX - this.raptorX) / (canvas.height - this.raptorY - jeepHeigth)) *
      this.raptorSpeed;
  }

  raptordamage() {
    if (this.raptorLife <= 0) {
      scoreRaptor += this.raptorAlive;
      this.raptorAlive = false;
    } else {
      this.raptorLife -= 1;
    }
  }

  deadReverse() {
    this.raptorY -= jeepSpeed;
  }
}

function raptorLogic(raptorArr) {
  raptorArr.forEach((raptor, index) => {
    raptor.drawRaptor();

    if (raptor.raptorY < 0) {
      raptorArr = raptorArr.filter(
        (raptorElement, raptorIndex) => raptorIndex !== index
      );
    }

    if (raptor.raptorAlive) {
      raptor.moveRaptor();
    } else {
      raptor.deadReverse();
    }

    if (
      jeepX < raptor.raptorX + raptorWidth &&
      jeepX + jeepWidth > raptor.raptorX &&
      jeepY < raptor.raptorY + raptorHeigth &&
      jeepHeigth + jeepY > raptor.raptorY
    ) {
      gameoverRaptor = true;
    }
  });
}

function newRaptor(rArr, canvasWidth, ctx) {
  rArr.push(new Raptor(canvasWidth, ctx));
}

export {
  raptorLogic,
  gameoverRaptor,
  newRaptor,
  scoreRaptor,
  raptorHeigth,
  raptorWidth,
};
