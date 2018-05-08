import React from "react";

const Input = props => {
  var classNames = " " + props.classes;

  return (
    <div
      className={
        "form-group " +
        (props.error === "EMPTY" ? "has-error" : "") +
        classNames
      }
    >
      <label>{props.label}</label>
      <input
        name={props.name}
        className="form-control"
        placeholder={props.placeholder}
        onChange={props.handleInputChange}
        onBlur={props.handleInputBlur}
        ref={props.setRef}
        type={props.type}
        value={props.value}
      />
      <span
        className={"help-block " + (props.error === "EMPTY" ? "" : "hidden")}
      >
        {props.errorMessage}
      </span>
    </div>
  );
};

export default Input;
