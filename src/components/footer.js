import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer>
    <nav className="menu">
      <ul className="fmenuList text-center">
        <li className="fmenuListElement">
          @2018 - Blue Marble. All rights reserved.
        </li>
        <li className="fmenuListElement">
          <NavLink exact activeClassName="current" to="/team">
            OUR TEAM
          </NavLink>
        </li>
        <li className="fmenuListElement">
          <NavLink exact activeClassName="current" to="/contact">
            CONTACT US
          </NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
