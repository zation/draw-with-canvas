window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var drawing = false;

  function get_current_x(event) {
    return event.offsetX ? event.offsetX : event.targetTouches[0].pageX;
  }

  function get_current_y(event) {
    return event.offsetY ? event.offsetY : event.targetTouches[0].pageY;
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

  document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
  }, false);

  canvas.addEventListener('mousedown', start_drawing, false);
  canvas.addEventListener('touchstart', start_drawing, false);

  canvas.addEventListener('mousemove', process_drawing, false);
  canvas.addEventListener('touchmove', process_drawing, false);

  canvas.addEventListener('mouseup', end_drawing, false);
  canvas.addEventListener('touchend', end_drawing, false);

}, false);