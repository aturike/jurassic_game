import {
  raptorLogic,
  gameoverRaptor,
  newRaptor,
  scoreRaptor,
} from "./Assets/raptor.js";

import { bulletLogic, newBullet } from "./Assets/bullet.js";
import { drawJeep, jeepX } from "./Assets/jeep.js";
import { drawAim, moveAim } from "./Assets/aim.js";

document.querySelector("#second-page").style.display = "none";

const canvas = document.querySelector("#canvas");
canvas.width = 650;
canvas.height = 650;
const ctx = canvas.getContext("2d");
let animationId;

let raptorFreq = 0;

let isAimLeft = false;
let isAimRight = false;

// const aimscope = Math.PI / 12;
// let aimEnd = -Math.PI / 2 - aimscope;
// let aimBegin = aimEnd + 2 * aimscope;
// let aimspeed = 1.5;

let raptorArr = [];

window.addEventListener("load", () => {
  //   document.querySelector("#game-page").style.display = "none";

  //   document.querySelector(".next-button").addEventListener("click", hidePage);

  //   function hidePage() {
  //     document.querySelector("#second-page").style.display = "none";
  //     document.querySelector("#game-page").style.display = "block";
  //     startgame();
  //   }

  startgame();

  document
    .querySelector("#canvas")
    .addEventListener("click", () => newBullet());

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
  drawscore();

  //Raptor logic

  if (raptorFreq % 250 === 0) {
    newRaptor(raptorArr);
  }
  raptorFreq += 1;

  raptorLogic(raptorArr);

  //Bullet logic

  bulletLogic(raptorArr);

  //Jeep Logic

  if (
    scoreRaptor % 15 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvas.width * 0.75
  ) {
    jeepX += 1;
  } else if (scoreRaptor % 25 === 0 && scoreRaptor !== 0) {
    jeepX = canvas.width / 2 - jeepWidth;
  } else if (
    scoreRaptor % 35 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvas.width * 0.25
  ) {
    jeepX -= 1;
  }

  //Aimlogic

  drawAim();
  moveAim(isAimLeft, isAimRight);

  if (gameoverRaptor) {
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(startgame);
  }
}

function drawscore() {
  ctx.font = "48px serif";
  ctx.textAlign = "center";
  let text = `Score: ${scoreRaptor}`;
  let textWidth = ctx.measureText(text).width;
  ctx.strokeText(text, canvas.width / 2 - textWidth / 2, 50);
}
