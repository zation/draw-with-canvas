function initialize_dragging() {
  var current_dragged_item;
  var offset_x;
  var offset_y;
  var gallery = $('.gallery');
  var gallery_left = gallery.offset().left;
  var place_holder = $('<li id="place_holder"><img></li>');

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

  function get_current_x(event) {
    var originalEvent = event.originalEvent;
    return originalEvent.targetTouches == undefined ? event.offsetX : originalEvent.targetTouches[0].clientX - current_dragged_item.offset().left;
  }

  function get_current_y(event) {
    var originalEvent = event.originalEvent;
    return originalEvent.targetTouches == undefined ? event.offsetY : originalEvent.targetTouches[0].clientY - current_dragged_item.offset().top;
  }

  function get_current_top(event) {
    var originalEvent = event.originalEvent;
    return originalEvent.targetTouches == undefined ? event.clientY : originalEvent.targetTouches[0].clientY;
  }

  function get_current_left(event) {
    var originalEvent = event.originalEvent;
    return originalEvent.targetTouches == undefined ? event.clientX : originalEvent.targetTouches[0].clientX;
  }

  function check_dragging(event) {
    if (event.originalEvent.targetTouches.length < 2 && !current_dragged_item) {
      start_dragging(event);
    }
  }

  function start_dragging(event) {
    current_dragged_item = $(event.currentTarget);
    offset_x = get_current_x(event);
    offset_y = get_current_y(event);
    event.preventDefault();
  }

  function process_dragging(event) {
    if (current_dragged_item) {
      var top = get_current_top(event) - offset_y;
      var left = get_current_left(event) - offset_x;
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

        if (gallery_images.length == 0) {
          gallery.append(place_holder);
        }
        else if (get_place_holder_index() != insert_index + 1) {
          insert_index == -1 ? gallery_images.eq(0).before(place_holder) : gallery_images.eq(insert_index).after(place_holder);
        }
      }

      function show_place_holder() {
        place_holder.find('img').attr('src', current_dragged_item.find('img').attr('src'));
        add_place_holder();
      }

      right < gallery_left ? show_place_holder() : place_holder.remove();
    }
  }

  function end_dragging() {
    if (current_dragged_item) {
      if (get_place_holder_index() != -1) {
        current_dragged_item.remove();
        place_holder.after(current_dragged_item);
        place_holder.remove();
        current_dragged_item[0].className = 'gallery-image';
      }
      current_dragged_item = undefined;
    }
  }



  gallery.on('mousedown', 'li', start_dragging);
  $(document).on('mousemove', process_dragging);
  $(document).on('mouseup', end_dragging);

  gallery.on('touchstart', 'li', check_dragging);
  $(document).on('touchmove', process_dragging);
  $(document).on('touchend', end_dragging);

}