var OAuth = require("google-oauth"),
	Request = require("./request");

var API = module.exports = function(consumer_key, consumer_secret, callback_uri){
	
	var self = this;
	self.oauth = new OAuth.OAuth2(consumer_key, consumer_secret, callback_uri);
	
	//generate the parts to the 
	self.request = new Request(self.oauth);
}