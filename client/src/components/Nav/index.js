import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <ul className="">
              <li className="">
                <Link to="/orderHistory">
                  Order History
                </Link>
              </li>
              <li className="">
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
            </ul>
          );
        } else {
          return (
            <ul className="">
              <li className="">
                <Link to="/signup">
                  Signup
                </Link>
              </li>
              <li className="">
                <Link to="/login">
                  Login
                </Link>
              </li>
            </ul>
          );
        }
      }

      return (
        <header className="">
        <h1>
          <Link to="/">
            <span role="img" aria-label=""></span>
            Rent-A-Fit
          </Link>
        </h1>
  
        <nav>
          {showNavigation()}
        </nav>
      </header>
      )

}