import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

const Context = React.createContext({});

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    <Context.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>,
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
