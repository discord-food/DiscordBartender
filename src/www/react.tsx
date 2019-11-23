import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";

class App extends React.Component {
	public render() {
		return <div>Hello World</div>;
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
export const server = () => {};
