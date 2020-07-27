import React, { useState } from "react";
import { Layout, Menu, Typography, Form, Input, Button, Divider } from "antd";
import "./Join.css";
import { Redirect } from "react-router";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const layout = {
	labelCol: { span: 9 },
	wrapperCol: { span: 16 }
}

const tail = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

function Join() {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [password, setPassword] = useState("");

	const [redirect, setRedirect] = useState(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
	}

	const handleRoomChange = (event) => {
		setRoom(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const handleSubmit = async () => {
		setRedirect(true);
	}

	if(redirect) {
		return <Redirect push to={`/chat?name=${name}&room=${room}`} />
	}

	return (
		<Layout className="container">
			<Header>
				<Menu theme="dark" mode="horizontal">
					<Menu.Item key="1">Home</Menu.Item>
					<Menu.Item key="2">About</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<div className="join-page" style={{ margin: '25px 0' }}>
					<div className="join-head">
						<Title level={1} >Chatzo</Title>
					</div>
					<div className="join-form">
						<Divider>Join Room</Divider>
						<Form {...layout}
							name="room-info"
							onFinish={handleSubmit}
						>
							<Form.Item label="Name" name="name"
								rules={[{ required: true, message: "Name is required!" }]}
							>
								<Input onChange={handleNameChange} value={name} />
							</Form.Item>
							<Form.Item label="Room Code" name="roomCode"
								rules={[{ required: true, message: "Room Code is required!" }]}
							>
								<Input onChange={handleRoomChange} value={room} />
							</Form.Item>
							<Form.Item label="Password" name="password">
								<Input.Password onChange={handlePasswordChange} value={password} />
							</Form.Item>
							<Form.Item {...tail}>
								<Button type="primary" htmlType="submit">Submit</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>Made by: Sarthak Bharadwaj</Footer>
		</Layout>
	)
}

export default Join;