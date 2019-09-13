import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Link = require("react-router-dom").Link;

class Header extends Component {
  
  constructor(props) {
    super(props);
  }

  logOut = () => {
    this.props.logout();
    this.props.history.push({ pathname: '/' });
  }

  render() {
    console.log(this.props.userInfo);
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <form className="navbar-form">
              <div className="input-group no-border">
                <input type="text" value="" className="form-control" placeholder="Search..." />
                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                  <i className="material-icons">search</i>
                  <div className="ripple-container"></div>
                </button>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">notifications</i>
                  <span className="notification">5</span>
                  <p className="d-lg-none d-md-block">
                    Some Actions
                  </p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Mike John responded to your email</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="#pablo" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">person</i>
                  <p className="d-lg-none d-md-block">
                    Account
                  </p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                  <Link className="dropdown-item" to="/profile">Profile</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/" onClick={() => { this.logOut() }}>Log out</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Main_Reducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: ()=> dispatch(actions.fetchUserInfo()),
    logout: ()=> dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

