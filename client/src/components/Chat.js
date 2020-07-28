import React, { useEffect, useState } from "react";
import qs from "query-string";
import io from "socket.io-client";
import {Input, Layout, Button} from "antd";
import "./Chat.css";
import {RightOutlined} from "@ant-design/icons";

let socket;

const {Header, Content, Footer, Sider} = Layout;

function Chat(props) {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const ENDPOINT = "localhost:5000";

	useEffect(() => {
		const query = qs.parse(props.location.search);
		
		socket = io(ENDPOINT);

		setName(query.name);
		setRoom(query.room);

		socket.emit("join", {name: query.name, room: query.room}, (error) => {
			if(error) alert(error);
		} );

		return () => {
			socket.emit("disconnect");
			socket.off();
		}

	}, [ENDPOINT, props.location.search])

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages([...messages, message]);
		})
	}, [messages]);

	const sendMessage = (event) => {
		event.preventDefault();

		if(message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			})
		}
	}

	console.log(message, messages);

	return (
		<Layout className="chat-container">
			<Sider>
				
			</Sider>
			<Layout>
				<Header className="chat-heading">{room}</Header>
				<Content className="chat-content">Chat Space</Content>
				<Footer className="chat-input">
					<Input 
						value={message} 
						onChange={(event) => setMessage(event.target.value)} 
						onKeyPress={(event) => event.key === "Enter"? sendMessage(event): null}
					/>
					<Button icon={<RightOutlined />} type="primary" shape="circle" className="send-button"/>
				</Footer>
			</Layout>
		</Layout>
	)
}

export default Chat;