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
            <a href="#"><img class="card-img-top" src={0} alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">{1}</a>
              </h4>
              <p class="card-text">{2}</p>
            </div>
          </div>
        </div>
`;

foot = '<span id="foot" class="col-lg-4 col-sm-6 portfolio-item">.</span>';

curEntry = 0; // current entry

// set background
function setBg() {
    img = new Image();
    img.src = "assets/background.png";
    img.style.opacity = "0.3";
    document.body.appendChild(img);
}

function showEntry() {
    while (isOnScreen($("#foot")) && curEntry < entryData.length) {
        data = window[entryData[curEntry]];
        html = entry.format(data.photo, data.name, data.bio);
        $(html).appendTo(".row").show('fast');
        $(".row > div").css("opacity", "1");
        $("#foot").remove();
        $(foot).appendTo(".row");
        curEntry++;
        console.log(curEntry);
        console.log(isOnScreen($("#foot")));
    }
}

function entriesLoaded() {
    //$("BODY").click(function() {
    //  addPerson();
    //});
    $(foot).appendTo(".row")
    showEntry();
    $(document).scroll(function() {
        showEntry();
    });
}

entryData = []; // sort it however

// main
$(document).ready(function() {
    // setBg();
    $("head").append('<script type="text/javascript" src="' + "js/data.js" + '"></script>');  // block until loaded
    
    for (var item in window) {
        // find entries in global namespace
        if (/^N([0-9]{8})$/.test(item)) {
            console.log("Found: " + item);
            entryData.push(item);
        }
    }

    $("#people").load("assets/startbootstrap-3-col-portfolio-gh-pages/index-ppl.html", entriesLoaded);
});

