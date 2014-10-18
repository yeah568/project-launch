$('.playButton').on('click',function() {
    soundManager.createSound({
        url: this.dataset.sound
    }).play();
})

function playSound(e) {

}



// parseSound should look up the button in the table and find the
// assigned sound and return a reference to it

// play should eventually be able to implement defined behaviour of
// the button,