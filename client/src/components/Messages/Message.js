import React from "react";
import "./Message.css";

function Message(props) {
	let byUser = false;

	if(props.message.user === props.user.trim().toLowerCase()) {
		byUser = true;
	}

	return (
		<div className={byUser? "msg-container flex-end": "msg-container flex-start"}>
			<div className={byUser? " msg-box bg-blue": "msg-box bg-light"}>
				<p className="msg-name">{props.message.user}</p>
				<div className="msg-body">
					<p className="msg-text">{props.message.text}</p>
				</div>
			</div>
		</div>
	)
}

export default Message;