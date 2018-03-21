/*
Locates all student work objects in global namespace.
Inits page.
*/

// set background
function setBg () {
  img = new Image();
  img.src = "assets/background.jpg";
  img.style.opacity = "0.3";
  document.body.appendChild(img);
}

// main
$(document).ready(function() {
  setBg();
  for (var item in window) {
    
    if ( /^N([0-9]{8})$/.test(item) ) { // find entries
      console.log("Found: " + item);
      $('#test').html(window[item].email);
    }
  }
});
