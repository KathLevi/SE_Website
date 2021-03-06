import React from "react";

const Input = props => {
  var classNames = " " + props.classes;

  return (
    <div
      className={"form-group " + (props.error ? "has-error" : "") + classNames}
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
      />
      <span className={"help-block " + (props.error ? "" : "hidden")}>
        {props.error}
      </span>
    </div>
  );
};

export default Input;
