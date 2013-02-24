var gdata = require('gdata-js'),
	Request = require("./request");

var API = module.exports = function(consumer_key, consumer_secret, callback_uri){
	
	var self = this;
	self.gdata = new gdata(consumer_key, consumer_secret, callback_uri);
	
	//generate the parts to the 
	self.request = new Request(self.gdata);
}