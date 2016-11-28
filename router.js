var Profile = require("./profile.js");
var renderer = require ("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

// Handle HTTP route GET / and POST / i.e. Home
function home(req, res) {

	//if url === "/" && GET
	if (req.url === "/") {
		if (req.method.toLowerCase() === "get") {
			//show search field
			res.writeHead(200, commonHeaders);
			renderer.view("header", {}, res);
			renderer.view("search", {}, res);
			renderer.view("footer", {}, res);
			res.end();
		} else {
			//if url === "/" && POST

			//get the POST data from body
			req.on("data", function(postBody) {
				//extract te username
				var query = querystring.parse(postBody.toString());
				res.writeHead(303, {'Location': '/' + query.username})
				res.end();

			})
			//redirect to /:username
		}
	}

}

// Handle HTTP route GET /:username i.e. /maxpedersen
function user(req, res) {
	var username = req.url.replace("/", "");
	//if url === "/....." 
	if (username.length > 0) {
		res.writeHead(200, commonHeaders);
		renderer.view("header", {}, res);

		//get json from Treehouse
		var studentProfile = new Profile(username);
		//on "end" 
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store the values which we need
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javaScriptPoints: profileJSON.points.JavaScript
			}
			//simple response
			renderer.view("profile", values, res);
			renderer.view("footer", {}, res);
			res.end();
		});


		//on "error"
		studentProfile.on("error", function(error) {
			//show the error
			renderer.view("error", {errorMessage: error.message}, res);
			renderer.view("search", {}, res);
			renderer.view("footer", {}, res);
			res.end();
		});
	}
}

module.exports.home = home;
module.exports.user = user;