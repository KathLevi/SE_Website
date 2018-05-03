import React from "react";
import axios from "axios";
import Transition from "react-transition-group/Transition";

class Register extends React.Component {
  constructor() {
    super();
    let random1 = Math.floor(Math.random() * 20) + 1,
      random2 = Math.floor(Math.random() * 10) + 1,
      sign = Math.floor(Math.random() * 3),
      answer = 0;
    if (sign === 0) {
      sign = "+";
      answer = random1 + random2;
    } else if (sign === 1) {
      sign = "-";
      answer = random1 - random2;
    } else {
      sign = "*";
      answer = random1 * random2;
    }
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      rand1: random1,
      sign: sign,
      rand2: random2,
      userAns: "",
      answer: answer,
      loading: false,
      responseError: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  submitForm = e => {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert("passwords do not match");
    } else {
      let data = {
        email: this.state.email,
        password: this.state.password
      };

      this.setState({ loading: true });

      axios
        .post("http://127.0.0.1:5004/register", data)
        .then(resp => {
          let responseError = "";
          if (resp.data.status === "USER_ALREADY_EXISTS_ERROR") {
            responseError = "User with email already exists";
          }
          this.setState({
            loading: false,
            responseError: responseError
          });
          console.log("Register response: ", resp);
          if (resp.data.status === "SUCCESS") {
            window.localStorage.setItem("userId", resp.data.userId);
            this.props.history.push("/");
          }
        })
        .catch(error => {
          this.setState({
            loading: false,
            responseError: "Server error"
          });
        });
    }
  };

  duration = 500;

  defaultStyle = {
    transition: `opacity ${this.duration}ms ease-in-out`,
    opacity: 0
  };

  transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
  };

  render() {
    return (
      <div className="signInBox">
        <Transition timeout={this.duration} in={this.state.loading}>
          {state => (
            <div
              className="spinner"
              style={{
                ...this.defaultStyle,
                ...this.transitionStyles[state]
              }}
            />
          )}
        </Transition>
        <Transition timeout={this.duration} in={!this.state.loading}>
          {tState => (
            <form
              className="form-signin"
              style={{
                ...this.defaultStyle,
                ...this.transitionStyles[tState]
              }}
              onSubmit={this.submitForm}
            >
              <h2 className="form-signin-heading">Register</h2>

              <h5 className="lbl">Email</h5>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                required=""
                autofocus=""
              />

              <h5 className="lbl">Password</h5>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleInputChange}
                required=""
              />

              <h5 className="lbl">
                Retype Password<span id="noMatch">{this.state.error}</span>
              </h5>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={this.handleInputChange}
                required=""
              />

              {/*
          <h3 className="capcha">
            <span id="number1">{this.state.rand1} </span>
            <span id="sign">{this.state.sign}</span>
            <span id="number2"> {this.state.rand2}</span>
            <span> = </span>
            <input
              type="number"
              id="capchaInput"
              name="userAns"
              onChange={this.handleInputChange}
              required=""
            />
        </h3>*/}

              <button
                className="btn btn-lg btn-block mainBtn registerBtn"
                type="submit"
              >
                Register
              </button>

              <h6 className="TnC">
                By registering you are agreeing to our{" "}
                <a href="#!TnC">Terms and Conditions</a>
              </h6>
            </form>
          )}
        </Transition>
      </div>
    );
  }
}

export default Register;
