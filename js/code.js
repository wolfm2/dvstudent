$(document).ready(function() {
  for (var item in window) {
    
    if ( /^N([0-9]{8})$/.test(item) ) { // find entries
      console.log("Found: " + item);
    }
    
    $('#test').html(window[item].email);
  }
  
});
