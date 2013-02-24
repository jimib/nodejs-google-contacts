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
		
		api.gdata.setToken(data.token);
		
		app.get("/", function(req, res){
		    api.gdata.getFeed(
				'https://www.google.com/m8/feeds/contacts/default/full', 
				{'max-results':500,'group':'http://www.google.com/m8/feeds/groups/default/base/6'},
			    function(err, feed) {
					res.send(feed);
			    });
		});
		
		app.get("/groups", function(req, res){
		    api.gdata.getFeed(
				'https://www.google.com/m8/feeds/groups/default/full', 
				{},
			    function(err, feed) {
					res.send(feed);
			    });
		});
		
		app.get("/group/:groupId", function(req, res){
		    api.gdata.getFeed(
				'https://www.google.com/m8/feeds/groups/default/full/'+req.params.groupId, 
				{},
			    function(err, feed) {
					res.send(feed);
			    });
		});
		
		app.get("/", function(req, res){
		    api.gdata.getFeed(
				'https://www.google.com/m8/feeds/contacts/groups/default/full', 
				{},
			    function(err, feed) {
					res.send(feed);
			    });
		});
		
		app.get("/contact/:id", function(req, res){
		    api.gdata.getFeed(
				'https://www.google.com/m8/feeds/contacts/jimi.bailey%40gmail.com/full/'+req.params.id, 
				{},
			    function(err, feed) {
					console.log("err: ", err);
					res.send(feed);
			    });
		});
		
		app.get("/search/:search", function(req, res){
			api.gdata.getFeed(
				'https://www.google.com/m8/feeds/contacts/default/full', 
				{q:req.params.search},
			    function(err, feed) {
					console.log(err);
					res.send(feed);
			    });
		});
		
		app.listen(port);
	}
	
})

