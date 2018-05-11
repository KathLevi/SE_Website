import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "../assets/logo_ball.png";
import onClickOutside from "react-onclickoutside";

const signOut = props => {
  window.localStorage.removeItem("userId");
  props.updateGlobalState({ userData: {} });
  props.history.push("/");
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      showProfileDrop: false
    };
  }

  handleClickOutside = e => {
    this.setState({ collapsed: false });
  };

  signOut = () => {
    console.log("siginign out");
    window.localStorage.removeItem("userId");
    this.props.updateGlobalState({ userData: {} });
    this.props.history.push("/");
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  onProfileHover = () => {
    this.setState({ showProfileDrop: true });
  };

  onProfileHoverExit = () => {
    this.setState({ showProfileDrop: false });
  };

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div>
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="true"
              aria-controls="navbar"
              onClick={this.toggleCollapse}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              className="logo text-left"
            >
              <span>Blue</span>marble<img src={logo} alt="blue marble logo" />
            </NavLink>
          </div>
          <div
            id="navbar"
            className={
              "navbar-collapse collapse" + (this.state.collapsed ? " in" : "")
            }
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink
                  exact
                  activeClassName="current"
                  to="/"
                  onClick={this.toggleCollapse}
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="current"
                  to="/demo"
                  onClick={this.toggleCollapse}
                >
                  DEMO
                </NavLink>
              </li>
              {window.localStorage.userId && (
                <li>
                  <NavLink
                    exact
                    activeClassName="current"
                    to="/create-skill"
                    onClick={this.toggleCollapse}
                  >
                    CREATE SKILL
                  </NavLink>
                </li>
              )}
              {window.localStorage.userId ? (
                <li
                  className={
                    "dropdown " + (this.state.showProfileDrop && "open")
                  }
                >
                  <NavLink
                    exact
                    activeClassName="current"
                    to="/profile"
                    onMouseEnter={this.onProfileHover}
                    onMouseLeave={this.onProfileHoverExit}
                    onClick={this.toggleCollapse}
                    onClick={this.onProfileHover}
                  >
                    PROFILE <span className="caret" />
                  </NavLink>

                  <ul
                    className={
                      "dropdown-menu " + (this.state.showProfileDrop && "show navbar-nav navbar-inverse")
                    }
                    onMouseEnter={this.onProfileHover}
                    onMouseLeave={this.onProfileHoverExit}
                  >
                    <li>
                      <NavLink
                        exact
                        activeClassName="current"
                        to="/view-skills"
                        onClick={this.toggleCollapse}
                      >
                        VIEW MY SKILLS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signin"
                        onClick={() => {
                          this.toggleCollapse();
                          this.signOut();
                        }}
                      >
                        SIGN OUT
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <NavLink
                    exact
                    activeClassName="current"
                    to="/signin"
                    onClick={this.toggleCollapse}
                  >
                    SIGN IN
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default onClickOutside(Navigation);
