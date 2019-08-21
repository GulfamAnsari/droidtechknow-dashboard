import React, { Component } from 'react'

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signUp: {
        username: '',
        password: '',
        repeat: '',
        email: ''
      },
      name: 'sign-up'
    }
  }

  signUpOnChangeHandler(event) {
    const { signUp } = this.state;
    signUp[event.target.name] = event.target.value;
    this.setState({
      signUp
    });
  }

  render() {
    const { onSubmitHandler } = this.props;
    return (
      <form onSubmit={(event) => { onSubmitHandler(event, this.state) }} className="sign-up-htm">
        <div className="group">
          <label htmlFor="user" className="label">Username</label>
          <input required onChange={this.signUpOnChangeHandler.bind(this)} id="user" name="username" type="text" className="input" />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Password</label>
          <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="password" name="password" className="input" data-type="password" />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Repeat Password</label>
          <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="password" name="repeat" className="input" data-type="password" />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Email Address</label>
          <input required onChange={this.signUpOnChangeHandler.bind(this)} id="pass" type="text" name="email" className="input" />
        </div>
        <div className="group">
          <input type="submit" className="button" name="sign-up" value="Sign Up" />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <label htmlFor="tab-1">Already Member?</label>
        </div>
      </form>
    )
  }
}
