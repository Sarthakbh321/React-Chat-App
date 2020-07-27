import React, { useEffect, useState } from "react";
import qs from "query-string";
import io from "socket.io-client";

let socket;

function Chat(props) {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const ENDPOINT = "localhost:5000";

	useEffect(() => {
		const query = qs.parse(props.location.search);
		
		socket = io(ENDPOINT);

		setName(query.name);
		setRoom(query.room);

		socket.emit("join", {name: query.name, room: query.room}, (error) => {
			if(error) alert(error);
		} );

		socket.on("message", ({user, text}) => {
			console.log(user, text);
		})

		return () => {
			socket.emit("disconnect");
			socket.off();
		}

	}, [ENDPOINT, props.location.search])

	return (
		<h1>Hello from chat!</h1>
	)
}

export default Chat;