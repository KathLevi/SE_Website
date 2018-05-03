import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "../assets/logo_ball.png";

const signOut = props => {
  window.localStorage.removeItem("userId");
  props.history.push("/");
};

const Navigation = props => (
  <nav>
    <Link to="/" style={{ textDecoration: "none" }} className="logo text-left">
      <span>Blue</span>marble<img src={logo} alt="blue marble logo" />
    </Link>
    <ul className="menuList text-right">
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
  </nav>
);

export default withRouter(Navigation);
