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
		  res.send('hello');
		});
		
		app.get('/oauth2callback', function(req, res){
			if(!req.query.code){
				//Redirect the user to Authentication From
				api.oauth.getGoogleAuthorizeTokenURL( ['https://www.googleapis.com/auth/contacts'], function(err, redirecUrl) {
					if(err) return res.send(500,err);
					return res.redirect(redirecUrl);
				});

			}else{
				//Get access_token from the code
				api.oauth.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {
					if(err) return res.send(500,err);

					console.log("access_token", access_token);
					console.log("refresh_token", refresh_token);
					
					return res.redirect('/');
				});
			}
		});

		console.log("gAPI", gAPI);

		var api = new gAPI(
		  data.consumer_key,
		  data.consumer_secret,
		  'http://localhost:'+port+'/oauth2callback');

		app.listen(port);
	}
	
})

