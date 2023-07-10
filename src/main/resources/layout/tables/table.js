$(document).ready(function() {
    anchors.options.visible = 'always';
    anchors.add('h3');

    var table = $('#standard_table').DataTable( {
        lengthChange: false,
        ordering: false,
        paging: config.pagination,
		autoWidth: true,
		buttons: [
					{
						text: 'Related columns',
						action: function ( e, dt, node, config ) {
							$(".relatedKey").toggle();
							this.active( !this.active() );
							table.columns.adjust().draw();
						}
					},
					{
						text: 'Constraint',
						action: function ( e, dt, node, config ) {
							$(".constraint").toggle();
							this.active( !this.active() );
							table.columns.adjust().draw();
						}
					},
					{
						extend: 'columnsToggle',
						columns: '.toggle'
					}
				]

    } );
    dataTableExportButtons(table);

    if ($('#indexes_table').length) {
        var indexes = $('#indexes_table').DataTable({
            lengthChange: false,
            paging: config.pagination,
            ordering: false
        });
        dataTableExportButtons(indexes);
    }

    if ($('#check_table').length) {
        var check = $('#check_table').DataTable( {
            lengthChange: false,
            paging: config.pagination,
            ordering: false
        } );
        dataTableExportButtons(check);
    }

	$('#showCodeToggle').change(function() {
        if (this.checked) {
            showCode();
        } else {
            hideCode();
        }
    });
} );


$(function() {
	var $imgs = $('img.diagram, object.diagram');
	$imgs.css("cursor", "move")
	$imgs.draggable();
});

$.fn.digits = function(){
	return this.each(function(){
		$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") );
	})
}

$(function() {
	$("#recordNumber").digits();
});

function extractSqlComments(sql) {
    var comments = [];
    var match;

    // Match both types of comment at once
    var regex = /(\/\*[\s\S]*?\*\/)|(--.*(?:\r?\n|$))/g;

    // Capture matches
    while ((match = regex.exec(sql)) !== null) {
        // Remove comment markers
        var comment = match[0];
        // Trim the line breaks
        comment = comment.replace(/(\r?\n)+$/g, '');
        comments.push(comment);
    }

    return comments;
}

function showCode() {
	var editor = document.querySelector(".CodeMirror").CodeMirror;
	var codeElement = document.getElementById("sql-script-codemirror");

	editor.setValue(codeElement.textContent);
}

function hideCode() {
	var editor = document.querySelector(".CodeMirror").CodeMirror;
	var codeElement = document.getElementById("sql-script-codemirror");
	var comments = extractSqlComments(codeElement.textContent);

	editor.setValue(comments.join("\n\n"));
}

var codeElement = document.getElementById("sql-script-codemirror");
var editor = null;
if (null != codeElement) {
	editor = CodeMirror.fromTextArea(codeElement, {
		lineNumbers: true,
		mode: 'text/x-sql',
		indentWithTabs: true,
		smartIndent: true,
		lineNumbers: true,
		matchBrackets: true,
		autofocus: true,
        readOnly: true
	});

	hideCode();
	// var codeContent = editor.getValue();
	// var comments = extractSqlComments(codeContent);
	// editor.setValue(comments.join("\n\n"));
}
