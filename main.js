const canvas = document.querySelector("#canvas");
let col_line = document.querySelector("#colorpicker");
let col_fill = document.querySelector("#fillpicker");
let lw = document.querySelector("#draWID");
let clr = document.querySelector("#clearID");
let uno = document.querySelector("#undoID");
let rdo = document.querySelector("#redOid");
let rect = document.querySelector("#rectID");
let circle = document.querySelector("#circleID");
let tri = document.querySelector("#triangleID");
let fill = document.querySelector("#fillID");
let downl = document.querySelector("#downloadID");
let tools = document.querySelector("#tools");

Array.prototype.peek = function () {
  const l = this.length;
  return this[l - 1];
}


canvas.width = window.innerWidth - 60;
canvas.height = 1200;
let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

function fillDrawHandler() {
  const f_option = ev.currentTarget.getAttribute('data-option');
  if (!f_option) return;
  const btn_active = document.querySelector(".tools .active");
  if (btn_active) {
    btn_active.classList.toggle("active");
  }
  ev.currentTarget.classList.toggle("active");

}
function main() {


  let is_drawing = false;
  let saved_arr = [];
  let saved_idx = -1;


  saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
  Array.from(document.querySelectorAll(".tools button")).forEach(e => {
    document.querySelector(".tools button[data-btn=pen]").click();

    e.addEventListener('click', ev => {

      canvas.willReadFrequently = true;
      const f_btn = ev.currentTarget.getAttribute('data-btn');

      if (!f_btn) return;
      const btn_active = document.querySelector(".tools .active");
      if (btn_active) {
        btn_active.classList.toggle("active");
      }
      document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'z') {
          document.querySelector(".tools button[data-btn=undo]").click();
        } else if (event.ctrlKey && event.key === 'y') {
          document.querySelector(".tools button[data-btn=redo]").click();
        } else if (event.ctrlKey && event.altKey && event.key === 'r') {
          document.querySelector(".tools button[data-btn=rect]").click();
        }else if (event.ctrlKey && event.altKey && event.key === 'c') {
          document.querySelector(".tools button[data-btn=circle]").click();
        }
      });
      if (f_btn === 'undo') {
        ev.currentTarget.classList.toggle('active');

        if (-1 === saved_idx) {
          document.querySelector(".tools button[data-btn=pen]").click();
          return alert("Nothing to undo");
        } else {
          const u = saved_arr[saved_idx--];
          context.putImageData(u, 0, 0);
          console.info('Undo: saved_idx' + saved_idx);
        }
      } else if (f_btn === 'redo') {
        ev.currentTarget.classList.toggle("active");
        if (saved_arr.length === saved_idx) {
          document.querySelector(".tools button[data-btn=pen]").click();
          return alert("Nothing to redo");

        } else {
          const r = saved_arr[++saved_idx];
          context.putImageData(r, 0, 0);
          console.info('Undo: saved_idx' + saved_idx);
        }
      } else if (f_btn === 'clear') {
        ev.currentTarget.classList.toggle("active");
        saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
        saved_idx += 1;
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = start_background_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();
        saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
        saved_idx += 1;
      }
      else if (f_btn === 'pen') {
        ev.currentTarget.classList.toggle("active");
        console.info(ev.currentTarget);
        canvas.addEventListener("mousedown", pen_start);
        canvas.addEventListener("mousemove", pen_draw);

        canvas.addEventListener("mouseup", pen_stop);
        canvas.addEventListener("mouseout", pen_stop);
        function pen_start(event) {

          is_drawing = true;
          context.beginPath();
          context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
          event.preventDefault();
          console.info("pen_start: saved_arr" + saved_arr + "saved_idx: " + saved_idx);
        }
        function pen_draw(event) {
          if (is_drawing) {
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.strokeStyle = col_line.value;
            context.lineWidth = lw.value;
            context.lineCap = 'round';
            context.stroke();
            event.preventDefault();
          }
          console.info("pen_draw: saved_arr" + saved_arr + "saved_idx: " + saved_idx);

        }
        function pen_stop(event) {
          if (is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
          }
          event.preventDefault();
          if (event.type != "mouseout") {

            saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
            saved_idx += 1;
          }
          console.info("pen_stop: saved_arr" + saved_arr + "saved_idx: " + saved_idx);

        }
      } else if (f_btn === 'rect') {
        ev.currentTarget.classList.toggle("active");
        canvas.addEventListener("mousedown", square_start);

        function square_start(event_st) {

          console.info("square_start: saved_arr");
          canvas.addEventListener("mousemove", square_draw);
          canvas.addEventListener("mouseup", square_stop);
          canvas.addEventListener("mouseout", square_stop);
          is_drawing = true;

          event_st.preventDefault();
          let startx = event_st.offsetX;
          let starty = event_st.offsetY;

          function square_draw(event_mv) {
            if (is_drawing) {
              //restore
              const d = saved_arr.peek();
              context.putImageData(d, 0, 0);
              let rect_w = event_mv.offsetX;
              let rect_h = event_mv.offsetY;
              //draw
              context.beginPath();
              context.fillStyle = col_fill.value;
              context.fillRect(startx + (lw.value / 2), starty + (lw.value / 2), Math.pow(rect_w - startx, 1), Math.pow(rect_h - starty, 1));
              context.strokeStyle = col_line.value;
              context.lineWidth = lw.value;

              context.rect(startx, starty, Math.pow(rect_w - startx, 1), Math.pow(rect_h - starty, 1));
              context.stroke();
              context.closePath();

            }
            event_mv.preventDefault();
           
          }
          function square_stop(event_sp) {
            if (is_drawing) {
              is_drawing = false;
              square_draw(event_sp);
              context.stroke();
              context.closePath();
              saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
              saved_idx += 1;
            }
            canvas.removeEventListener("mousedown", square_start);
            canvas.removeEventListener("mouseout", square_stop);
            canvas.removeEventListener("mousemove", square_draw);

            event_sp.preventDefault();
            document.querySelector(".tools button[data-btn=pen]").click();

          }
          event_st.currentTarget.classList.toggle("active");
        }
      } else if (f_btn === 'circle') {
        ev.currentTarget.classList.toggle("active");
        canvas.addEventListener("mousedown", circle_start);

        function circle_start(event_st) {

          canvas.addEventListener("mouseup", circle_stop);
          canvas.addEventListener("mouseout", circle_stop);
          canvas.addEventListener("mousemove", circle_draw);

          is_drawing = true;

          event_st.preventDefault();
          let startx = event_st.offsetX;
          let starty = event_st.offsetY;
          function circle_draw(event_mv) {
            if (is_drawing) {
              const c = saved_arr.peek();
              context.putImageData(c, 0, 0);
              let radius = Math.sqrt(Math.pow(event_mv.offsetX - startx, 2) + Math.pow(event_mv.offsetY - starty, 2));

              context.beginPath();
              context.fillStyle = col_fill.value;
              context.arc(startx, starty, radius, 0, 2 * Math.PI);
              context.fill();

              context.lineWidth = lw.value;
              context.lineCap = 'round';
              context.strokeStyle = col_line.value;
              context.arc(startx, starty, radius, 0, 2 * Math.PI);
              context.stroke();
              context.closePath();
            }
            event_mv.preventDefault();
          }
          function circle_stop(event_sp) {
            if (is_drawing) {
              is_drawing = false;
              circle_draw(event_sp);
              context.stroke();
              context.closePath();
              saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
              saved_idx += 1;

            }
            canvas.removeEventListener("mousedown", circle_start);
            canvas.removeEventListener("mousemove", circle_draw);
            canvas.removeEventListener("mouseout", circle_stop);
            event_sp.preventDefault();
            document.querySelector(".tools button[data-btn=pen]").click();
          }
        }
      } else if (f_btn === 'triangle') {
        ev.currentTarget.classList.toggle("active");
        canvas.addEventListener("mousedown", triangle_start);
        function triangle_start(event_st) {

          canvas.addEventListener("mouseup", triangle_stop);
          canvas.addEventListener("mouseout", triangle_stop);
          canvas.addEventListener("mousemove", triangle_draw);

          is_drawing = true;
          context.beginPath();
          context.moveTo(event_st.clientX - canvas.offsetLeft, event_st.clientY - canvas.offsetTop);
          event_st.preventDefault();
          function triangle_draw(event_mv) {
            if (is_drawing) {
              context.lineTo(event_st.clientX - canvas.offsetLeft, event_mv.clientY - canvas.offsetTop);
              context.lineTo(event_mv.clientX - canvas.offsetLeft, event_st.clientY - canvas.offsetTop);
              const t = saved_arr.peek();
              context.putImageData(t, 0, 0);

              context.stroke();
              context.closePath();
            }
            event_mv.preventDefault();
            console.info("circle_draw: saved_arr" + saved_arr + "saved_idx: " + saved_idx);
          }
          function triangle_stop(event_sp) {
            if (is_drawing) {
              is_drawing = false;
              triangle_draw(event_sp);
              context.stroke();
              context.closePath();
              saved_arr.push(context.getImageData(0, 0, canvas.width, canvas.height));
              saved_idx += 1;

            }
            canvas.removeEventListener("mousedown", triangle_start);
            canvas.removeEventListener("mousemove", triangle_draw);
            canvas.removeEventListener("mouseout", triangle_stop);
            event_sp.preventDefault();
          }
        }
      }
      else if (f_btn === 'download') {

        ev.currentTarget.classList.toggle("active");
        const canvas_image = new Image();
        canvas_image.src = canvas.toDataURL("image/png");
        const dwlink = document.createElement("a");
        dwlink.href = canvas_image.src;
        dwlink.download = 'canvas_image.jpeg';
        dwlink.click();
      }
    })
  });

}

main();