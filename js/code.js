/*
Locates all student work objects in global namespace.
Inits page.
*/

// test if in viewport
function isOnScreen(element) {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = element.offset();
    bounds.right = bounds.left + element.outerWidth();
    bounds.bottom = bounds.top + element.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
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
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#work"><img class="card-img-top" src={0} alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#work">{1}</a>
              </h4>
              <p class="card-text">{2}</p>
            </div>
          </div>
        </div>
`;

foot = '<span id="foot" class="col-lg-4 col-sm-6 portfolio-item">.</span>';

curProj = 0; // current entry

// set background
function setBg() {
    var img = new Image();
    img.src = "assets/background.png";
    img.style.opacity = "0.3";
    document.body.appendChild(img);
}

// Dynamically load/show entries when they enter the viewport
function showEntry() {
    $('#work').height($('#work').contents().height()); // dynamically resizes iframe based on content
    if (isOnScreen($("#foot")) && curProj < projects.length) {
        var data = projects[curProj];
        var html = entry.format(data.photoUrl, data.heading, data.desc);
        $(html).appendTo(".row").show(100);
        $(".row > div:last  a").click(function() { // set anchors in entry to load work
            $("#work").attr("src", "assets/startbootstrap-portfolio-item-gh-pages/index.html?uid=" + data.uid + "&work="+ data.idx)    
        });
        
        $("#foot").remove(); // move foot to bottom
        $(foot).appendTo(".row");
        
        $(".row > div").css("opacity", "1");
        curProj++;
        // console.log(curProj);
        // console.log(isOnScreen($("#foot")));
    }
}

function entriesLoaded() {
    $(foot).appendTo(".row")
    setInterval(showEntry, 200);  // Strangely this is the ratified way to deal with async file loads. Seems wasteful.
}

entryData = []; // sort it however
projects = [];

// main
$(document).ready(function() {
    //$.getScript("js/data.js", function(){
    for (var item in window) {
        // find entries in global namespace
        if (/^N([0-9]{8})$/.test(item)) {
            console.log("Found: " + item);
            entryData.push(item);
        }
    }
    
    // assemble list of projects
    entryData.forEach(function(uid) {
      window[uid].projects.forEach(function(proj, idx){
        // console.log(proj.heading);
        proj.uid = uid;  // add unique key
        proj.idx = idx;
        projects.push(proj);
      });
    });

    $("#people").load("assets/startbootstrap-3-col-portfolio-gh-pages/index-ppl.html", entriesLoaded);
});

