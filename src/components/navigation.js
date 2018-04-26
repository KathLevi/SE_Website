import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const signOut = props => {
  window.localStorage.removeItem("userId");
  props.history.push("/");
};

const Navigation = props => (
  <nav className="menu navbar navbar-inverse navbar-static-top">
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="menuList text-right nav navbar-nav">
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

        <li className="menuListElement">
          <NavLink exact activeClassName="current" to="/create-skill">
            CREATE NEW SKILL
          </NavLink>
        </li>
        <li className="menuListElement">
          <NavLink exact activeClassName="current" to="/view-skills">
            VIEW MY SKILLS
          </NavLink>
        </li>

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
                <NavLink exact activeClassName="current" to="/profile">
                  MY PROFILE
                </NavLink>
                <NavLink
                  activeClassName="current"
                  onClick={() => {
                    signOut(props);
                  }}
                  to="/"
                >
                  SIGN OUT
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
    </div>
  </nav>
);

export default withRouter(Navigation);
