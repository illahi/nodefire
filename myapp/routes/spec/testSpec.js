/* Some tests for main logic */

var Worker = require('../worker.js');
var Firebase = require("firebase");
var firebaseData = new Firebase("https://nodefire.firebaseio.com/");

// Worker suite
describe("Worker", function() {

	var fakeWorker = new Worker("Bob", firebaseData);

	// Trivial tests
	it("should have non-undefined task", function () {
		expect(fakeWorker.task).not.toBeUndefined();
	});

	it("should have non-null manager", function () {
		expect(fakeWorker.manager).not.toBeNull();
	});

	it("should have non-null busy value", function () {
		expect(fakeWorker.busy).not.toBeNull();
	});

	// Async tests
/*	it("calls the sayHello() function", function() {
		spyOn(fakeWorker, "seekPermission");
		waits(10000);
		expect(fakePerson.seekPermission).toHaveBeenCalled();
	});*/

});
