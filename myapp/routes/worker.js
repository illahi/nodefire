/* worker.js 	*/
/* Illahi Khan 	*/

// Worker object

// Constructor
function Worker (name, manager, io) {
	this.name 		= name || "Employee";
	this.manager 	= manager;
	this.busy 		= false;
	this.task 		= null;
	this.listening 	= null;
	this.state		= null;
	this.io			= io;
	this.listen();
}

// Listen for new tasks
Worker.prototype.listen = function () {
	// Listen for new added tasks and retrieve the first task in the queue.
	this.listening = true;
	this.emit();
	this.manager.startAt().limit(1).on("child_added", function(childSnapshot) {
		this.task = childSnapshot.ref();
		this.seekPermission();
	}, this);
}

// Seek permission to work on the new task
Worker.prototype.seekPermission = function () {
	if (!this.busy && this.task) {
		console.log(this.name + ' : "I received permission to work on this task : ' + this.task + '."');
		this.state			= "seek";
		this.emit();
		this.busy 			= true;
		var self 			= this; 
		var taskSnapshot 	= null;		// will contain the last known snapshot of the task

		var current 		= this.task;// task that we want to process
		this.task 			= null;		// reset so when we process the current task, a new one is ready and waiting for us

		current.transaction(function (data) {
			taskSnapshot = data;
			if (data) {
				return null;
			}
			else {
				return;
			}
		}, function (error, synced, snapshot) {
			if (error) {
				console.log(error);
				throw error;
			}
			if (synced) {
				self.work(taskSnapshot);
			}
			else {
				self.ready();
			}
		});
	}
	else {
		//console.log(this.name + ' : "I tried to seek permission for a task that I did not have :(."');
	}
}

// Process the task
Worker.prototype.work = function (snapshot) {
	if (snapshot) {
		this.state 	= "work";
		this.emit(snapshot);
		var self 	= this;
		setTimeout(function () {
			console.log(self.name + ' : "I finished working on ' + snapshot.id + ' and it took ' + snapshot.time + 'ms."');
			self.ready();
		}, snapshot.time);
	}
	else {
		console.log(this.name + ' : "No task to work on!"');
	}
}

// Ready for a new task
Worker.prototype.ready = function () {
	this.state = "idle";
	this.emit();
	this.busy = false;
	this.seekPermission();
}

Worker.prototype.emit = function (task) {
	var a = this.name;
	var b = this.listening;
	var c = this.state;
	var d = this.busy;
	var e = task;

	this.io.sockets.emit('stateChange', {name: a, listening: b, state: c, busy: d, task: e});
}

module.exports = Worker;