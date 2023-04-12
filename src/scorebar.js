import { canvas, canvasHeight, ctx } from "./canvas.js";
import { scoreRaptor } from "./Assets/raptor.js";

const scoreBarHeight = 20;
const innerscoreBarHeight = scoreBarHeight / 4;
const innerscoreBarY =
  canvas.height - scoreBarHeight / 2 - innerscoreBarHeight / 2;

const innerScoreBarMargin = 20;

const maxScore = 100;

let redBarX = 0;

const jeepSideImg = new Image();
jeepSideImg.src = "img/jeep_2.png";
jeepSideImg.onload = function () {
  drawScoreBar();
};
const jeep2width = jeepSideImg.width / 40;
const jeep2heigth = jeepSideImg.height / 40;

function drawScoreBar() {
  redBarX =
    (canvas.width - innerScoreBarMargin * 2) * (scoreRaptor / maxScore) +
    innerScoreBarMargin;
  ctx.beginPath();
  ctx.fillStyle = "#04240d";
  ctx.fillRect(0, canvas.height - scoreBarHeight, canvas.width, scoreBarHeight);
  ctx.fill();
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(
    innerScoreBarMargin,
    innerscoreBarY,
    redBarX,
    innerscoreBarHeight
  );
  ctx.fill();

  ctx.fillStyle = "#eb0b0b";
  ctx.fillRect(
    redBarX,
    innerscoreBarY,
    canvas.width - redBarX - innerScoreBarMargin,
    innerscoreBarHeight
  );
  ctx.fill();

  ctx.drawImage(
    jeepSideImg,
    redBarX - jeep2width / 8,
    innerscoreBarY - jeep2heigth / 2,
    jeep2width,
    jeep2heigth
  );
  ctx.closePath();
}

export { drawScoreBar };
