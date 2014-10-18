var rows = 3;
var columns = 4	;


function addRow() {
	var newRow = $('<ul class="row"></ul>');
	for (var i = 0; i < columns; i++) {
		newRow.append('<li class="button">');
	}

	$(".board").append(newRow);
	rows++;
}

function addCol() {
	var newButton = $('<li class="button">');

	$(".row").append(newButton);
	columns++;
}




	
