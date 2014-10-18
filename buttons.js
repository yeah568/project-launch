var rows = 3;
var columns = 4	;


function addRow() {
	var newRow = $('<ul class="row" id="row' + rows + '"></ul>');
	for (var i = 0; i < columns; i++) {
		newRow.append('<li class="button" id="col' + columns + '">');
	}

	$(".board").append(newRow);
	rows++;
}

function addCol() {
	var newButton = $('<li class="button" id="col' + columns + '">');

	$(".row").append(newButton);
	columns++;
}




	
