import React, { useRef, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

function Messages(props) {
	const divref = useRef(null);

	useEffect(() => {
		divref.current.scrollIntoView({behavior: "smooth"});
	}, [props.messages])

	return (
		<ScrollToBottom>
			{props.messages.map((message) => (
				<Message message={message} user={props.user}/>
			))}
			<div ref={divref} />
		</ScrollToBottom>
	)

}

export default Messages;