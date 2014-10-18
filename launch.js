SC.initialize({
      client_id: "be26e36572618f7b450125e3b4f68854"
});

var soundids = [];
var buttons = [];

$('.button').on('click',function() {
/*	if (this.dataset.type == "local") {
    	soundManager.createSound({
        	url: this.dataset.sound
    	}).play();
	}
	else if (this.dataset.type == "soundcloud") {


	}*/

    var element = this;
    playSound(element);
})

function playSound(element) {
    if (mode != 'edit') {
    if (element.dataset.soundid != null && element.dataset.soundid != "") {
        var e = element;
        soundManager.getSoundById(element.dataset.soundid).play({
            onplay: function() {
                e.style.background = "#00FF00";
            },
            onfinish: function() {
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
            soundids.push(sound.id);
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
document.onkeypress = function() {
    var element = document.getElementById(this);
    playSound(element);
}




// play should eventually be able to implement defined behaviour of
// the button,