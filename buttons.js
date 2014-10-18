var rows = 3;
var columns = 4	;
var mode = 'session';


function addRow() {
	var newRow = $('<ul class="row"></ul>');
	for (var i = 0; i < columns; i++) {
		newRow.append('<li class="button" style>');
	}

	$(".board").append(newRow);
	rows++;
	init();
}

function addCol() {
	var newButton = $('<li class="button" style="border: 2px solid black">');

	$(".row").append(newButton);
	columns++;
	init();
}

function removeRow() {
	rows--;
	$(".board").children().last().remove();
	init();
}

function removeCol() {
	columns--;

	for (var i = 0; i < rows; i++) {
		$(".row").eq(i).children().last().remove();
	}
	init();
}


function init() {
	$(".button").on("click", function() {
		if (mode == 'session')
			this.style.background = "#FF0000";
		else if (mode == 'edit')
			Apprise('Is your sound file from the web or your computer?');
	});

	$(".button").hover(function() {
		this.style.border = "2px solid blue";
	}, function() {
		this.style.border = "2px solid black";
	});

	$(".mode-tab").on("click", function() {
		document.getElementById(mode).style.background = "#FFFFFF";
		mode = this.id;
		this.style.background = "#FF0000";

	});

	document.getElementById(mode).style.background = "#FF0000";

}
	
