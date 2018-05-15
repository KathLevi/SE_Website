import React from "react";
import { PageHeader } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { request } from "../helpers/requests.js";
import EditInput from "./modules/editInput";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.inputs = [
      {
        name: "fName",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "lName",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "company",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "email",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Email is required", validate: i => i === "" },
          {
            message: "Email must be valid",
            validate: i => {
              var re = /\S+@\S+\.\S+/;
              return !re.test(i);
            }
          }
        ]
      },
      {
        name: "phoneNum",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "address",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      }
    ];

    this.state = {
      profileData: {
        userName: window.localStorage.getItem("userId"),
        name: "",
        company: "",
        phoneNum: "",
        address: "",
        email: "",
        cityState: "",
        country: ""
      },
      loading: true
    };

    for (let input of this.inputs) {
      if (input.type == "text") {
        this.state[input.name] = {
          value: input.value,
          validations: input.validations || [],
          error: "",
          optional: input.optional,
          ref: React.createRef(),
          static: input.static
        };
      } else if (input.type == "radio") {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      } else {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      }
    }

    if (props.data) {
      this.state = {
        ...this.state,
        profileData: {
          fName: props.data.firstName,
          lName: props.data.lastName,
          company: props.data.company,
          phoneNum: props.data.cell,
          email: props.data.email,
          address: props.data.address,
          cityState:
            props.data.city +
            ", " +
            props.data.state +
            " " +
            props.data.zipcode,
          country: props.data.country
        },
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
        profileData: {
          fName: props.data.firstName,
          lName: props.data.lastName,
          company: props.data.company,
          phoneNum: props.data.cell,
          email: props.data.email,
          address: props.data.address,
          cityState:
            props.data.city +
            ", " +
            props.data.state +
            " " +
            props.data.zipcode,
          country: props.data.country
        }
      });
    }
  }

  editProfile = () => {
    this.setState({ isEditing: true });
  };

  validate = () => {
    let isValid = true;
    for (let inputName of this.inputs
      .filter(i => i.type === "text")
      .map(inp => inp.name)
      .reverse()) {
      let error = "";
      for (let validation of this.state[inputName].validations) {
        if (validation.validate(this.state[inputName].value)) {
          error = validation.message;
          isValid = false;
          this.state[inputName].ref.current.focus();
          break;
        }
      }
      this.setState(prevState => ({
        [inputName]: {
          ...prevState[inputName],
          error: error
        }
      }));
    }
    return isValid;
  };

  handleInputChange = event => {
    const target = event.target;

    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        value: target.value,
        error: ""
      }
    }));
  };

  handleInputBlur = event => {
    const target = event.target;
    let error = "";
    for (let validation of this.state[target.name].validations) {
      if (validation.validate(target.value)) {
        error = validation.message;
        break;
      }
    }
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        error: error
      }
    }));
  };

  renderField = (val, name) => {
    if (this.state.isEditing && !this.state[name].static) {
      return (
        <EditInput
          key={name}
          value={val}
          name={name}
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          setRef={this.state[name].ref}
          placeholder={""}
          error={this.state[name].error}
        >
          {val}
        </EditInput>
      );
    } else {
      return <p key={name}>{val}</p>;
    }
  };

  saveProfile = () => {
    if (!this.validate()) return;

    this.setState({ loading: true });

    let requestData = {
      userId: localStorage.getItem("userId"),
      firstName: this.state.fName.value || this.state.profileData.fName,
      lastName: this.state.lName.value || this.state.profileData.lName,
      company: this.state.company.value || this.state.profileData.company,
      email: this.state.email.value || this.state.profileData.email,
      cell: this.state.phoneNum.value || this.state.profileData.cell,
      address: this.state.address.value || this.state.profileData.address
    };

    console.log("sending profile data: ", requestData);

    /* create new skill and push to db */
    request("http://127.0.0.1:5004/editprofile", requestData, resp => {
      console.log(resp);
      if (resp.data && resp.data.status === "SUCCESS") {
        console.log("SUCCESS", resp.data);
        request(
          "http://127.0.0.1:5004/getprofile",
          {
            userId: localStorage.getItem("userId")
          },
          resp => {
            console.log(resp);
            this.props.updateGlobalState({ data: { ...resp.data } });
            this.setState({ loading: false });
          }
        );
      } else {
        console.log("SERVER ERROR at edit profile submit");
        this.setState({ loading: false });
      }
    });

    this.setState({ isEditing: false });
  };

  render() {
    return (
      <div className="container page-container">
        {this.state.loading ? (
          <div className="spinner" />
        ) : (
          <div>
            <PageHeader>
              My Profile
              {!this.state.isEditing && (
                <button
                  className="btn btn-primary pull-right emptyBtn"
                  onClick={this.editProfile}
                >
                  Edit Profile
                </button>
              )}
            </PageHeader>

            <div className="profile-container">
              <div className="profile1">
                <img src={profile} alt="profile" />
              </div>

              <table className="profile-table">
                <tbody>
                  <tr>
                    <td>First Name: </td>
                    <td>
                      {this.renderField(this.state.profileData.fName, "fName")}
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name: </td>
                    <td>
                      {this.renderField(this.state.profileData.lName, "lName")}
                    </td>
                  </tr>
                  <tr>
                    <td>Company: </td>
                    <td>
                      {this.renderField(
                        this.state.profileData.company,
                        "company"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Email Address: </td>
                    <td>
                      {this.renderField(this.state.profileData.email, "email")}
                    </td>
                  </tr>
                  <tr>
                    <td>Phone Number: </td>
                    <td>
                      {this.renderField(
                        this.state.profileData.phoneNum,
                        "phoneNum"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{"Address: "}</td>
                    <td>
                      {this.renderField(
                        this.state.profileData.address,
                        "address"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {this.state.isEditing && (
              <button
                className={
                  "btn btn-primary save-profile-btn" +
                  (this.state.submitted ? " disabled disabled-btn" : "")
                }
                onClick={this.saveProfile}
              >
                Save Profile
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
