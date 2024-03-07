# Canvas

# Canvas with JavaScript

This canvas application allows users to draw shapes, lines, and fill colors on a canvas. It also provides options to undo, redo, clear, and download the drawn content.

## HotKeys 
[ctrl + Z]: Undo to the last checkpoint. <br>
[ctrl + Y]: Redo to the last checkpoint. <br>
[ctrl + alt + P]: Select Pen. <br>
[ctrl + alt + R]: Select Rectangle. <br>
[ctrl + alt + C]: Select Circle. <br>

## Function Description

- `fillDrawHandler`: This function handles the fill color option. It toggles the active class for the selected fill color button. <span style="color:red">- Not in Use, alternative Solution</span>.
- `main`: This is the main function that initializes the canvas, sets up event listeners, and handles the drawing process.

Note: Triangle does not work for now.

## Step by Step Guide

1. Initialize the canvas and set its dimensions to the window's inner width and a fixed height.
2. Set up the drawing context for the canvas.
3. Set up event listeners for the drawing tools and fill color options.
4. Initialize the `saved_arr` array to store the canvas's image data at different stages of drawing.
5. Set up the `fillDrawHandler` function to handle the fill color option. <span style="color:red">- Not in Use, alternative Solution</span>.
6. Set up the `main` function to handle the drawing process.
7. In the `main` function, set up a flag `is_drawing` to track whether the user is currently drawing.
8. Set up an array `saved_arr` to store the canvas's image data at different stages of drawing.
9. Set up a variable `saved_idx` to track the current index in the `saved_arr` array.
10. Add an event listener for the 'mousedown' event on the canvas. This will start the drawing process.
11. Add an event listener for the 'mousemove' event on the canvas. This will draw a line from the previous mouse position to the current mouse position.
12. Add an event listener for the 'mouseup' event on the canvas. This will stop the drawing process.
13. Add an event listener for the 'click' event on the fill color options. This will change the fill color for the next shape drawn.
14. Add an event listener for the 'click' event on the undo button. This will restore the previous stage of drawing from the `saved_arr` array.
15. Add an event listener for the 'click' event on the redo button. This will restore the next stage of drawing from the `saved_arr` array.
16. Add an event listener for the 'click' event on the clear button. This will clear the canvas and reset the drawing process.
17. Add an event listener for the 'click' event on the download button. This will download the drawn content as an image file.

## Example Usage

Here is an example of how to use the canvas application:

1. Open the canvas application in a web browser.
2. Start drawing by clicking on the canvas and moving the mouse.
3. Change the fill color by clicking on the desired fill color option.
4. Undo the last drawing action by clicking on the undo button.
5. Redo the last undone drawing action by clicking on the redo button.
6. Clear the canvas by clicking on the clear button.
7. Download the drawn content as an image file by clicking on the download button.

Please note that the provided code is a single file implementation. It is recommended to separate the JavaScript code into a separate file and link it to the HTML file. Additionally, it is recommended to use a more modern approach to handling events and event listeners using the addEventListener method.

Here is an example of how to separate the JavaScript code into a separate file:

1. Create a new file named canvas.js.
2. Move the entire JavaScript code into the canvas.js file.
3. In the HTML file, add a script tag with the src attribute set to the canvas.js file:
   ```html
   <script src="canvas.js"></script>
   ```
   This will ensure that the JavaScript code is loaded and executed correctly when the HTML file is loaded in a web browser.


