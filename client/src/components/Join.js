import React, { useState } from "react";
import { Layout, Menu, Typography, Form, Input, Button } from "antd";
import "./Join.css";

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
	const [password, setPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	}
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const handleSubmit = async () => {
		console.log(name, password);
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
					<Title level={1} className="join-head">Chatzo</Title>
					<Form {...layout}
						name="room-info"
					>
						<Form.Item label="Room Code" name="roomCode"
							rules={[{ required: true, message: "Room Code is required!" }]}
						>
							<Input onChange={handleNameChange} value={name} />
						</Form.Item>
						<Form.Item label="Password" name="password">
							<Input onChange={handlePasswordChange} value={password} />
						</Form.Item>
						<Form.Item {...tail}>
							<Button type="primary" onClick={handleSubmit}>Submit</Button>
						</Form.Item>
					</Form>
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>Made by: Sarthak Bharadwaj</Footer>
		</Layout>
	)
}

export default Join;