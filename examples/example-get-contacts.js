var gAPI = require('../index').API;
var fs = require("fs");
//put your authentication stuff in 'auth.conf'
var auth = fs.readFile("./auth.conf", function(err, data){
	if(data){
		try{
			console.log(data.toString());
			data = JSON.parse(data.toString());
		}catch(error){
			err = error;
		}
	}
	
	if(err){
		console.log("Unable to load config file 'examples/auth.conf'", err);
	}else{
		var express = require('express');
		var app = express();
		var port = 4000;

		app.get('/', function(req, res){
			//get my list of contacts
			var email = encodeURIComponent("jimi.bailey@gmail.com");
			var urlRequest = "https://www.google.com/m8/feeds/contacts/"+email+"/full";
			
			api.oauth._request("GET", urlRequest, {"GData-Version" : "3.0"}, "", data.access_token, function(result){
				res.send(result.data);
			});
		});

		console.log("gAPI", gAPI);

		var api = new gAPI(
		  data.consumer_key,
		  data.consumer_secret,
		  'http://localhost:'+port+'/oauth2callback');

		app.listen(port);
	}
	
})

