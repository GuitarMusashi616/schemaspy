function enableAnchors() {
    anchors.options.visible = 'always';
    anchors.add('h3');
}

$(document).ready(function() {
    enableAnchors();

    var table = $('#standard_table').DataTable( {
        lengthChange: false,
		bSort: false,
		bPaginate: false,
		autoWidth: true,
		buttons: [ ]
    } );
 
    table.buttons().container()
        .appendTo('#standard_table_wrapper .col-sm-6:eq(0)' );    	
} );

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

	var codeContent = editor.getValue();
	var comments = extractSqlComments(codeContent);
	editor.setValue(comments.join("\n\n"));
}
