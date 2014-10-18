function stopAll() {
	for (var i = 0; i < rows; i++) {
		var row = $(".board").eq(i).children().last();
		for (var j = 0; j < columns; j++) {
			var col = row.eq(j).children().last();
			col.style.color = "#FFFFFF";
		}
	}
}

function bindKey(element, keyCode) {
	var keyBinding = document.createAttribute("id");
	keyBinding.value = keyCode;
	element.setAttributeNode(keyBinding);
}

document.onkeypress = function() {
	var element = document.getElementById(this);
	play(element.getAttribute(data-sound));
}


