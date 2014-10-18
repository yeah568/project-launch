$('.playButton').on('click', {sound: $(this).dataset.sound}, function() {
    console.log($(this).attr("id"));
});

function playSound(e) {
    soundManager.createSound({
        url: e.data.sound
    }).play();
}



// parseSound should look up the button in the table and find the
// assigned sound and return a reference to it

// play should eventually be able to implement defined behaviour of
// the button,