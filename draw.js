window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var drawing = false;

  function get_current_x(event) {
    return event.offsetX;
  }

  function get_current_y(event) {
    return event.offsetY;
  }

  function start_drawing(event) {
    context.beginPath();
    context.moveTo(get_current_x(event), get_current_y(event));
    drawing = true;
  }

  function process_drawing(event) {
    if (drawing) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
    }
  }

  function end_drawing(event) {
    if (drawing) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
      context.closePath();

      drawing = false;
    }
  }

  canvas.addEventListener('mousedown', start_drawing, false);

  canvas.addEventListener('mousemove', process_drawing, false);

  canvas.addEventListener('mouseup', end_drawing, false);

}, false);