window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var is_drawing = false;
  var is_in_canvas = true;

  function get_current_x(event) {
    return event.offsetX === undefined ? event.targetTouches[0].clientX - canvas.offsetLeft : event.offsetX;
  }

  function get_current_y(event) {
    return event.offsetY === undefined ? event.targetTouches[0].clientY - canvas.offsetTop : event.offsetY;
  }

  function start_drawing() {
    is_drawing = true;
    is_in_canvas = true;
    context.beginPath();
  }

  function process_drawing(event) {
    if (is_drawing && is_in_canvas) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
    }
  }

  function end_drawing() {
    if (is_drawing) context.closePath();
    is_drawing = false;
  }

  function leave_canvas() {
    if (is_drawing)  context.closePath();
    is_in_canvas = false;
  }

  function enter_canvas() {
    if (is_drawing) context.beginPath();
    is_in_canvas = true;
  }

  canvas.addEventListener('touchmove', function (event) {
    event.preventDefault();
  }, false);

  canvas.addEventListener('touchstart', start_drawing, false);
  canvas.addEventListener('touchmove', process_drawing, false);
  canvas.addEventListener('touchend', end_drawing, false);

  canvas.addEventListener('mousedown', start_drawing, false);
  canvas.addEventListener('mousemove', process_drawing, false);
  canvas.addEventListener('mouseup', end_drawing, false);
  canvas.addEventListener('mouseout', leave_canvas, false);
  canvas.addEventListener('mouseover', enter_canvas, false);

}, false);