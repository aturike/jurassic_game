const canvas = document.querySelector("#canvas");

const canvasWidth = 650;
const canvasHeight = 650;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

export { ctx, canvasWidth, canvasHeight };
