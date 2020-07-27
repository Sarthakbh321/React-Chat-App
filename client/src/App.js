import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Join from "./components/Join";

function App() {
	return (
		<Router>
			<Route exact path="/" component={Join}/>
		</Router>
	)
}

export default App;