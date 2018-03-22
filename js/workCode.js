entry = `
      <!-- Portfolio Item Heading -->
      <h1 class="my-4">Page Heading
        <small>Secondary Text</small>
      </h1>

      <!-- Portfolio Item Row -->
      <div class="row">

        <div class="col-md-8">
          <img class="img-fluid" src="http://placehold.it/750x500" alt="">
        </div>

        <div class="col-md-4">
          <h3 class="my-3">Project Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
          <h3 class="my-3">Project Details</h3>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Dolor Sit Amet</li>
            <li>Consectetur</li>
            <li>Adipiscing Elit</li>
          </ul>
        </div>

      </div>
      <!-- /.row -->

      <!-- Related Projects Row -->
      <h3 class="my-4">Related Projects</h3>

      <div class="row">

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

      </div>
      <!-- /.row -->
`;

// Parse URI query string
function parseQuery(queryString) {
    var dictionary = {};
     
    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    }
     
    // Step 1: separate out each key/value pair
    var parts = queryString.split('&');
     
    for(var i = 0; i < parts.length; i++) {
        var p = parts[i];
        // Step 2: Split Key/Value pair
        var keyValuePair = p.split('=');
         
        // Step 3: Add Key/Value pair to Dictionary object
        var key = keyValuePair[0];
        var value = keyValuePair[1];
         
        // decode URI encoded string
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, ' ');
         
        dictionary[key] = value;
    }
     
    // Step 4: Return Dictionary Object
    return dictionary;
}

// a pythonesque format method
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args;
        args = arguments;
        if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
            args = args[0];
        }
        return this.replace(/{([^}]*)}/g, function(match, key) {
            return (typeof args[key] !== "undefined" ? args[key] : match);
        });
    };
}


entry = `
      <!-- Portfolio Item Heading 
      <h1 class="my-4">Page Heading
        <small>Secondary Text</small>
      </h1> -->

      <!-- Portfolio Item Row -->
      <div class="row">
        <h3 class="my-4">{1}  </h3>
        
        <div class="col-md-8">
          <img class="img-fluid" src="{0}" alt="">
        </div>
        <div class="col-md-4">
          <h3 class="my-3">A Collaboration With</h3>
          <ul>
            <li>Michael Wolf</li>
            <li>Vivian Westwood</li>
            <li>Dolly Parton</li>
            <li>Benford Hopscotch</li>
            <li>Robot #5</li>
            <li>Each would be</li>
            <li>a link to that</li>
            <li>persons first project.</li>
          </ul>
        </div>  
        
        
 	<center class="col-md-12"><div class="col-md-8">
          <img class="img-fluid" src="{0}" alt=""> </div>
        </center>
        
        
          &nbsp
          <p>{3}</p>
  
        <div class="col-md-8">
          <img class="img-fluid" src="{4}" alt="">
        </div>
        <div class="col-md-4">
          <h3 class="my-3">{5} 
            <a href="{7}"> <img height="20" src="../../assets/envelope.svg" title="Email"></a>
            <a href="{8}"> <img height="20" src="../../assets/home.svg" title="Personal Site"></a>
            <a href="{2}"> <img class="my-4" height="20" src="../../assets/link.svg" title="Link to Project"></a>
          </h3>
          <p>{6}</p>
          
        </div>      </div>
      <!-- /.row -->

      <!-- Related Projects Row -->
      <h3 class="my-4">Related Projects (How are we doing this?)</h3>

      <div class="row">

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

        <div class="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img class="img-fluid" src="http://placehold.it/500x300" alt="">
          </a>
        </div>

      </div>
      <!-- /.row -->
`;

entryData = []; // sort it however

// main
$(document).ready(function() {
    for (var item in window) {
        // find entries in global namespace
        if (/^N([0-9]{8})$/.test(item)) {
            console.log("Found: " + item);
            entryData.push(item);
        }
    }
    
    var qString=window.location.href.split("?")[1]	// query string
    var uid=parseQuery(qString).uid			// unique key
    var work=parseQuery(qString).work			// work # in array
    
    if (uid==0)  // init w first work
      uid=entryData[0];
    
    // assemble list of projects 
    /*
    entryData.forEach(function(uid) {
      window[uid].projects.forEach(function(proj, idx){
        // console.log(proj.heading);
        proj.uid = uid;  // add unique key
        proj.idx = idx;
        projects.push(proj);
      });
    });*/
    
    var person = window[uid]
    var proj = window[uid]["projects"][work];
    $("#entryContainer").append(entry.format(proj.photoUrl, proj.heading, proj.workUrl, proj.subHead, person.photo, 
    	person.name, person.bio, person.email, person.site));
});

