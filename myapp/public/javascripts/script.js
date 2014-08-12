/* script.js 		*/
/* by Illahi Khan	*/
/* illahi.net		*/
/* June 9, 2014		*/

var app = angular.module('main', ['firebase']);

// Main controller
app.controller('mainController', ["$scope", "$log", "$interval", "$firebase", function ($scope, $log, $interval, $firebase) {

	$scope.workers = [];		// Worker information
	var workers_ref = [];		// Find workers by name
	var workers_state = [];		// Last known state - for calculating time
	var workers_time = [];		// Start of state time
	var state_times = [];		// Total times

	// Initialize state times 
	state_times["idle"] = 0;
	state_times["seeking"] = 0;
	state_times["working"] = 0;
	$scope.idle		= '-';
	$scope.seeking 	= '-';
	$scope.working 	= '-';

	// Connect to server via socket.io
	var socket = io.connect('http://localhost');

	// Given list of workers
	socket.on('workers', function (data) {
		for (var i = 0; i < data.length; i++) {
			workers_ref[data[i]] = $scope.workers.length;
			$scope.workers.push({
				name: data[i]
			});
		}
		$scope.$apply(); // update bindings
	});

	// Given info on state change of worker
	socket.on('stateChange', function (data) {
		var index = workers_ref[data.name];
		// get timings
		if (workers_state[index] != data.state) {
			var date = new Date();
			var diff = date - workers_time[index];
			var last = state_times[workers_state[index]];
			state_times[workers_state[index]] = last + diff;
			workers_state[index] = data.state;
			workers_time[index] = date;
		}
		$scope.workers[index].status = data.state;
		$scope.workers[index].listening = data.listening;
		$scope.workers[index].busy = data.busy;
		if (data.task) {
			var task = data.task;
			if (task.id) {
				$scope.workers[index].task = task.id;
			}
		}
		else {
				$scope.workers[index].task = null;
		}
		$scope.$apply(); // update bindings
	});

	// Bind tasks to view - "three-way data binding"
	var myFirebaseRef = new Firebase("https://nodefire.firebaseio.com/");
	var sync = $firebase(myFirebaseRef);
	$scope.tasks = sync.$asArray();

	// Update percentages every 10 seconds
	$interval(function () {
		var b = state_times["idle"];
		var c = state_times["seeking"];
		var d = state_times["working"];
		var total = b + c + d;
		$scope.idle		= Math.floor((b / total) * 100);
		$scope.seeking 	= Math.floor((c / total) * 100);
		$scope.working 	= Math.floor((d / total) * 100);
	}, 10000);
}]);