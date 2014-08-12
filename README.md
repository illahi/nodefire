#Nodefire

This is a simulation of 'workers' processing 'tasks' from a queue. 

Make sure to *install dependencies*.
Run the server with *node app.js*. 
Create tasks with *node create_tasks.js*.
Open *localhost:3000* to view the worker(s) and task(s) in real time.

Client:
> AngularJS, Firebase.io, AngularFire, Socket.io
Server:
> NodeJS, Firebase.io, Socket.io

Adjust the task creation time and processing time max in 'create_tasts.js'. The timings are properly labeled. Adjust the number of workers by editting app.js. Make sure to pass the firebase reference and socket.io object to any new workers.

Big thanks to Firebase.io for their extensive documentation, their GitHub examples, AngularFire, and ease-of-use.