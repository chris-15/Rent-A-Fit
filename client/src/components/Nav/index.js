import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./style.css";
import { FaGripLinesVertical, FaSearch, FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import { MdAddCircle } from "react-icons/md";

function Nav() {
  const [active, setActive] = useState({
    post: false,
    me: false,
    search: false,
  });

  const handleClick = (name) => {
    console.log(name);
    if (name === "me") {
      setActive({
        post: false,
        search: false,
        [name]: true,
      });
    }
    if (name === "search") {
      setActive({
        post: false,
        me: false,
        [name]: true,
      });
    }
    if (name === "post") {
      setActive({
        me: false,
        search: false,
        [name]: true,
      });
    }

    console.log(active);
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      
      console.log(Auth.getProfile())
      return (
        <div className="flex-row">
        <div className="user-profile">
        <Link to={'/profile/' + Auth.getProfile().data.username}> <FaUser className="FaUser"/> </Link>
        </div>

          <div className="flex-row  mx-3 nav-items">
            <div className="mx-1 ">
              <Link to="/addpost">Add Post</Link>
            </div>
            <FaGripLinesVertical style={{ marginTop: "5%" }} />
            <div className="mx-1">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-row mx-3 nav-items">
          <div className="mx-1">
            <Link to="/signup">Sign Up</Link>
          </div>
          <FaGripLinesVertical style={{ marginTop: "5%" }} />
          <div className="mx-1">
            <Link to="/login">Login</Link>
          </div>
        </div>
      );
    }
  }

  function bottomNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex-row icon-container mx-3">
          <div className="mx-1 icons">
            <Link
              to="/"
              onClick={() => handleClick("search")}
              name="search"
              className={active.search ? "active" : "not-active"}
            >
              <FaSearch />
              <p>Search</p>
            </Link>
          </div>

          <div className="mx-1 icons">
            <Link
              to="/addpost"
              onClick={() => handleClick("post")}
              name="post"
              className={active.post ? "active" : "not-active"}
            >
              <MdAddCircle />
              <p>Post</p>
            </Link>
          </div>
          <div className="mx-1 icons">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <Link
              to={"/profile/" + Auth.getProfile().data.username}
              onClick={() => handleClick("me")}
              name="me"
              className={active.me ? "active" : "not-active"}
            >
              <div className="FaUser-div">
                <FaUser />
              </div>
              <p>Me</p>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-row  icon-container mx-3 ">
          <div className=" icons">
            <Link to="/">
              <AiFillHome />
              <p>Home</p>
            </Link>
          </div>

          <div className="mx-1 icons">
            <Link
              to="/"
              onClick={handleClick}
              name="search"
              className={active.search ? "active" : "not-active"}
            >
              <FaSearch />
              <p>Search</p>
            </Link>
          </div>

          <div className="mx-1 icons">
            <Link to="/login"
            onClick={handleClick}
            name="login"
            className={active.login ? "active" : "not-active"}
            >
              <div>
                <FaUser />
                <p>Login</p>
              </div>
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <header className="flex-row px-1 header">
      <h1 className="header-logo">
        <Link to="/">
          <span role="img" aria-label="shopping bag"></span>
          RentAFit
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>

      <div className="bottom-nav-div">{bottomNavigation()}</div>
    </header>
  );
}

export default Nav;
