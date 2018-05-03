import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Transition from "react-transition-group/Transition";
import Form from "./form";
import Input from "./modules/input";

class SignIn extends React.Component {
  constructor() {
    super();
    this.inputs = {
      email: { value: "", optional: false },
      password: { value: "", optional: false }
    };
    this.state = {
      ...this.inputs
    };
    for (let attr of Object.keys(this.inputs)) {
      this.state[attr].error = "";
      this.state[attr].ref = React.createRef();
      this.state[attr].props = {
        name: attr,
        handleInputChange: this.handleInputChange,
        handleInputBlur: this.handleInputBlur,
        setRef: this.state[attr].ref
      };
    }
    this.state = {
      ...this.state,
      loading: false,
      responseError: "",
      success: false
    };
  }

  componentDidMount = () => {
    this.state.email.ref.current.focus();
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        value: target.value
      }
    }));
  };

  handleInputBlur = event => {
    const target = event.target;
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        error: prevState[target.name].value === "" ? "EMPTY" : ""
      }
    }));
  };

  validate = () => {
    let isValid = true;
    for (let input of Object.keys(this.inputs).reverse()) {
      if (!this.state[input].optional && !this.state[input].value) {
        this.setState(prevState => ({
          [input]: {
            ...prevState[input],
            error: "EMPTY"
          }
        }));
        isValid = false;
        this.state[input].ref.current.focus();
      }
    }
    return isValid;
  };

  submitForm = e => {
    e.preventDefault();

    if (!this.validate()) return;

    this.setState({ loading: true });

    let data = {
      email: this.state.email.value,
      password: this.state.password.value
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
        console.log("Login response is: ", resp);
        if (resp.data.status === "SUCCESS") {
          console.log("success");
          window.localStorage.setItem("userId", resp.data.userId);
          this.props.history.push("/profile");
          axios
            .post("http://127.0.0.1:5004/viewskills", {
              UserId: resp.data.userId
            })
            .then(resp => {
              this.props.updateGlobalState({
                skills: { hi: "hello" },
                skillsLoaded: true
              });
              console.log(resp);
            })
            .catch(error => {
              this.props.updateGlobalState({
                skills: { hi: "hello" },
                skillsLoaded: true
              });
              console.log(error);
            });
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
              <Input
                {...this.state.email.props}
                label="Email"
                placeholder=""
                error={this.state.email.error}
                errorMessage={"Please enter an email"}
              />
              <Input
                {...this.state.password.props}
                label="Password"
                placeholder=""
                error={this.state.password.error}
                errorMessage={"Please enter a password"}
                type={"password"}
              />

              <h5 className="forgotPass">
                <a href="#!forgotPass">Forgot Password</a>
              </h5>

              <div className="response-error">
                <h5>
                  {(tState === "entered" || tState == "exiting") &&
                    this.state.responseError}
                </h5>
              </div>

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
