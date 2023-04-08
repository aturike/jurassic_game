document.querySelector("#second-page").style.display = "none";

const canvas = document.querySelector("#canvas");
canvas.width = 650;
canvas.height = 650;
const ctx = canvas.getContext("2d");
let animationId;

const jeepWidth = 20;
const jeepHeigth = 15;
const jeepSpeed = 3;
let jeepX = canvas.width / 2 - jeepWidth;
const jeepY = canvas.height - jeepHeigth;

const raptorWidth = 15;
const raptorHeigth = 20;
const raptorLife = 2;
let raptorFreq = 0;

let isJeepleft = false;
let isJeepRight = false;
let isAimLeft = false;
let isAimRight = false;

const aimscope = Math.PI / 12;
let aimEnd = -Math.PI / 2 - aimscope;
let aimBegin = aimEnd + 2 * aimscope;
let aimspeed = 1.5;

let raptorArr = [];
let bulletArr = [];

let score = 0;
gameover = false;

class Raptor {
  constructor() {
    this.raptorX = canvas.width * Math.random();
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
      this.raptorAlive = false;
      score += 1 / raptorLife;
    } else {
      this.raptorLife -= 1;
    }
  }

  deadReverse() {
    this.raptorY -= jeepSpeed;
  }
}

class Bullet {
  constructor(aimangle) {
    this.bulletX = jeepX + jeepWidth / 2;
    this.bulletY = canvas.height - jeepHeigth;
    this.bulletSpeed = 4;
    this.bulletsize = 3;
    this.bulletHide = false;
    this.bulletSpeedX = Math.cos(aimangle) * this.bulletSpeed;
    this.bulletSpeepY = Math.sin(aimangle) * this.bulletSpeed;
  }

  drawBullet() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(this.bulletX, this.bulletY, this.bulletsize, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  moveBullet() {
    this.bulletY += this.bulletSpeepY;
    this.bulletX += this.bulletSpeedX;
  }

  bulletRemove() {
    this.bulletHide = true;
  }
}

window.addEventListener("load", () => {
  //   document.querySelector("#game-page").style.display = "none";

  //   document.querySelector(".next-button").addEventListener("click", hidePage);

  //   function hidePage() {
  //     document.querySelector("#second-page").style.display = "none";
  //     document.querySelector("#game-page").style.display = "block";
  //     startgame();
  //   }

  startgame();

  document.querySelector("#canvas").addEventListener("click", () => {
    bulletArr.push(new Bullet(aimEnd + aimscope));
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyA") {
      isAimLeft = true;
    }

    if (event.code === "KeyD") {
      isAimRight = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "KeyA") {
      isAimLeft = false;
    }

    if (event.code === "KeyD") {
      isAimRight = false;
    }
  });
});

function startgame() {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawJeep();
  drawAim();
  drawScore();

  //Raptor logic

  if (raptorFreq % 250 === 0) {
    raptorArr.push(new Raptor());
  }
  raptorFreq += 1;

  raptorArr.forEach((raptor, index) => {
    raptor.drawRaptor();

    if (
      jeepX < raptor.raptorX + raptorWidth &&
      jeepX + jeepWidth > raptor.raptorX &&
      jeepY < raptor.raptorY + raptorHeigth &&
      jeepHeigth + jeepY > raptor.raptorY
    ) {
      gameover = true;
    }

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
  });

  //Bullet logic
  bulletArr.forEach((bullet, index) => {
    bullet.drawBullet();
    bullet.moveBullet();

    if (bullet.bulletY < 0 || bullet.bulletHide) {
      bulletArr = bulletArr.filter(
        (bulletElement, bulletIndex) => bulletIndex !== index
      );
    }

    if (
      raptorArr.find(
        (raptor) =>
          raptor.raptorY > bullet.bulletY - bullet.bulletsize &&
          raptor.raptorY - raptorHeigth < bullet.bulletY + bullet.bulletsize &&
          raptor.raptorX - bullet.bulletsize < bullet.bulletX &&
          raptor.raptorX + raptorWidth + bullet.bulletsize > bullet.bulletX
      )
    ) {
      bullet.bulletRemove();
      raptorArr
        .find(
          (raptor) =>
            raptor.raptorY > bullet.bulletY - bullet.bulletsize &&
            raptor.raptorY - raptorHeigth <
              bullet.bulletY + bullet.bulletsize &&
            raptor.raptorX - bullet.bulletsize < bullet.bulletX &&
            raptor.raptorX + raptorWidth + bullet.bulletsize > bullet.bulletX
        )
        .raptordamage();
    }
  });

  //Jeep Logic

  if (score % 15 === 0 && score !== 0 && jeepX < canvas.width * 0.75) {
    jeepX += 1;
  } else if (score % 25 === 0 && score !== 0) {
    jeepX = canvas.width / 2 - jeepWidth;
  } else if (score % 35 === 0 && score !== 0 && jeepX < canvas.width * 0.25) {
    jeepX -= 1;
  }

  if (isAimLeft && aimEnd >= -Math.PI) {
    aimEnd -= (Math.PI / 360) * aimspeed;
    aimBegin = aimEnd + 2 * aimscope;
  } else if (isAimRight && aimBegin <= 0) {
    aimEnd += (Math.PI / 360) * aimspeed;
    aimBegin = aimEnd + 2 * aimscope;
  }

  if (gameover) {
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(startgame);
  }
}

function drawJeep() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(jeepX, jeepY, jeepWidth, jeepHeigth);
  ctx.closePath();
}

function drawAim() {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 5;
  ctx.arc(
    jeepX + jeepWidth / 2,
    canvas.height - jeepHeigth,
    30,
    aimBegin,
    aimEnd,
    true
  );
  ctx.stroke();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "48px serif";
  ctx.textAlign = "center";
  let text = `Score: ${Math.floor(score / raptorLife)}`;
  let textWidth = ctx.measureText(text).width;
  ctx.strokeText(text, canvas.width / 2 - textWidth / 2, 50);
}
