function initialize_dragging() {

  document.getElementsByClassName('images-gallery')[0].addEventListener('dragstart', function (event) {
    event.dataTransfer.effectAllowed = 'move';
  }, false);

  document.getElementsByClassName('images-gallery')[0].addEventListener('dragend', function (event) {
    var element = event.target.parentElement;
    element.className = 'dragged';
    element.style.top = event.clientY + 'px';
    element.style.left = event.clientX + 'px';
  }, false);
}