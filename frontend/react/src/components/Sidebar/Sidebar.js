import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Link = require("react-router-dom").Link;
class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathMapping: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          to: 'dashboard',
          path: '/dashboard'
        },
        {
          name: 'User Profile',
          icon: 'person',
          to: 'profile',
          path: '/profile'
        },
        {
          name: 'Todo',
          icon: 'view_list',
          to: 'todos',
          path: '/todos'
        }
      ]
    }
  }

  logOut = () => {
    this.props.logout();
    this.props.history.push({ pathname: '/' });
  }

  render() {
    const { pathMapping } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href="https://droidtechknow.com" target="_blank" className="simple-text logo-normal">
            DroidTechKnow
              </a>
        </div>
        <div className="sidebar-wrapper">
          {/* Visible only for mobile */}
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
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" onClick={() => { this.logOut() }}>Log out</Link>
              </div>
            </li>
          </ul>
          {/* end */}
          <ul className="nav">
            {
              pathMapping.map((li) => {
                return <li className={`nav-item ${pathname === li.path ? 'active': ''}`}>
                  <Link className="nav-link" to={li.to}>
                    <i className="material-icons">{li.icon}</i>
                    <p>{li.name}</p>
                  </Link>
                </li>
              })
            }
          </ul>
        </div>
        <div class="sidebar-background"></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

