/* 	create_tasks.js 	*/
/*	Illahi Khan 	*/

// Using FireBase.io
var Firebase = require("firebase");
var firebaseData = new Firebase("https://nodefire.firebaseio.com/");

// Timings
var creationTime 		= 2000;
var processingFactor 	= 5000;
// Id
var i 					= 1000;

/*
	Push new task to firebase every <creationTime>
	seconds. Tasks do not have a priority; they 
	will be processed first in, first out. A 
	processing time is assigned. That will be the
	time used for simulating the 'processing'. 
	This time is in [0,<processingFactor>).
	seconds.
*/
setInterval(function () {
		console.log("Creating new task with id : " + i);
		firebaseData.push({
			id: 	i,
			state: 	"ready", // for testing 
			time: 	Math.floor(Math.random() * processingFactor)
		});
		i++;
	}, creationTime);