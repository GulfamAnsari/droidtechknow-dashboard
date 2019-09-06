import React, { Component } from 'react'
import * as HELPER from '../../helper/helper-functions';
const Link = require("react-router-dom").Link;

export default class Sidebar extends Component {

  logOut = () => {
    HELPER.setCookie('token', '', 0);
    this.props.history.push({ pathname: '/' });
  }

  render() {
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href="https://droidtechknow.com" target="_blank" className="simple-text logo-normal">
            DroidTechKnow
              </a>
        </div>
        <div className="sidebar-wrapper">
          <form className="navbar-form">
            <span className="bmd-form-group">
              <div className="input-group no-border">
                <input type="text" value="" className="form-control" placeholder="Search..." />
                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                  <i className="material-icons">search</i>
                  <div className="ripple-container"></div>
                </button>
              </div>
            </span>
          </form>
          <ul className="nav navbar-nav nav-mobile-menu">
            <li className="nav-item dropdown">
              <Link className="nav-link" to="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">notifications</i>
                <span className="notification">5</span>
                <p className="d-lg-none d-md-block">
                  Some Actions
                  </p>
              </Link>
              <div className="dropdown-menu dropdown-menu-right showing hiding" aria-labelledby="navbarDropdownMenuLink" x-placement="bottom-end">
                <a className="dropdown-item" href="#">Mike John responded to your email</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link" to="" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">person</i>
                <p className="d-lg-none d-md-block">
                  Account
                  </p>
              </Link>
              <div className="dropdown-menu dropdown-menu-right hiding" aria-labelledby="navbarDropdownProfile" x-placement="bottom-end">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <Link className="dropdown-item" to="/setting">Settings</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" onClick={() => { this.logOut() }}>Log out</Link>
              </div>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item active  ">
              <a className="nav-link" href="./dashboard.html">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="./user.html">
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
