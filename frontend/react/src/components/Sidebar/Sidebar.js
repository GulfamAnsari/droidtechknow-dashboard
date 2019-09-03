import React, { Component } from 'react'
const Link = require("react-router-dom").Link;

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href="https://droidtechknow.com"  target="_blank" className="simple-text logo-normal">
            DroidTechKnow
              </a>
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
