import React from "react";
import Input from "./modules/input";
import RadioGroup from "./modules/radioGroup";
import Select from "./modules/select";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = { utterance0Num: 3, intentNum: 1 };

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

    for (let i = 0; i < this.state.utterance0Num; i++) {
      this.state["utterance" + i + "_0"] = {
        value: "",
        validations: [],
        error: "",
        ref: React.createRef()
      };
    }

    this.state["response0"] = {
      validations: [],
      error: "",
      ref: React.createRef()
    };

    console.log(this.state);
  }

  componentDidMount = () => {
    if (this.props.inputs) {
      this.state[this.props.inputs[1].name].ref.current.focus();
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

  addUtterances = intentNum => {
    let newState = {};
    for (
      let i = this.state["utterance" + intentNum + "Num"] - 1;
      i < this.state["utterance" + intentNum + "Num"] + 3;
      i++
    ) {
      newState["utterance" + i + "_" + intentNum] = {
        value: "",
        validations: [],
        error: "",
        ref: React.createRef()
      };
    }
    this.setState({
      ...newState,
      ["utterance" + intentNum + "Num"]:
        this.state["utterance" + intentNum + "Num"] + 3
    });
  };

  addIntent = () => {
    let newState = {};
    for (let i = this.state.intentNum; i < this.state.intentNum + 1; i++) {
      newState["response" + i] = {
        value: "",
        validations: [],
        error: "",
        ref: React.createRef()
      };
    }
    let iNum = this.state.intentNum;
    this.setState(
      {
        ...newState,
        intentNum: this.state.intentNum + 1,
        ["utterance" + iNum + "Num"]: 0
      },
      () => {
        let newState = {};
        for (
          let i = this.state["utterance" + iNum + "Num"];
          i < this.state["utterance" + iNum + "Num"] + 4;
          i++
        ) {
          newState["utterance" + i + "_" + iNum] = {
            value: "",
            validations: [],
            error: "",
            ref: React.createRef()
          };
        }
        this.setState({
          ...newState,
          ["utterance" + iNum + "Num"]:
            this.state["utterance" + iNum + "Num"] + 3
        });
      }
    );
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
            } else if (input.type === "intentGroup") {
              return (
                <div key={input.name}>
                  {[...Array(this.state.intentNum).keys()].map(j => (
                    <div key={j} className="intent">
                      <label>{"Intent " + (j + 1)}</label>
                      <div className="utterance-group">
                        {[
                          ...Array(this.state["utterance" + j + "Num"]).keys()
                        ].map(i => (
                          <Input
                            key={i}
                            value={""}
                            name={"utterance" + i + "_" + j}
                            handleInputChange={this.handleInputChange}
                            handleInputBlur={this.handleInputBlur}
                            setRef={
                              this.state["utterance" + i + "_" + j] &&
                              this.state["utterance" + i + "_" + j].ref
                            }
                            label={i == 0 && "Utterances"}
                            placeholder={""}
                            error={
                              this.state["utterance" + i + "_" + j] &&
                              this.state["utterance" + i + "_" + j].error
                            }
                            classes={"utterance-input"}
                          />
                        ))}
                        <a
                          className="add-utterances-btn"
                          onClick={() => this.addUtterances(j)}
                        >
                          Add additional utterances
                        </a>
                      </div>
                      <Input
                        key={j}
                        value={""}
                        name={"response" + j}
                        handleInputChange={this.handleInputChange}
                        handleInputBlur={this.handleInputBlur}
                        setRef={this.state["response" + j].ref}
                        label={"Response"}
                        placeholder={""}
                        error={this.state["response" + j].error}
                      />
                      {j == this.state.intentNum - 1 && (
                        <a className="add-intent-btn" onClick={this.addIntent}>
                          Add additional intent
                        </a>
                      )}
                    </div>
                  ))}
                </div>
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
