import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Messages(props) {

	return (
		<ScrollToBottom>
			{props.messages.map((message) => (
				<p>{message.text}</p>
			))}
		</ScrollToBottom>
	)

}

export default Messages;