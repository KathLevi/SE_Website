import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div className="container form-container">
        <h1 className="page-header">{this.props.label}</h1>
        <form onSubmit={this.props.submitForm}>
          {this.props.children}
          <button className="btn btn-primary form-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
