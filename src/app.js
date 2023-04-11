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
let retry = false;

let frameCounter = 0;

let isAimLeft = false;
let isAimRight = false;

let raptorLife = 0;
let raptorSpeed = 0;
let raptorFreqency = 0;
let aimspeed = 0;

let displayArr = ["block", "none", "none", "none", "none"];
let showIndex = 0;

const scoreArr = [];

window.addEventListener("load", () => {
  document.querySelector("#first-page").style.display = displayArr[0];
  document.querySelector("#start-page-1").style.display = displayArr[1];
  document.querySelector("#start-page-2").style.display = displayArr[2];
  document.querySelector("#game-page").style.display = displayArr[3];
  document.querySelector("#game-over-page").style.display = displayArr[4];

  document
    .querySelectorAll(".next-button")
    .forEach((page) => page.addEventListener("click", hidePage));

  function hidePage(event) {
    const pageMove = event.target.className;

    if (pageMove.includes("toFirst")) {
      showIndex = 1;
    }

    if (pageMove === "toSecond") {
      showIndex = 2;
    }

    //Start Game Logic
    if (pageMove.includes("toGame")) {
      showIndex = 3;
      aimspeed = document.querySelector("#aimSpeed").value;
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

    if (pageMove.includes("Retry")) {
      retry = true;
      startgame();
      retry = false;
    }

    pageDisplay();
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

function pageDisplay(highScoreArr) {
  for (let i = 0; i < displayArr.length; i++) {
    if (i === showIndex) {
      displayArr[i] = "block";
    } else {
      displayArr[i] = "none";
    }
  }

  document.querySelector("#first-page").style.display = displayArr[0];
  document.querySelector("#start-page-1").style.display = displayArr[1];
  document.querySelector("#start-page-2").style.display = displayArr[2];
  document.querySelector("#game-page").style.display = displayArr[3];
  document.querySelector("#game-over-page").style.display = displayArr[4];

  if (highScoreArr) {
    document.querySelectorAll(".score-li").forEach((liElement, index) => {
      if (highScoreArr[index] >= 0) {
        liElement.innerText = highScoreArr[index];
      }
    });
  }
}

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

  raptorLogic(retry);

  //Bullet logic

  bulletLogic(retry);

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
  moveAim(aimspeed, isAimLeft, isAimRight);

  if (gameoverRaptor) {
    cancelAnimationFrame(animationId);
    showIndex = 4;
    scoreArr.push(scoreRaptor);
    let highScoreArr = [...scoreArr].sort((a, b) => b - a).slice(0, 3);
    pageDisplay(highScoreArr);
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
