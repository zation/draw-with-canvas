window.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var is_drawing = false;
  var is_in_canvas = false;
  var is_on_mobile = navigator.userAgent.match(/Mobile/i);

  function get_current_x(event) {
    return event.offsetX === undefined ? event.targetTouches[0].pageX : event.offsetX;
  }

  function get_current_y(event) {
    return event.offsetY === undefined ? event.targetTouches[0].pageY : event.offsetY;
  }

  function start_drawing() {
    is_drawing = true;
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
    if (is_drawing) context.closePath();
    is_in_canvas = false;
  }

  function enter_canvas() {
    if (is_drawing) context.beginPath();
    is_in_canvas = true;
  }

  if (is_on_mobile) {
    is_in_canvas = true;
    document.addEventListener('touchmove', function (event) {
      event.preventDefault();
    }, false);
    document.addEventListener('touchstart', start_drawing, false);
    canvas.addEventListener('touchmove', process_drawing, false);
    document.addEventListener('touchend', end_drawing, false);
  }
  else {
    document.addEventListener('mousedown', start_drawing, false);
    canvas.addEventListener('mousemove', process_drawing, false);
    canvas.addEventListener('mouseout', leave_canvas, false);
    canvas.addEventListener('mouseover', enter_canvas, false);
    document.addEventListener('mouseup', end_drawing, false);
  }


}, false);