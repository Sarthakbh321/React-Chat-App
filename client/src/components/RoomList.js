import React from "react";
import { List } from "antd";
import './RoomList.css';

function RoomList(props) {
	return (
		<List
			className="user-list"
			size="small"
			header={<strong>People in room</strong>}
			bordered
			dataSource={props.users}
			renderItem={(item) => (
				<List.Item className="room-user">
					<span style={{color: 'rgb(0, 255, 0)'}}>•</span> {item.name}
				</List.Item>
			)}
		/>
	)
}

export default RoomList;