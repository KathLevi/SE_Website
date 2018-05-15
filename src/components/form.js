import React from "react";
import Input from "./modules/input";
import RadioGroup from "./modules/radioGroup";
import Select from "./modules/select";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    for (let input of props.inputs) {
      if (input.type == "text") {
        this.state[input.name] = {
          value: input.value || "",
          validations: input.validations || [],
          error: "",
          optional: input.optional,
          ref: React.createRef()
        };
      } else if (input.type == "radio") {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      } else {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      }
    }

    console.log(this.state);
  }

  componentDidMount = () => {
    if (this.props.inputs) {
      this.state[this.props.inputs[0].name].ref.current.focus();
    }
  };

  handleInputChange = event => {
    const target = event.target;

    this.setState(
      prevState => ({
        [target.name]: {
          ...prevState[target.name],
          value: target.value,
          error: ""
        }
      }),
      () => {
        this.props.updateParentState(this.state);
      }
    );
  };

  handleInputBlur = event => {
    const target = event.target;
    let error = "";
    for (let validation of this.state[target.name].validations) {
      if (validation.validate(target.value)) {
        error = validation.message;
        break;
      }
    }
    this.setState(
      prevState => ({
        [target.name]: {
          ...prevState[target.name],
          error: error
        }
      }),
      () => {
        this.props.updateParentState(this.state);
      }
    );
  };

  validate = () => {
    let isValid = true;
    for (let inputName of this.props.inputs
      .filter(i => i.type === "text")
      .map(inp => inp.name)
      .reverse()) {
      let error = "";
      for (let validation of this.state[inputName].validations) {
        if (validation.validate(this.state[inputName].value)) {
          error = validation.message;
          isValid = false;
          this.state[inputName].ref.current.focus();
        }
      }
      this.setState(
        prevState => ({
          [inputName]: {
            ...prevState[inputName],
            error: error
          }
        }),
        () => {
          this.props.updateParentState(this.state);
        }
      );
    }
    return isValid;
  };

  submit = e => {
    e.preventDefault();
    if (!this.validate()) return;
    this.props.submitForm();
  };

  render() {
    return (
      <div className="container form-container">
        <h1 className="page-header">{this.props.label}</h1>
        <form onSubmit={this.submit}>
          {this.props.inputs.map(input => {
            if (input.type === "text") {
              return (
                <Input
                  key={input.name}
                  value={input.value}
                  name={input.name}
                  handleInputChange={this.handleInputChange}
                  handleInputBlur={this.handleInputBlur}
                  setRef={this.state[input.name].ref}
                  label={input.label}
                  placeholder={input.placeholder}
                  error={this.state[input.name].error}
                />
              );
            } else if (input.type === "radio") {
              return (
                <RadioGroup
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  value={this.state[input.name].value}
                  handleInputChange={this.handleInputChange}
                  handleInputBlur={this.handleInputBlur}
                  setRef={this.state[input.name].ref}
                  inputs={input.inputs}
                />
              );
            } else if (input.type === "select") {
              return (
                <Select
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  handleInputChange={this.handleInputChange}
                  handleInputBlur={this.handleInputBlur}
                  options={input.options}
                />
              );
            }
          })}
          {this.props.children}
          <button className="btn btn-primary form-submit" type="submit">
            {this.props.submitButtonLabel}
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
