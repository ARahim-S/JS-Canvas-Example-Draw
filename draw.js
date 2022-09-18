"use strict";
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 150;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = function (e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //offsetX offsetY parameters neeeded
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++ >= 360 ? (hue = 0) : hue++;

  if (ctx.lineWidth >= 150 || ctx.lineWidth <= 10) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // console.log([lastX, lastY]);
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mouseup", () => (isDrawing = false));
