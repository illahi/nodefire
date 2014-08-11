/* app.js 		*/
/* Illahi Khan 	*/

// Module dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var Firebase = require("firebase");
var Worker = require("./routes/worker")

var app = express();

// Environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Using Firebase.io
var firebaseData = new Firebase("https://nodefire.firebaseio.com/");

app.get('/', routes.index);

// Listening
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

	// Create workers
	var worker1 = new Worker("Bob", firebaseData);
	var worker2 = new Worker("Ben", firebaseData);
});
