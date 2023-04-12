import { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed } from "./jeep.js";
import { canvasWidth, ctx } from "../canvas.js";

const rapImgArr = [];

const rap1 = new Image();
rap1.src = "img/raptor/frame_00_delay-0.04s.png";

const rap2 = new Image();
rap2.src = "img/raptor/frame_01_delay-0.04s.png";

const rap3 = new Image();
rap3.src = "img/raptor/frame_02_delay-0.04s.png";

const mirRapImgArr = [];

const mirRap1 = new Image();
mirRap1.src = "img/raptormirror/mirror-raptor-00.png";

const mirRap2 = new Image();
mirRap2.src = "img/raptormirror/mirror-raptor-01.png";

const mirRap3 = new Image();
mirRap3.src = "img/raptormirror/mirror-rap-02.png";

let raptorframe = 0;

const deadRap = new Image();
deadRap.src = "img/raptordead.png";

const blood = new Image();
blood.src = "img/blood.png";

let raptorArr = [];

const raptorImgW = rap1.width / 1.7;
const raptorImgH = rap1.height / 1.7;
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
    drawRaptor(this.raptorX, this.raptorY, this.raptorAlive);
  }

  moveRaptor() {
    this.raptorY += this.raptorSpeed;
    this.raptorX +=
      ((jeepX - this.raptorX) / (canvas.height - this.raptorY - jeepHeigth)) *
      this.raptorSpeed;
  }

  raptordamage() {
    if (this.raptorLife <= 1) {
      scoreRaptor += this.raptorAlive;
      this.raptorAlive = false;
    } else {
      this.raptorLife -= 1;
    }
  }

  deadReverse() {
    this.raptorY -= jeepSpeed;

    drawDeadRaptor(this.raptorX, this.raptorY);
  }
}

function drawRaptor(x, y, alive) {
  if (
    rap1.complete &&
    rap2.complete &&
    rap3.complete &&
    mirRap1.complete &&
    mirRap2.complete &&
    mirRap3.complete
  ) {
    //console.log("raptor complete");
    // Hitboxdraw
    // ctx.beginPath();
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.raptorX, this.raptorY, raptorWidth, raptorHeigth);
    // ctx.closePath();

    if (alive) {
      const frameLogic = Math.floor(raptorframe / 10);

      if (x <= canvasWidth / 2) {
        ctx.drawImage(
          rapImgArr[frameLogic % 3],
          x + raptorModX,
          y + raptorModY,
          raptorImgW,
          raptorImgH
        );
      } else {
        ctx.drawImage(
          mirRapImgArr[frameLogic % 3],
          x + raptorModX,
          y + raptorModY,
          raptorImgW,
          raptorImgH
        );
      }
    }

    raptorframe++;
  } else {
    //console.log("raptor not yet");
  }
}

function drawDeadRaptor(x, y) {
  if (blood.complete && deadRap.complete) {
    //console.log("dead rap complete");
    ctx.drawImage(
      deadRap,
      x + raptorModX,
      y + raptorModY,
      raptorImgW / 1.5,
      raptorImgH / 1.5
    );

    ctx.drawImage(blood, x, y - raptorHeigth, raptorImgW / 5, raptorImgH / 5);
  } else {
  }
}

function raptorLogic(retry) {
  if (retry) {
    raptorArr = [];
    gameoverRaptor = false;
    scoreRaptor = 0;
  }

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

rap1.onload = function () {
  rapImgArr.push(rap1);
  drawRaptor();
};

rap2.onload = function () {
  rapImgArr.push(rap2);
  drawRaptor();
};

rap3.onload = function () {
  rapImgArr.push(rap3);
  drawRaptor();
};

mirRap1.onload = function () {
  mirRapImgArr.push(mirRap1);
  drawRaptor();
};

mirRap2.onload = function () {
  mirRapImgArr.push(mirRap2);
  drawRaptor();
};

mirRap3.onload = function () {
  mirRapImgArr.push(mirRap3);
  drawRaptor();
};

deadRap.onload = function () {
  drawDeadRaptor();
};

blood.onload = function () {
  drawDeadRaptor();
};

export {
  raptorLogic,
  gameoverRaptor,
  newRaptor,
  scoreRaptor,
  raptorHeigth,
  raptorWidth,
  raptorArr,
};
