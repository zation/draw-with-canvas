window.addEventListener('DOMContentLoaded', function () {
  function get_current_x(event) {
//    return event.clientX - canvas.offsetLeft;
    return event.offsetX;
  }

  function get_current_y(event) {
//    return event.clientY - canvas.offsetTop;
    return event.offsetY;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var drawing = false;

  canvas.addEventListener('mousedown', function (event) {
    context.beginPath();
    context.moveTo(get_current_x(event), get_current_y(event));
//    console.log(get_current_x(event, canvas), get_current_y(event, canvas));
    drawing = true;
  }, false);

  canvas.addEventListener('mousemove', function (event) {
    if (drawing) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
//      console.log(get_current_x(event, canvas), get_current_y(event, canvas));
    }
  }, false);

  canvas.addEventListener('mouseup', function (event) {
    if (drawing) {
      context.lineTo(get_current_x(event), get_current_y(event));
      context.stroke();
      context.closePath();
//      console.log(get_current_x(event, canvas), get_current_y(event, canvas));

      drawing = false;
    }
  }, false);

}, false);