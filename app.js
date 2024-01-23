let asidei = document.getElementById("asideID");
let headeri = document.getElementById("headerID");
cancelAnimationFrame(headeri);

let asimargin = -150;
function asideAnimation() {
  if (asimargin > -10) {
    console.info("ende");
    cancelAnimationFrame(asidei);
    return;
  } else {
    asimargin++;
    asidei.style.marginLeft = asimargin + "px";
  }
  requestAnimationFrame(asideAnimation);
  cancelAnimationFrame(headeri);

}
requestAnimationFrame(asideAnimation);
cancelAnimationFrame(headeri);

let xi = document.getElementById("X");
let yi = document.getElementById("Y");
let da = document.getElementById("maindrawID");

class MousePosition {


  #mousePosXEl;
  get mousePosX() {
    return this.#mousePosXEl.value;
  }
  set mousePoX(val) {
    this.#mousePosXEl.value = val;
    const cev = new CustomEvent("poschanged", { detail: { x: val } });
    document.body.dispatchEvent(cev);
  }

  constructor(mousePosxEl) {
    this.#mousePosXEl = mousePosxEl;
  }
}

function coordinate(event) {
  let x = event.clientX ; //270 1023 
  let y = event.clientY ;//150 524
  document.body.appState.mousePoX = x;
  yi.value = y;
}

//onmousedown ?
function pen(e, color) {
  
}

document.body.appState = new MousePosition(xi);


document.body.addEventListener("poschanged", (ev) => {

  console.info("x: "+ev.detail.x);
});

//19
let canvas = document.getElementById("canvasID");
let ctx = canvas.getContext("2d");

function draw(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.lineTo(x + 10, y + 10);
  ctx.stroke();
}

function coordinate(event) {
  let x = event.clientX;
  let y = event.clientY;

  draw(x, y);
}
