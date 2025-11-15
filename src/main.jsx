import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import "./styles/App.css";
import "./styles/styles.css"

const rootDom = document.getElementById("root")
const root = ReactDOM.createRoot(rootDom);

root.render(
    <App />
);