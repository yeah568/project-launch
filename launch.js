SC.initialize({
      client_id: "be26e36572618f7b450125e3b4f68854"
});

$('.playButton').on('click',function() {
	if (this.dataset.type == "local") {
    	soundManager.createSound({
        	url: this.dataset.sound
    	}).play();
	}
	else if (this.dataset.type == "soundcloud") {
		var track_url = this.dataset.sound;
		SC.get('/resolve', {url: track_url}, function(track) {
			SC.stream('/tracks/' + track.id, function(sound) {
				sound.play();
			});
		})
		
	}
})

function setSoundSource(reference, element) {
	element.dataset.sound = reference;
}





// play should eventually be able to implement defined behaviour of
// the button,