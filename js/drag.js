function initialize_dragging() {
  var current_dragged_item;
  var offset_x = 0;
  var offset_y = 0;

  $('.images-gallery').on('mousedown', 'li', function (event) {
    current_dragged_item = $(this);
    offset_x = event.offsetX;
    offset_y = event.offsetY;
    event.preventDefault();
  });

  $(document).on('mousemove', function (event) {
    if (current_dragged_item) {
      current_dragged_item.css({
        'position': 'absolute',
        'top': event.clientY - offset_y,
        'left': event.clientX - offset_x
      });
    }
  });

  $(document).on('mouseup', function () {
    if (current_dragged_item) {
      current_dragged_item = undefined;
    }
  });
}