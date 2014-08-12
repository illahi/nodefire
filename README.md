This is a simulation of 'workers' processing 'tasks' from a queue. The tasks are generated using a script: 'create_tasks.js'. 

Make sure to install dependencies.
Run the server with "node app.js". 
Create tasks with "node create_tasks.js".
Open /view/index.ejs to view the worker(s) and task(s) in real time.

Adjust the task creation time and processing time max in 'create_tasts.js'. The timings are properly labeled. Adjust the number of workers by editting app.js. Make sure to pass the firebase reference and socket.io object to any new workers.

Big thanks to Firebase.io for their extensive documentation, their GitHub examples, AngularFire, and ease-of-use.