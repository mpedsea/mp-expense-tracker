var router = require('./router.js');
//Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser.

//Solution: User Node.js to perform the profile lookups and serve our templates via HTTP.

// Create a web server

var http = require('http');
http.createServer(function (req, res) {
	router.home(req, res);
	router.user(req, res);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');