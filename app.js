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
let da = document.getElementById("maindrawID")
function coordinate(event) {
  let x = event.clientX ; //270 1023 
  let y = event.clientY ;//150 524
  xi.value = x;
  yi.value = y;
}


function pen(e, color) {

}