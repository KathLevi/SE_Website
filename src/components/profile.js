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
      name: "",
      company: "",
      phoneNum: "",
      address: "",
      email: "",
      cityState: "",
      country: "",
      loading: true
    };

    if (props.data) {
      this.state = {
        ...this.state,
        name: props.data.firstName + " " + props.data.lastName,
        company: props.data.company,
        phoneNum: props.data.cell,
        email: props.data.email,
        address: props.data.address,
        cityState:
          props.data.city + ", " + props.data.state + " " + props.data.zipcode,
        country: props.data.country,
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
        name: props.data.firstName + " " + props.data.lastName,
        company: props.data.company,
        phoneNum: props.data.cell,
        email: props.data.email,
        address: props.data.address,
        cityState:
          props.data.city + ", " + props.data.state + " " + props.data.zipcode,
        country: props.data.country
      });
    }
  }

  render() {
    return (
      <div className="container page-container">
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
                to="/edit-profile"
              >
                Edit Profile
              </NavLink>
            </PageHeader>

            <div className="profile-container">
              <div className="profile1">
                <img src={profile} alt="profile" />
              </div>

              <table className="profile-table">
                <tbody>
                  <tr>
                    <td>Full Name: </td>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr>
                    <td>Company: </td>
                    <td>{this.state.company}</td>
                  </tr>
                  <tr>
                    <td>Email Address: </td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number: </td>
                    <td>{this.state.phoneNum}</td>
                  </tr>
                  <tr>
                    <td>{"Address: "}</td>
                    <td>{this.state.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
