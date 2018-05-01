import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "../assets/logo_ball.png";

const signOut = props => {
  window.localStorage.removeItem("userId");
  props.history.push("/");
};

const Navigation = props => (
  <nav>
    <div className="logo text-left">
      <span>Blue</span>marble<img src={logo} alt="blue marble logo" />
    </div>
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
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/team">
          ABOUT US
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
              <NavLink exact activeClassName="current" to="/create-skill">
                CREATE NEW SKILL
              </NavLink>

              <NavLink exact activeClassName="current" to="/view-skills">
                VIEW MY SKILLS
              </NavLink>

              <NavLink
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
  </nav>
);

export default withRouter(Navigation);
