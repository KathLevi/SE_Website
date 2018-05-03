import React from "react";
import { PageHeader } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { request } from "../helpers/requests.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: window.localStorage.getItem("userId"),
      fName: "",
      lName: "",
      company: "",
      phoneNum: "",
      address: "",
      email: "",
      loading: true
    };

    if (props.data) {
      this.state = {
        ...this.state,
        fName: props.data.firstName,
        lName: props.data.lastName,
        company: props.data.company,
        phoneNum: props.data.cell,
        email: props.data.email,
        address: props.data.address,
        loading: false
      };
    } else {
      request(
        "http://127.0.0.1:5004/getprofile",
        {
          userId: localStorage.getItem("userId")
        },
        resp => {
          console.log(resp);
          props.updateGlobalState({ data: { ...resp.data } });
          this.setState({ loading: false });
        }
      );
    }
  }

  componentWillReceiveProps(props) {
    if (props.data) {
      this.setState({
        fName: props.data.firstName,
        lName: props.data.lastName,
        company: props.data.company,
        phoneNum: props.data.cell,
        email: props.data.email,
        address: props.data.address
      });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.loading ? (
          <div className="spinner" />
        ) : (
          <div>
            <PageHeader>
              My Profile
              <NavLink
                className="btn btn-primary pull-right emptyBtn"
                exact
                activeClassName="current"
                to="/view-skills"
              >
                View My Skills
              </NavLink>
            </PageHeader>

            <div className="container">
              <div className="profile1">
                <img src={profile} alt="profile" />
              </div>
              <div className="profile2">
                <div>Full Name:</div>
                <div>Company:</div>
                <div>Email Address:</div>
                <div>Phone Number:</div>
                <div>Address:</div>
              </div>
              <div className="profile3">
                <div>
                  {this.state.fName} {this.state.lName}
                </div>
                <div>{this.state.company}</div>
                <div>{this.state.email}</div>
                <div>{this.state.phoneNum}</div>
                <div>{this.state.address}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
