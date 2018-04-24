import React from "react";
import { PageHeader } from "react-bootstrap";


class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName : window.localStorage.getItem("userId"),
      fName: "Hello",
      lName: "World",
      phoneNum: "123-456-7890",
      address: "300 W Hawthorne Rd, Spokane WA 12345",
      email: "test@test.com"
    };
  }

  render() {
    return (
      <div className="container">
        <PageHeader>Hello, {this.state.userName}</PageHeader>
        <div>USER INFO</div>
        <div>Name: {this.state.fName} {this.state.lName}</div>
        <div>Company: {this.state.address}</div>
        <div>Email: {this.state.email}</div>

        <div>CONTACT INFO</div>
        <div>Phone Number: {this.state.phoneNum}</div>
        <div>Address: {this.state.address}</div>
        <div>Email: {this.state.email}</div>

      </div>  

    );
  }
}

export default Profile;
