# Canvas

## Desciption

this Project was created with Visual Studio Code and contains a index.html for elements, style.css for the styling and main.js for the function and instructions.
It is About the Canvas from Javascript with pen, rectangle, triangle and square. 

Note: Triangle does not work for now.

## HotKeys 
[ctrl + Z]: Undo to the last checkpoint. <br>
[ctrl + Y]: Redo to the last checkpoint. <br>
[ctrl + alt + P]: Select Pen. <br>
[ctrl + alt + R]: Select Rectangle. <br>
[ctrl + alt + C]: Select Circle. <br>

## Function
### Pen
``js
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
```


