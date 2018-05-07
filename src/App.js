import React from "react";
import "./App.css";
import Main from "./components/main";
import Footer from "./components/footer";
import Navigation from "./components/navigation";
import Context from "./context";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: { skills: [] },
      updateGlobalState: this.updateGlobalState
    };
  }

  updateGlobalState = newState => {
    this.setState({
      ...newState,
      userData: { ...this.state.userData, ...newState.userData }
    });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <Navigation />
        <Main />
        <Footer />
      </Context.Provider>
    );
  }
}

export default App;
