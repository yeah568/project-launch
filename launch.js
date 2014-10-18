SC.initialize({
      client_id: "be26e36572618f7b450125e3b4f68854"
});

document.onkeydown =  keyEvent;
var macroRecording = false;
/*var buttons = [];*/
var times = [];
var numrowcodes = [49,50,51,52,53];
var macros = [];

/*$('.button').on('click',function() {
    playSound(this);
})*/

function playSound(element) {
    if (mode != 'edit') {

        if (soundManager.getSoundById(element.dataset.soundid).playState) {
            playingNow = false;
            soundManager.getSoundById(element.dataset.soundid).stop();
            element.style.background = "#FFFF00";
            return;
        }
        if (element.dataset.soundid != null && element.dataset.soundid != "") {
            var e = element;
            var options = {
                onplay: function() {
                    e.style.background = "#00FF00";
                },
                onfinish: function() {
                    playing = false;
                    e.style.background = "#FFFF00";
                },
                onstop: function() {
                    playing = false;
                    e.style.background = "#FFFF00";
                }
            }

            if (element.dataset.from) {
                options.from = element.dataset.from;
            }
            if (element.dataset.to) {
                options.to = element.dataset.to;
            }
            soundManager.getSoundById(element.dataset.soundid).play(options);
        }
    }
}



/*$('li').each(function(index, e) {
    $('#buttonSelect').append($('<option>', {
        value: index,
        text: index
    }));
    $('#buttonSelectFile').append($('<option>', {
        value: index,
        text: index
    }));
    buttons.push(e);
})*/


function setSoundSource(reference, element) {
	element.dataset.sound = reference;
}

function addSC(url) {
    var track_url = url;
    SC.get('/resolve', {url: track_url}, function(track) {
        SC.stream('/tracks/' + track.id, {autoLoad: true}, function(sound) {
            pressedButton.dataset.soundid = sound.id;
            sliceSound(sound, pressedButton);
            pressedButton.style.background = "#FFFF00";
            pressedButton = 'undefined';
        });
    })
};

//$('#fileInput').addEventListener('change', addFile, false);

function addFile(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
        var sound = soundManager.createSound({
            url: reader.result
        });
        pressedButton.dataset.soundid = sound.id;
        sliceSound(sound, pressedButton);
        pressedButton.style.background = "#FFFF00";
        pressedButton = 'undefined';
    }

    reader.readAsDataURL(file);
    mode = "edit";
}

function sliceSound(so, e) {

    so.load({
        onload: function() {
            $( "#slider-range" ).slider({
              range: true,
              min: 0,
              max: so.durationEstimate,
              values: [ 0, so.durationEstimate ],
              slide: function( event, ui ) {
                e.dataset.from = ui.values[0];
                e.dataset.to = ui.values[1];
              },
              change: function( event, ui ) {
                e.dataset.from = ui.values[0];
                e.dataset.to = ui.values[1];
              }
            });
        }
    })

    console.log(so.duration);
}

// watches for key presses

function keyEvent(e) {
    if (mode == 'session') {
        sessionModeKey(e)
    }
    else if (mode == "key-bindings") {
        bindKeys(e);
    }

}

function sessionModeKey(e) {
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
        startOrPlayMacro(e);
    }
}

function startOrPlayMacro(e) {
    switch (e.which) {
        case 49:
            if (macros[0] != null)
                playMacro(e)
            else startMacro(e)
            break;
        case 50:
            if (macros[1] != null)
                playMacro(e)
            else startMacro(e)
            break;
        case 51:
            if (macros[2] != null)
                playMacro(e)
            else startMacro(e)
            break;
        case 52:
            if (macros[3] != null)
                playMacro(e)
            else startMacro(e)
            break;
        case 53:
            if (macros[4] != null)
                playMacro(e)
            else startMacro(e)
            break;
    }
}

function bindKeys(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    pressedButtonKey.setAttribute('id', charCode);
    pressedButtonKey.style.background = "#DDDDDD";

    while (pressedButtonKey.firstChild) {
        pressedButtonKey.removeChild(pressedButtonKey.firstChild);
    }

    var paragraph = document.createElement("p");
    var letter = document.createTextNode(String.fromCharCode(charCode));
    paragraph.appendChild(letter);
    pressedButtonKey.appendChild(paragraph);
    pressedButtonKey = undefined;

}

// macro shit
function startMacro (e) {
    times = []
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
    switch (e.which) {
        case 49:
            macros[0] = times;
            times = [];
            break;
        case 50:
            macros[1] = times;
            times = [];
            break;
        case 51:
            macros[2] = times;
            times = [];
            break;
        case 52:
            macros[3] = times;
            times = [];
            break;
        case 53:
            macros[4] = times;
            times = [];
            break;
    }
}

function playMacro(e) {
    var macroToPlay;
    switch (e.which) {
        case 49:
            macroToPlay = macros[0];
            break;
        case 50:
            macroToPlay = macros[0];
            break;
        case 51:
            macroToPlay = macros[0];
            break;
        case 52:
            macroToPlay = macros[0];
            break;
        case 53:
            macroToPlay = macros[0];
            break;
    }
    var startTime = macroToPlay[0]['timestamp'];
    var endTime = macroToPlay[macroToPlay.length - 1]['timestamp'];
    var macroRelTime = [];
    macroToPlay.forEach(function (obj) {
        var relTime = obj['timestamp'] - startTime;
        macroRelTime.push({'timestamp':relTime, 'keycode':obj['keycode']})
    })
    for (i=1; i<macroRelTime.length - 1; i++) {
        var lastTime = 0;
        var element = document.getElementById(macroRelTime[i]['keycode']);
        setTimeout(playSound(element), macroRelTime[i]['timestamp'] - lastTime);
        var lastTime = macroRelTime[i]['timestamp'];
    }
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