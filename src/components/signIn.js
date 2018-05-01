import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Transition from "react-transition-group/Transition";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

    this.setState({ loading: true });

    let data = {
      Email: this.state.email,
      Password: this.state.password
    };

    axios
      .post("http://127.0.0.1:5004/login", data)
      .then(resp => {
        let responseError = "";
        if ("error" in resp.data) {
          responseError = resp.data.error;
        }
        this.setState({
          loading: false,
          responseError: responseError
        });
        console.log("Login response: ", resp);
        if (resp.data.status === "SUCCESS") {
          window.localStorage.setItem("userId", resp.data.userId);
          this.props.history.push("/profile");
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          responseError: "Server error"
        });
      });
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
              <h2 className="form-signin-heading">Sign in</h2>
              <h5 className="lbl">Email</h5>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
              />
              <h5 className="lbl">Password</h5>

              <input
                type="password"
                className="form-control signin-password"
                name="password"
                onChange={this.handleInputChange}
              />
              <h5 className="forgotPass">
                <a href="#!forgotPass">Forgot Password</a>
              </h5>

              <h5 className="response-error">
                {(tState === "entered" || tState == "exiting") &&
                  this.state.responseError}
              </h5>

              <button className="btn btn-lg btn-block mainBtn" type="submit">
                Sign in
              </button>

              <h5>
                By signing in you are agreeing to our{" "}
                <a href="#!TnC">Terms and Conditions</a>
              </h5>

              <hr />
              <Link className="btn btn-lg btn-block newCustBtn" to="/register">
                I am new to bluemarble
              </Link>
            </form>
          )}
        </Transition>
      </div>
    );
  }
}

export default SignIn;
