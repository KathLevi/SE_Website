import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Context from "./context";

const updateGlobalState = newState => {
  state = {
    ...state,
    ...newState
  };
};

var state = {
  skills: [],
  updateGlobalState: updateGlobalState
};

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

// Do this once
registerServiceWorker();

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    render(App);
  });
}
