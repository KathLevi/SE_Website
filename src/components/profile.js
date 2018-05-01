import React from "react";
import { PageHeader } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.jpg";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName : window.localStorage.getItem("userId"),
      fName: "Hello",
      lName: "World",
      company: "test company",
      phoneNum: "123-456-7890",
      address: "300 W Hawthorne Rd, Spokane WA 12345",
      email: "test@test.com"
    };
  }

  render() {
    return (
      <div className="container">
        <PageHeader>My Profile
          <NavLink
            className="btn btn-primary pull-right emptyBtn"
              exact
              activeClassName="current"
              to="/view-skills"
                  >
              View My Skills
          </NavLink>
        </PageHeader>

        <div className="profile1">
          <img src={profile} alt="profile image" />
        </div>
        <div className="profile2">
          <div>Full Name:</div>
          <div>Company:</div>
          <div>Email Address:</div>
          <div>Phone Number:</div>
          <div>Address:</div>
        </div> 
        <div className="profile3">
          <div>{this.state.fName} {this.state.lName}</div>
          <div>{this.state.company}</div>
          <div>{this.state.email}</div>
          <div>{this.state.phoneNum}</div>
          <div>{this.state.address}</div>
        </div>        
      </div>  

    );
  }
}

export default Profile;
