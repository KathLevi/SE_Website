import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "../assets/logo_ball.png";

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
        <div className="container-fluid">
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
              onClick={this.toggleCollapse}
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
                  >
                    PROFILE <span className="caret" />
                  </NavLink>

                  <ul
                    className={
                      "dropdown-menu " + (this.state.showProfileDrop && "show")
                    }
                    onMouseEnter={this.onProfileHover}
                    onMouseLeave={this.onProfileHoverExit}
                  >
                    <li>
                      <NavLink
                        exact
                        activeClassName="current"
                        className="dropdown-link"
                        to="/view-skills"
                        onClick={this.toggleCollapse}
                      >
                        VIEW MY SKILLS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signin"
                        className="dropdown-link"
                        onClick={() => {
                          this.signOut();
                          this.toggleCollapse();
                        }}
                      >
                        SWITCH ACCOUNTS
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <NavLink exact activeClassName="current" to="/signin">
                    SIGN IN
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
    {
      /*<div>
        <nav className="navbar navbar-inverse navbar-fixed-top bm-nav">
          {" "}
          <div className="container-fluid">
            {" "}
            <div className="navbar-header">
              {" "}
              <button
                type="button"
                className={"collapsed navbar-toggle"}
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-6"
                aria-expanded="false"
                onClick={this.toggleCollapse}
              >
                {" "}
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
              </button>{" "}
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                className="logo text-left"
              >
                <span>Blue</span>marble<img src={logo} alt="blue marble logo" />
              </Link>
            </div>{" "}
            <div
              className={
                this.state.collapsed
                  ? "collapse navbar-collapse"
                  : "collapse navbar-collapse show"
              }
            >
              {" "}
              <ul className="navbar-right bm-nav">
                <li className="menuListElement">
                  <NavLink exact activeClassName="current" to="/">
                    HOME
                  </NavLink>
                </li>
                <li className="menuListElement">
                  <NavLink exact activeClassName="current" to="/demo">
                    DEMO
                  </NavLink>
                </li>
                {window.localStorage.userId && (
                  <li className="menuListElement">
                    <NavLink exact activeClassName="current" to="/create-skill">
                      CREATE SKILL
                    </NavLink>
                  </li>
                )}

                <li className="menuListElement dropdwn">
                  {window.localStorage.userId ? (
                    <div>
                      <NavLink
                        exact
                        className="dropbtn text-center"
                        activeClassName="current"
                        to="/profile"
                      >
                        PROFILE
                      </NavLink>

                      <div className="dropdown-content text-left">
                        <NavLink
                          exact
                          activeClassName="current"
                          className="dropdown-link"
                          to="/view-skills"
                        >
                          VIEW MY SKILLS
                        </NavLink>

                        <NavLink
                          onClick={() => {
                            signOut(this.props);
                          }}
                          to="/signin"
                          className="dropdown-link"
                        >
                          SWITCH ACCOUNTS
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      exact
                      className="dropbtn text-center"
                      activeClassName="current"
                      to="/signin"
                    >
                      SIGN IN
                    </NavLink>
                  )}
                </li>
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </nav></div>*/
    }

    {
      /*}<nav className="navbar navbar-default">
      <div className="container-fluid">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className="logo text-left"
        >
          <span>Blue</span>marble<img src={logo} alt="blue marble logo" />
        </Link>
        <ul className="menuList text-right nav navbar-nav">
          <li className="active">
            <a href="#">
              Link <span className="sr-only">(current)</span>
            </a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li className="dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li className="menuListElement">
                <NavLink exact activeClassName="current" to="/">
                  HOME
                </NavLink>
              </li>
              <li className="menuListElement">
                <NavLink exact activeClassName="current" to="/demo">
                  DEMO
                </NavLink>
              </li>
              {window.localStorage.userId && (
                <li className="menuListElement">
                  <NavLink exact activeClassName="current" to="/create-skill">
                    CREATE SKILL
                  </NavLink>
                </li>
              )}

              <li className="menuListElement dropdwn">
                {window.localStorage.userId ? (
                  <div>
                    <NavLink
                      exact
                      className="dropbtn text-center"
                      activeClassName="current"
                      to="/profile"
                    >
                      PROFILE
                    </NavLink>

                    <div className="dropdown-content text-left">
                      <NavLink
                        exact
                        activeClassName="current"
                        className="dropdown-link"
                        to="/view-skills"
                      >
                        VIEW MY SKILLS
                      </NavLink>

                      <NavLink
                        onClick={() => {
                          signOut(props);
                        }}
                        to="/signin"
                        className="dropdown-link"
                      >
                        SWITCH ACCOUNTS
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    exact
                    className="dropbtn text-center"
                    activeClassName="current"
                    to="/signin"
                  >
                    SIGN IN
                  </NavLink>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>*/
    }
  }
}
export default withRouter(Navigation);
