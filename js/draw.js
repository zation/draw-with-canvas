window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var is_drawing = false;
  var is_on_canvas = false;

  function get_current_x(event) {
    return event.offsetX ? event.offsetX : event.targetTouches[0].pageX;
  }

  function get_current_y(event) {
    return event.offsetY ? event.offsetY : event.targetTouches[0].pageY;
  }

  function start_drawing() {
    is_drawing = true;
    context.beginPath();
  }

  function process_drawing(event) {
    if (is_drawing && is_on_canvas) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
    }
  }

  function end_drawing() {
    is_drawing ? context.closePath() : null;
    is_drawing = false;
  }

  function leave_canvas() {
    is_drawing ? context.closePath() : null;
    is_on_canvas = false;
  }

  function enter_canvas() {
    is_drawing ? context.beginPath() : null;
    is_on_canvas = true;
  }

  document.addEventListener('touchmove', function (event) {
    event.preventDefault();
  }, false);

  document.addEventListener('mousedown', start_drawing, false);
  document.addEventListener('touchstart', start_drawing, false);

  canvas.addEventListener('mousemove', process_drawing, false);
  canvas.addEventListener('touchmove', process_drawing, false);

  canvas.addEventListener('mouseout', leave_canvas, false);

  canvas.addEventListener('mouseover', enter_canvas, false);

  document.addEventListener('mouseup', end_drawing, false);
  document.addEventListener('touchend', end_drawing, false);

}, false);