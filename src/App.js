import React from "react";
import "./App.css";
import Main from "./components/main";
import Navigation from "./components/navigation";
import Footer from "./components/footer";

const App = () => (
  <div className="app">
    <Navigation />
    <Main />
    <Footer />
  </div>
);

export default App;
