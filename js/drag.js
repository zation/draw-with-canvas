function initialize_dragging() {
  var current_dragged_item;
  var offset_x;
  var offset_y;
  var gallery = $('.gallery');
  var gallery_left = gallery.offset().left;
  var place_holder = $('<li id="place_holder"><img></li>');

  gallery.on('mousedown', 'li', function (event) {
    current_dragged_item = $(this);
    offset_x = event.offsetX;
    offset_y = event.offsetY;
    event.preventDefault();
  });

  function get_place_holder_index() {
    var place_holder_index = 0;
    var all_gallery_image = gallery.find('li');

    for (var index = 0; index < all_gallery_image.length; index++) {
      var image = $(all_gallery_image[index]);
      if (image.hasClass('gallery-image')) {
        place_holder_index++;
      }
      else if (image.attr('id') == 'place_holder') {
        return place_holder_index;
      }
    }
    return -1;
  }

  $(document).on('mousemove', function (event) {
    if (current_dragged_item) {
      var top = event.clientY - offset_y;
      var left = event.clientX - offset_x;
      var right = left - current_dragged_item.outerWidth();
      current_dragged_item[0].className = 'dragging';
      current_dragged_item.css({
        'top': top,
        'left': left
      });

      function get_insert_index(gallery_images) {
        var start_index = -1;
        for (var index = 0; index < gallery_images.length; index++) {
          if ($(gallery_images[index]).offset().top < 0) {
            start_index++;
          }
          else {
            return start_index + Math.round(top / current_dragged_item.height());
          }
        }
        return start_index;
      }

      function add_place_holder() {
        var gallery_images = $('.gallery-image');
        var insert_index = get_insert_index(gallery_images);

        if (get_place_holder_index() != insert_index + 1) {
          insert_index == -1 ? gallery_images.eq(0).before(place_holder) : gallery_images.eq(insert_index).after(place_holder);
        }
      }

      function show_place_holder() {
        place_holder.find('img').attr('src', current_dragged_item.find('img').attr('src'));
        add_place_holder();
      }

      right < gallery_left ? show_place_holder() : place_holder.remove();
    }
  });

  $(document).on('mouseup', function () {
    if (current_dragged_item) {
      if (get_place_holder_index() != -1) {
        current_dragged_item.remove();
        place_holder.after(current_dragged_item);
        place_holder.remove();
        current_dragged_item[0].className = 'gallery-image';
      }
      current_dragged_item = undefined;
    }
  });
}