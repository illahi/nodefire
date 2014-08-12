/* script.js 		*/
/* by Illahi Khan	*/
/* illahi.net		*/
/* June 9, 2014		*/

var app = angular.module('main', ['firebase']);

// Main controller
app.controller('mainController', ["$scope", "$log", "$firebase", function ($scope, $log, $firebase) {

	$scope.workers = [];
	$scope.workers_ref = [];

	$scope.unknown = 0;
	$scope.idle = 0;
	$scope.seeking = 0;
	$scope.working = 0;
	$scope.deaf = 0;
	$scope.listening = 0;

	var socket = io.connect('http://localhost');

	// Given list of workers
	socket.on('workers', function (data) {
		for (var i = 0; i < data.length; i++) {
			$scope.workers_ref[data[i]] = $scope.workers.length;
			$scope.workers.push({
				name: data[i]
			});
		}
		$scope.$apply(); // update bindings
	});

	// Given info on state change of worker
	socket.on('stateChange', function (data) {
		var index = $scope.workers_ref[data.name];
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

	var myFirebaseRef = new Firebase("https://nodefire.firebaseio.com/");
	var sync = $firebase(myFirebaseRef);
	$scope.tasks = sync.$asArray();
}]);