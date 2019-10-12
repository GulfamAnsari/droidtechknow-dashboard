import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as scss from './Header.module.scss';

const Link = require("react-router-dom").Link;

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
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
    const { userInfo } = this.state;
    const { searchResult } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top Header">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <span className="navbar-brand text-gray">{`Howdy, ${userInfo ? userInfo.username : ''}`}</span>
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
                <input type="text" className="form-control" placeholder="Search..." onChange={(event) => { this.props.search({ name: 'query', query: event.target.value }) }} />
                <div className="searchResult" style={searchResult.result.length > 0 ? { 'max-height': '70vh' } : null}>
                  {
                    searchResult.result.map((result) => {
                      return <p style={{ color: this.colorize(result.value).f, background: this.colorize(result.value).b }} onClick={() => { this.props.search({ name: 'selected', selected: result }) }}>{result.name}<span>{result.value}</span></p>
                    })
                  }
                </div>
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
                  <img width="35" className="rounded-circle" src={userInfo ? userInfo.userImage : ''} alt="profile" />
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

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo && this.props.userInfo && prevProps.userInfo.userImage !== this.props.userInfo.userImage) {
      this.setState({
        userInfo: this.props.userInfo
      })
    }
  }

  componentDidMount = () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

