import React, { Component } from 'react'
const Link = require("react-router-dom").Link;

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href="https://droidtechknow.com" target="_blank" className="simple-text logo-normal">
            DroidTechKnow
              </a>
              <div className="mini-sidebar-nav">
                {/* only show in mobile view */}
            {/* <span>
              <form className="navbar-form">
                <div className="input-group no-border">
                  <input type="text" value="" className="form-control" placeholder="Search..." />
                  <button type="submit" className="btn btn-white btn-round btn-just-icon">
                    <i className="material-icons">search</i>
                    <div className="ripple-container"></div>
                  </button>
                </div>
              </form>
            </span> */}

            <span>
              <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">notifications</i>
                <span className="notification">5</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Mike John responded to your email</a>
              </div>
            </span>

            <span>
              <a className="nav-link" href="#" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">person</i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <Link className="dropdown-item" to="/setings">Settings</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" onClick={() => { this.logOut() }}>Log out</Link>
              </div>
            </span>
            {/* ------------------ */}
              </div>

        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active  ">
              <Link className="nav-link" to="./dashboard">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/profile">
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
