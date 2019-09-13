import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signIn: {
        username: '',
        password: '',
        remebmer: false
      },
      name: 'sign-in'
    }
  }

  signInOnChangeHandler(event) {
    const { signIn } = this.state;
    if (event.target.name === 'remebmer') {
      signIn[event.target.name] = event.target.checked;
    } else {
      signIn[event.target.name] = event.target.value;
    }
    this.setState({
      signIn
    });
  }

  render() {
    const { onSubmitHandler } = this.props;

    return (
      <form onSubmit={(event) => { onSubmitHandler(event, this.state) }} className="sign-in-htm">
        <div className="group">
          <label htmlFor="sign-user" className="label">Email</label>
          <input required onChange={this.signInOnChangeHandler.bind(this)} id="sign-user" name="username" type="text" className="input" />
        </div>
        <div className="group">
          <label htmlFor="sign-pass" className="label">Password</label>
          <input required onChange={this.signInOnChangeHandler.bind(this)} id="sign-pass" type="password" name="password" className="input" data-type="password" />
        </div>
        <div className="group">
          <input onChange={this.signInOnChangeHandler.bind(this)} id="check" type="checkbox" name="remebmer" className="check" />
          <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
        </div>
        <div className="group">
          <input type="submit" className="button" name="sign-in" value="Sign In" />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <Link to="/todos">Use App without Login</Link>
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <a href="#forgot">Forgot Password?</a>
        </div>
      </form>
    )
  }
}
