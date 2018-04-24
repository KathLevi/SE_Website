import React from "react";
import { PageHeader } from "react-bootstrap";


class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName : window.localStorage.getItem("userId")
    };
  }

  render() {
    return (
      <div className="container">
        <PageHeader>Hello, {this.state.userName}</PageHeader>
      </div>  

    );
  }
}

export default Profile;
