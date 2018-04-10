import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="menu">
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
        <NavLink exact activeClassName="current" to="/createSkill">
          CREAT NEW SKILL
        </NavLink>
      </li>
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/viewSkills">
          VIEW MY SKILLS
        </NavLink>
      </li>

      <li className="menuListElement dropdwn">
        <NavLink
          exact
          className="dropbtn text-center"
          activeClassName="current"
          to="/signIn"
        >
          SIGN IN
        </NavLink>
        <div className="dropdown-content text-left">
          <NavLink exact activeClassName="current" to="/profile">
            MY PROFILE
          </NavLink>
          <NavLink exact activeClassName="current" to="/home">
            SIGN OUT
          </NavLink>
        </div>
      </li>

      </ul>
  </nav>
);

export default Navigation;
