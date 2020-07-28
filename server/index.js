const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", (socket) => {
	console.log("New connection!");

	socket.on("join", ({name, room}, callback) => {
		console.log(name);
		const {error, user} = addUser({ id: socket.id, name, room });

		if(error) return callback(error);

		socket.emit("message", { user: "admin", text: `${name}, welcome to ${room}!` });
		socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${name} has joined!` });

		socket.join(user.room);

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message});

		callback();
	});

	socket.on("disconnect", () => {
		console.log("User left :(");

		removeUser({id: socket.id});
	})
});


app.use(router);

server.listen(PORT, () => console.log(`Server start on port ${PORT}`));

