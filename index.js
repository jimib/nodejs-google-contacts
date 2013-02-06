module.exports = function(consumer_key, consumer_secret, callback_uri){
	return new require("./lib/api")(consumer_key, consumer_secret, callback_uri);
}