const canvas = document.querySelector("#canvas");

const canvasWidth = 650;
const canvasHeight = 650;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "../img/Background.png";

bgImg.onload = function () {
  drawBg();
};

function drawBg() {
  ctx.drawImage(bgImg, -40, 0, canvas.width + 80, canvas.height);
}

export { ctx, canvasWidth, canvasHeight, canvas, drawBg };
