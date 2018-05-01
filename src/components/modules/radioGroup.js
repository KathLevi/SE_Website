import React from "react";

const RadioGroup = props => {
  return (
    <div className="form-group">
      {props.inputs.map(inp => {
        return (
          <div className="radio">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name={props.name}
                value={inp.value}
                checked={props.value === inp.value}
                onChange={props.handleInputChange}
              />
              {inp.label}
            </label>
          </div>
        );
      })}

      {/*}<div className="radio">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            name="platform"
            value="google"
            checked={props.platform === "google"}
            onChange={props.handleInputChange}
          />
          Google Voice
        </label>
      </div>*/}
    </div>
  );
};

export default RadioGroup;
