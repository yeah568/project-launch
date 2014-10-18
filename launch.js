SC.initialize({
      client_id: "be26e36572618f7b450125e3b4f68854"
});

document.onkeydown =  keyEvent;
var macroRecording = false;
var buttons = [];
var times = [];
var numrowcodes = [49,50,51,52,53];

$('.button').on('click',function() {
    playSound(this);
})

function playSound(element) {
    if (soundManager.getSoundById(element.dataset.soundid).playState) {
        playingNow = false;
        soundManager.getSoundById(element.dataset.soundid).stop();
        element.style.background = "#FFFF00";
        
        return
    }
    if (mode != 'edit') {
    if (element.dataset.soundid != null && element.dataset.soundid != "") {
        var e = element;
        soundManager.getSoundById(element.dataset.soundid).play({
            onplay: function() {
                e.style.background = "#00FF00";
            },
            onfinish: function() {
                playing = false;
                e.style.background = "#FFFF00";
            }
        });
        }
    }
}



$('li').each(function(index, e) {
    $('#buttonSelect').append($('<option>', {
        value: index,
        text: index
    }));
    $('#buttonSelectFile').append($('<option>', {
        value: index,
        text: index
    }));
    buttons.push(e);
})


function setSoundSource(reference, element) {
	element.dataset.sound = reference;
}

function addSC() {
    var track_url = $("#scurl").val();
    SC.get('/resolve', {url: track_url}, function(track) {
        SC.stream('/tracks/' + track.id, {autoLoad: true}, function(sound) {
            buttons[$('#buttonSelect').val()].dataset.soundid = sound.id;
            buttons[$('#buttonSelect').val()].style.background = "#FFFF00";
        });
    })
};

//$('#fileInput').addEventListener('change', addFile, false);

function addFile(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
        buttons[$('#buttonSelectFile').val()].dataset.soundid = soundManager.createSound({
            url: reader.result
        }).id;
        buttons[$('#buttonSelect').val()].style.background = "#FFFF00";
    }

    reader.readAsDataURL(file);

}

function sliceSound(e) {
    switch(e.dataset.type) {
        case "local":

            break;
        case "soundcloud":

            break;

    }

    // get track length

    // set slider to 0/length

}

// watches for key presses

function keyEvent(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    var element = document.getElementById(charCode);
    if ($.inArray(charCode, numrowcodes) == -1) {
        playSound(element);
        if (macroRecording) {
            recordTime(e);
        } else {}
    } else if (macroRecording) {
        stopMacro(e);
    } else {
        startMacro(e);
    }
}


// macro shit
function startMacro (e) {
    times.push({"timestamp":e.timeStamp,
                "keycode":e.which})
    macroRecording = true;
}

function recordTime (e) {
    times.push({"timestamp":e.timeStamp,
                "keycode":e.which})
}

function stopMacro (e) {
    times.push({"timestamp":e.timeStamp,
                "keycode":e.which})
    macroRecording = false;
    console.log(times);
}

function reportTimes() {
    var reportString = "";
    for(var i = 0; i < times.length - 1; ++i) {
         reportString += (i+1) + ": " + (times[i+1].timestamp - times[i].timestamp) + " ";
    }
    return reportString; // add this somewhere or alert it
}



// play should eventually be able to implement defined behaviour of
// the button,