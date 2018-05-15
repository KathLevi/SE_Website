import React from "react";

const EditInput = props => {
  var classNames = " " + props.classes;

  return (
    <div className={" " + (props.error ? "has-error" : "") + classNames}>
      <label>{props.label}</label>
      <input
        name={props.name}
        className="edit-input-field"
        placeholder={props.placeholder}
        onChange={props.handleInputChange}
        onBlur={props.handleInputBlur}
        ref={props.setRef}
        type={props.type}
        defaultValue={props.value}
      />
      <span className={"help-block " + (props.error ? "" : "hidden")}>
        {props.error}
      </span>
    </div>
  );
};

export default EditInput;
