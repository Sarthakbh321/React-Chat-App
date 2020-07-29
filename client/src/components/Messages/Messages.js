import React, { useRef, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Messages(props) {
	const divref = useRef(null);

	useEffect(() => {
		divref.current.scrollIntoView({behavior: "smooth"});
	}, [props.messages])

	return (
		<ScrollToBottom>
			{props.messages.map((message) => (
				<p>{message.text}</p>
			))}
			<div ref={divref} />
		</ScrollToBottom>
	)

}

export default Messages;