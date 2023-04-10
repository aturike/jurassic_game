import { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed } from "./jeep.js";
import { canvasWidth, ctx } from "../canvas.js";

const rap = new Image();
rap.src =
  "../img/raptor spritesheet/ezgif-4-64483f2b62-gif-png/frame_00_delay-0.04s.png";

let raptorArr = [];

const raptorImgW = rap.width / 1.7;
const raptorImgH = rap.height / 1.7;
const raptorWidth = raptorImgW / 4; //===hitbox logic here!
const raptorHeigth = raptorImgH / 6; //===hitbox logic here!

const raptorModX = -raptorWidth * 1.3;
const raptorModY = -raptorHeigth * 3.2;
let gameoverRaptor = false;
let scoreRaptor = 0;

class Raptor {
  constructor(raptorLife, raptorSpeed) {
    this.raptorX = canvasWidth * Math.random();
    this.raptorY = 0;
    this.raptorSpeed = raptorSpeed;
    this.raptorLife = raptorLife;
    this.raptorAlive = true;
  }

  drawRaptor() {
    // Hitboxdraw
    // ctx.beginPath();
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.raptorX, this.raptorY, raptorWidth, raptorHeigth);
    // ctx.closePath();

    ctx.drawImage(
      rap,
      this.raptorX + raptorModX,
      this.raptorY + raptorModY,
      raptorImgW,
      raptorImgH
    );
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
      console.log(this.raptorLife);
    }
  }

  deadReverse() {
    this.raptorY -= jeepSpeed;
  }
}

function raptorLogic() {
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

function newRaptor(raptorLife, raptorSpeed) {
  raptorArr.push(new Raptor(raptorLife, raptorSpeed));
}

export {
  raptorLogic,
  gameoverRaptor,
  newRaptor,
  scoreRaptor,
  raptorHeigth,
  raptorWidth,
  raptorArr,
};
