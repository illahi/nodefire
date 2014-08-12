/* Some tests for main logic */

// Worker suite
describe("Worker", function() {
	var Firebase = require("firebase");
	var firebaseData = new Firebase("https://nodefire.firebaseio.com/");
	var Worker = require('../worker.js');
	var io = null;
	var fakeWorker = new Worker("Bob", firebaseData, io);

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

	// Unit testing
	// Ready function
	it("should have ready function that makes it not busy and changes state to 'idle'", function () {
		fakeWorker.ready();
		expect(fakeWorker.busy).toBe(false);
		expect(fakeWorker.state).toBe("idle");
	});

	it("should have ready function that calls seek permission function", function () {
		spyOn(fakeWorker, "seekPermission");
		fakeWorker.ready();
		expect(fakeWorker.seekPermission).toHaveBeenCalled();
	});

	// Work function
	it("should have work function that changes state to 'working' when given snapshot", function () {
		var snapshot = {id: 1000, time: 1000};
		fakeWorker.work(snapshot);
		expect(fakeWorker.state).toBe("working");
	});

	it("should have work function that calls ready function when given snapshot", function () {
		spyOn(fakeWorker, "ready");
		var snapshot = {id: 1000, time: 1000};
		fakeWorker.work(snapshot);
		waits(snapshot.time + 1000);
		runs(function () {
			expect(fakeWorker.ready).toHaveBeenCalled();
		});
	});

	// Seek permission function
	it("should have seek permission function that changes state to 'seeking' when not busy and has potential task", function () {
		fakeWorker.busy = false;
		fakeWorker.task = {transaction: function(a, b) {}};
		fakeWorker.seekPermission();
		expect(fakeWorker.busy).toBe(true);
		expect(fakeWorker.state).toBe("seeking");
	});

});
