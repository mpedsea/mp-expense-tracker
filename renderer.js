var fs = require('fs');
function mergeValues (values, content) {
	// Cycle over the keys of values
	for (var key in values) {
		// Replace all {{key}} with the values from the values object
		content = content.replace("{{" + key + "}}", values[key]);
	}

	// return merged content
	return content;
}

function view (templateName, values, res) {
	//Read from the template file
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf-8"});

	fileContents = mergeValues(values, fileContents);
	//Write out to the response
	res.write(fileContents);

}

module.exports.view = view;