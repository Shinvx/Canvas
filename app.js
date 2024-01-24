let asidei = document.querySelector("#asideID");
let headeri = document.querySelector("#headerID");
let canvas = document.querySelector("#canvasID");
let ctx = canvas.getContext("2d");
let xi = document.querySelector("#X");
let yi = document.querySelector("#Y");
let da = document.querySelector("#maindrawID");
let cp = document.querySelector("#colorpicker");
let dwi= document.querySelector("#draWID");
let cyr= document.querySelector("#circleID");
let draw = (e) => 0;

let asimargin = -30;
function asideAnimation() {
  if (asimargin > -10) {
    console.info("ende");
    resize();
    return;
  } else {
    asimargin++;
    asidei.style.marginLeft = asimargin + "px";
  }
  requestAnimationFrame(asideAnimation);
}
requestAnimationFrame(asideAnimation);


class MousePosition {


  #mousePosXEl;
  get mousePosX() {
    return this.#mousePosXEl.value;
  }
  set mousePoX(val) {
    this.#mousePosXEl.value = val;
    const cev = new CustomEvent("poschanged", { detail: { x: val, prevx: this.mousePosX } });
    document.body.dispatchEvent(cev);
  }

  constructor(mousePosxEl) {
    this.#mousePosXEl = mousePosxEl;
  }
}


  resize();
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mouseup', stopPainting);
  document.addEventListener('mousemove', drawLine, draw, drawCircle);
  canvas.addEventListener('resize', resize);


let coord = {x: 0, y:0};
let paint = false;
function coordinate(event) {
  coord.x = event.clientX - canvas.offsetLeft; //270 1023 
  coord.y = event.clientY - canvas.offsetTop;//150 524

}
function startPainting(event) {
  paint = true;
  coordinate(event);
}

function resize() {
  console.info(da.scrollHeight, da.scrollWidth, canvas.height, canvas.width);
  canvas.width = da.scrollWidth;
  canvas.height = da.scrollHeight;
  console.info(da.scrollHeight, da.scrollWidth, canvas.height, canvas.width);

}
function stopPainting() {
  paint = false;
}
document.body.appState = new MousePosition(xi);


document.body.addEventListener("poschanged", (ev) => {

  console.info("x: " + ev.detail.x);
});

function drawLine(event) {
  if (!paint) return;
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.strokeStyle = cp.value;
  ctx.lineWidth = dwi.value;
  ctx.moveTo(coord.x, coord.y);
  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  ctx.stroke();
 coord.x = event.clientX - canvas.offsetLeft;
 coord.y = event.clientY - canvas.offsetTop;  
}
// draw = startDrawLine;
// function startDrawLine(x, y) {
//   paint = true;
//   let lastcord = {x, y};
//   return drawLine(lastcord.x, lastcord.y); 
// }
function drawCircle(event) {
  ctx.strokeStyle = cp.value;
  ctx.lineWidth = dwi.value;
  ctx.beginPath();
  ctx.arc(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, 40, 0, 2 * Math.PI);
  ctx.stroke();
  coord.x = event.clientX - canvas.offsetLeft;
 coord.y = event.clientY - canvas.offsetTop;
}

