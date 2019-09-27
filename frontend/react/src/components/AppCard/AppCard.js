import React, { Component } from 'react';
const Link = require("react-router-dom").Link;

export default class AppCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { app } = this.props;

    return (
      <Link to={app.link}>
        <div className={`card-header ${app.cardClass} card-header-icon`}>
          <div className="card-icon">
            <i className="material-icons">{app.icon}</i>
          </div>
          {/* <p className="card-category">{app.catagory}</p> */}
          <h3 className="card-title">
            {app.name}
          </h3>
        </div>
        <div className="card-footer">
          <div className="stats">
            <i className="material-icons">{app.taglineIcon}</i>
            <Link to={app.link}>{app.tagline}</Link>
          </div>
        </div>
      </Link>
    )
  }
}
