import React from "react";

const Select = props => {
  return (
    <div className={"form-group"}>
      <label className="lblBig">{props.label}</label>
      <select
        className="form-control"
        name={props.name}
        onChange={props.handleInputChange}
        ref={props.setRef}
      >
        {props.options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
