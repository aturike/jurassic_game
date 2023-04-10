import {
  raptorLogic,
  gameoverRaptor,
  newRaptor,
  scoreRaptor,
} from "./Assets/raptor.js";

import { bulletLogic, newBullet } from "./Assets/bullet.js";
import { drawJeep, jeepX } from "./Assets/jeep.js";
import { drawAim, moveAim } from "./Assets/aim.js";
import { canvasWidth, ctx, canvasHeight, canvas, drawBg } from "./canvas.js";

let animationId;

let frameCounter = 0;

let isAimLeft = false;
let isAimRight = false;

let raptorLife = 0;
let raptorSpeed = 0;
let raptorFreqency = 0;

window.addEventListener("load", () => {
  let displayArr = ["block", "none", "none"];
  let showIndex = 0;

  document.querySelector("#start-page-1").style.display = displayArr[0];
  document.querySelector("#start-page-2").style.display = displayArr[1];
  document.querySelector("#game-page").style.display = displayArr[2];

  document
    .querySelectorAll(".next-button")
    .forEach((page) => page.addEventListener("click", hidePage));

  function hidePage(event) {
    const pageMove = event.target.className;

    if (pageMove === "toSecond") {
      showIndex = 1;
    }

    //Start Game Logic
    if (pageMove.includes("toGame")) {
      showIndex = 2;
    }

    if (pageMove.includes("Easy")) {
      raptorLife = 2;
      raptorSpeed = 1;
      raptorFreqency = 250;
      startgame();
    }

    if (pageMove.includes("Medium")) {
      raptorLife = 4;
      raptorSpeed = 2;
      raptorFreqency = 150;
      startgame();
    }

    if (pageMove.includes("Hard")) {
      raptorLife = 4;
      raptorSpeed = 3;
      raptorFreqency = 100;
      startgame();
    }

    //Display pages logic
    for (let i = 0; i < displayArr.length; i++) {
      if (i === showIndex) {
        displayArr[i] = "block";
      } else {
        displayArr[i] = "none";
      }
    }
    document.querySelector("#start-page-1").style.display = displayArr[0];
    document.querySelector("#start-page-2").style.display = displayArr[1];
    document.querySelector("#game-page").style.display = displayArr[2];
  }

  function startgame() {
    animate();
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
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBg();
  drawJeep();

  drawscore();

  //Raptor logic

  if (frameCounter % raptorFreqency === 0) {
    newRaptor(raptorLife, raptorSpeed);
  }
  frameCounter += 1;

  raptorLogic();

  //Bullet logic

  bulletLogic();

  //Jeep Logic

  if (
    scoreRaptor % 15 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvasWidth * 0.75
  ) {
    jeepX += 1;
  } else if (scoreRaptor % 25 === 0 && scoreRaptor !== 0) {
    jeepX = canvasWidth / 2 - jeepWidth;
  } else if (
    scoreRaptor % 35 === 0 &&
    scoreRaptor !== 0 &&
    jeepX < canvasWidth * 0.25
  ) {
    jeepX -= 1;
  }

  //Aimlogic

  drawAim();
  moveAim(isAimLeft, isAimRight);

  if (gameoverRaptor) {
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(animate);
  }
}

function drawscore() {
  ctx.font = "48px serif";
  ctx.textAlign = "center";
  let text = `Score: ${scoreRaptor}`;
  let textWidth = ctx.measureText(text).width;
  ctx.strokeText(text, canvas.width / 2 - textWidth / 2, 50);
}
