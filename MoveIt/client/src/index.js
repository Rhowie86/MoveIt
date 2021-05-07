import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
