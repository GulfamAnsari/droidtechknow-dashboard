import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Link = require("react-router-dom").Link;
class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
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
        },
        {
          name: "Weather",
          icon: "cloud",
          to: 'weather',
          path: "/weather"
        },
        {
          name: "AQI",
          icon: "mood",
          to: 'aqi',
          path: "/aqi"
        },
        {
          name: "ANALYTICS",
          icon: "analytics",
          to: 'analytics',
          path: "/analytics"
        }
      ]
    }
  }

  logOut = () => {
    this.props.logout();
    this.props.history.push({ pathname: '/' });
  }

  colorize = (aqi) => {
    var spectrum = [
      { a: 0, b: "#cccccc", f: "#ffffff" },
      { a: 50, b: "#009966", f: "#ffffff" },
      { a: 100, b: "#ffde33", f: "#000000" },
      { a: 150, b: "#ff9933", f: "#000000" },
      { a: 200, b: "#cc0033", f: "#ffffff" },
      { a: 300, b: "#660099", f: "#ffffff" },
      { a: 500, b: "#7e0023", f: "#ffffff" }
    ];
    var i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
      if (aqi == "-" || aqi <= spectrum[i].a) break;
    };
    return spectrum[i];
  }

  render() {
    const { pathMapping, userInfo } = this.state;
    const { pathname } = this.props.location;
    const { searchResult } = this.props;
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
                <input type="text" className="form-control" placeholder="Search..." onChange={(event) => { this.props.search({ name: 'query', query: event.target.value }) }} />
                <div className="searchResult" style={searchResult.result.length > 0 ? { 'max-height': '70vh' } : null}>
                  {
                    searchResult.result.map((result) => {
                      return <p style={{ color: this.colorize(result.value).f, background: this.colorize(result.value).b }} onClick={() => { this.props.search({ name: 'selected', selected: result }) }}>{result.name}<span>{result.value}</span></p>
                    })
                  }
                </div>
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
                <i className="material-icons">
                  <img width="35" className="rounded-circle" src={userInfo ? userInfo.userImage : ''} alt="profile" />
                </i>
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
                return <li className={`nav-item ${pathname === li.path ? 'active' : ''}`}>
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

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo && this.props.userInfo && prevProps.userInfo.userImage !== this.props.userInfo.userImage) {
      this.setState({
        userInfo: this.props.userInfo
      })
    }
  }

  componentDidMount = (prevProps, prevState, snapshot) => {
    console.log(snapshot)
    this.setState({
      userInfo: this.props.userInfo
    })
    if (this.props.userInfo === null) {
      this.props.fetchUserInfo().then((data) => {
        this.setState({
          userInfo: this.props.userInfo
        })
      })
    }
  }

}



const mapStateToProps = (state) => {
  return {
    userInfo: state.Main_Reducer.userInfo,
    searchResult: state.Main_Reducer.searchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => dispatch(actions.fetchUserInfo()),
    logout: () => dispatch(actions.logout()),
    search: (value) => dispatch(actions.search(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

