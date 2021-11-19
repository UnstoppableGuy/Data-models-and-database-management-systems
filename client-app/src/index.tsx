import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import App from "./App";
import { createBrowserHistory } from "history";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, StoreContext } from "./Store";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
