import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <HomePage />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
