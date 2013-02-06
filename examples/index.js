var gOAuth = require('../index');

var express = require('express');
var app = express();
var port = 4000;

app.get('/', function(req, res){
  res.send('hello world');
});

var gOAuth = new OAuth.OAuth2(
  , 
  'http://localhost:'+port+'/authentication');

app.listen(port);