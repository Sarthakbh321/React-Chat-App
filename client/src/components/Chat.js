import React, { useEffect, useState } from "react";
import qs from "query-string";
import io from "socket.io-client";
import {Input, Layout, Button} from "antd";
import "./Chat.css";
import {RightOutlined, CloseOutlined} from "@ant-design/icons";
import Messages from "./Messages/Messages";

let socket;

const {Header, Content, Footer, Sider} = Layout;

function Chat(props) {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const ENDPOINT = "https://chat-app-sarthak.herokuapp.com/";

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
			setMessages((messages) => [...messages, message])
		});

		socket.on("roomDate", (data) => {
			console.log(data);
		});

	}, []);


	const sendMessage = (event) => {
		event.preventDefault();

		if(message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			})
		}
	}

	return (
		<Layout className="chat-container">
			<Sider width="30%" collapsible>
				
			</Sider>
			<Layout>
				<Header className="chat-heading">{room} <a href="/" className="chat-close"><CloseOutlined /></a></Header>
				<Content className="chat-content">
					<Messages messages={messages} user={name}/>
				</Content>
				<Footer className="chat-input">
					<Input 
						placeholder="Enter a message..."
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