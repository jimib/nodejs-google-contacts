var gAPI = require('../index').API;
var fs = require("fs"),
	util = require("util");

var scope = 'https://www.google.com/m8/feeds/'; //contacts

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
		var page_cb_auth = '/authenticate';
		
		var api = new gAPI(
		  data.consumer_key,
		  data.consumer_secret,
		  'http://localhost:'+port+'/authenticate');
		
		app.get(page_cb_auth, function(req, res){
		    api.gdata.getAccessToken(
			{
				scope: scope,
				access_type: 'offline',
                approval_prompt: 'force'
			}, 
			req, 
			res, 
			function(err, _token) {
	        	if(err) {
		            console.error('oh noes!', err);
		            res.writeHead(500);
		            res.end('error: ' + JSON.stringify(err));
		        } else {
		            token = _token;
		            console.log('got token:', token);
		            res.send(token);
		        }
			});
		});
		
		app.listen(port);
	}
	
})

