function initialize_dragging() {
  var current_dragged_item;
  var offset_x = 0;
  var offset_y = 0;
  var images_gallery = $('.gallery');
  var images_gallery_left = images_gallery.offset().left;
  var place_holder = $('<li id="place_holder"><img></li>');

  images_gallery.on('mousedown', 'li', function (event) {
    current_dragged_item = $(this);
    offset_x = event.offsetX;
    offset_y = event.offsetY;
    event.preventDefault();
  });

  $(document).on('mousemove', function (event) {
    if (current_dragged_item) {
      var top = event.clientY - offset_y;
      var left = event.clientX - offset_x;
      var right = left - current_dragged_item.outerWidth();
      current_dragged_item.removeClass('gallery-image');
      current_dragged_item.css({
        'position': 'absolute',
        'top': top,
        'left': left
      });

      if (right < images_gallery_left) {
        place_holder.find('img').attr('src', current_dragged_item.find('img').attr('src'));
        var images_gallery_images = $('.gallery-image');

        if (top < 0) {
          images_gallery_images.eq(0).before(place_holder);
        }
        else {
          var image_height = current_dragged_item.height();
          var place_holder_index = images_gallery_images.index(place_holder);
          var start_index = -1;
          images_gallery_images.each(function () {
            if ($(this).offset().top < 0) {
              start_index++;
            }
            else {
              return null;
            }
          });
          var insert_index = start_index + Math.round(top / image_height);

          if (place_holder_index != insert_index) {
            if (insert_index == -1) {
              images_gallery_images.prepend(place_holder);
            }
            else {
              images_gallery_images.eq(insert_index).after(place_holder);
            }
          }
        }
      }
      else {
        place_holder.remove();
      }
    }
  });

  $(document).on('mouseup', function () {
    if (current_dragged_item) {
      current_dragged_item = undefined;
    }
  });
}