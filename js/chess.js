

// This helper figures out the HTML for each piece from the code
// in the board data
Handlebars.registerHelper('piece', function() {

		if(this.code.length > 0) {
		var pieceInfo = this.code.split('-');
	
		var klass = 'piece';
		if(pieceInfo[0] == 'W') {
			klass = klass + ' player2';
		} else {
			klass = klass + ' player1';
		}

		if(pieceInfo[1] == 'P') klass = klass + ' pawn';

		var pieceHtml = '';
		pieceHtml = pieceInfo[1];
		if($.inArray(pieceInfo[1],['K','Q','B','R','P']) != -1) {
			pieceHtml = pieceInfo[1];
		} else if(pieceInfo[1] == 'N') {
			pieceHtml = 'Kn';
		} 

		return new Handlebars.SafeString('<span class="' + klass + '">' + pieceHtml + '</span>');
	}

 	return '';
});

var boardData = $.trim($('#board-data').text());
var boardRows = boardData.split("\n");
var boardContext = {
	rows : []
};

var rowCount = 0;
$.each(boardRows, function(index, element) {
	rowCount++;

	var rowContext = {};
	var columns = element.split('|');
	var colCount = 0;

	var rowContext = {
		rowNumber: rowCount,
		cols : []
	};
	$.each(columns, function(index, element) {
		colCount++;


		rowContext.cols.push({
			'colNum' : colCount,
			'code' : $.trim(element)
		});
	});
	boardContext.rows.push(rowContext);
});
var source   = $("#board-template").html();
var template = Handlebars.compile(source);
$('#load-board').html(template(boardContext));

